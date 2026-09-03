"use client";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ComponentType,
  RefObject,
} from "react";
import type { Group } from "three";

import AwardTrophy from "./models/AwardTrophy";
import Guitar from "./models/Guitar";
import GuitarAmp from "./models/GuitarAmp";
import HeroSculpture from "./models/HeroSculpture";
import RecordPlayer from "./models/RecordPlayer";
import Shelf from "./models/Shelf";
import SmallTable from "./models/SmallTable";
import Vinyl from "./models/Vinyl";

type Vector3Tuple = [
  number,
  number,
  number,
];

type ModelConfig = {
  id: string;
  Model: ComponentType;
  side: "left" | "right";
  y: number;
  depth?: number;
  scale: number;
  rotation: Vector3Tuple;
  spin: Vector3Tuple;
  priority: "high" | "low";
};

const MODEL_CONFIGS: readonly ModelConfig[] = [
  {
    id: "shelf",
    Model: Shelf,
    side: "left",
    y: 0.07,
    depth: 0.05,
    scale: 0.58,
    rotation: [0.08, 0.42, -0.08],
    spin: [0.018, 0.045, 0.012],
    priority: "high",
  },
  {
    id: "guitar",
    Model: Guitar,
    side: "right",
    y: 0.14,
    depth: 0.2,
    scale: 0.82,
    rotation: [0.08, -0.45, 0.16],
    spin: [-0.035, 0.09, -0.025],
    priority: "high",
  },
  {
    id: "sculpture",
    Model: HeroSculpture,
    side: "left",
    y: 0.24,
    depth: -0.1,
    scale: 0.62,
    rotation: [-0.16, 0.5, 0.08],
    spin: [0.025, -0.08, 0.04],
    priority: "low",
  },
  {
    id: "record-player",
    Model: RecordPlayer,
    side: "right",
    y: 0.33,
    depth: 0.1,
    scale: 0.74,
    rotation: [0.18, -0.3, -0.08],
    spin: [0.05, 0.07, 0.02],
    priority: "high",
  },
  {
    id: "guitar-amp",
    Model: GuitarAmp,
    side: "right",
    y: 0.53,
    depth: -0.05,
    scale: 0.76,
    rotation: [-0.1, -0.42, 0.1],
    spin: [0.04, -0.075, -0.03],
    priority: "low",
  },
  {
    id: "vinyl",
    Model: Vinyl,
    side: "left",
    y: 0.63,
    depth: 0.15,
    scale: 0.64,
    rotation: [0.3, 0.2, -0.06],
    spin: [0.08, 0.04, 0.055],
    priority: "high",
  },
  {
    id: "table",
    Model: SmallTable,
    side: "right",
    y: 0.73,
    depth: 0.3,
    scale: 0.64,
    rotation: [-0.08, 0.4, 0.12],
    spin: [-0.025, 0.085, 0.035],
    priority: "low",
  },
  {
    id: "trophy",
    Model: AwardTrophy,
    side: "left",
    y: 0.84,
    depth: 0,
    scale: 0.54,
    rotation: [0.14, -0.34, -0.08],
    spin: [0.035, 0.07, -0.025],
    priority: "high",
  },
];

/* =========================================
   DEVICE CAPABILITY
========================================= */

function useLowEndDevice() {
  const [isLowEnd, setIsLowEnd] =
    useState(false);

  useEffect(() => {
    const deviceNavigator =
      navigator as Navigator & {
        deviceMemory?: number;
      };

    const processorCount =
      navigator.hardwareConcurrency ?? 8;

    const deviceMemory =
      deviceNavigator.deviceMemory ?? 8;

    const narrowScreen =
      window.innerWidth < 768;

    setIsLowEnd(
      processorCount <= 4 ||
        deviceMemory <= 4 ||
        narrowScreen
    );
  }, []);

  return isLowEnd;
}

/* =========================================
   REDUCED MOTION
========================================= */

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] =
    useState(false);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const updatePreference = () => {
      setReducedMotion(
        mediaQuery.matches
      );
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference
      );
    };
  }, []);

  return reducedMotion;
}

/* =========================================
   VISIBILITY
========================================= */

function useSceneVisibility(
  containerRef: RefObject<HTMLDivElement | null>
) {
  const [hasEnteredViewport, setHasEnteredViewport] =
    useState(false);

  const [isIntersecting, setIsIntersecting] =
    useState(false);

  const [isPageVisible, setIsPageVisible] =
    useState(true);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(
          entry.isIntersecting
        );

        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  useEffect(() => {
    const updatePageVisibility = () => {
      setIsPageVisible(
        document.visibilityState ===
          "visible"
      );
    };

    updatePageVisibility();

    document.addEventListener(
      "visibilitychange",
      updatePageVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updatePageVisibility
      );
    };
  }, []);

  return {
    shouldMount: hasEnteredViewport,
    isActive:
      isIntersecting && isPageVisible,
  };
}

/* =========================================
   30 FPS FRAME CONTROLLER
========================================= */

function FrameController({
  active,
  reducedMotion,
  isLowEnd,
}: {
  active: boolean;
  reducedMotion: boolean;
  isLowEnd: boolean;
}) {
  const invalidate = useThree(
    (state) => state.invalidate
  );

  useEffect(() => {
    /*
     * Demand one frame so static content appears
     * when the scene first mounts or changes.
     */
    invalidate();

    if (!active || reducedMotion) {
      return;
    }

    /*
     * Low-end devices run at 24 FPS.
     * Other devices run at 30 FPS.
     */
    const targetFps = isLowEnd
      ? 24
      : 30;

    const frameInterval =
      1000 / targetFps;

    const intervalId =
      window.setInterval(
        invalidate,
        frameInterval
      );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    active,
    reducedMotion,
    isLowEnd,
    invalidate,
  ]);

  return null;
}

/* =========================================
   SIDE MODELS
========================================= */

function SideModels({
  active,
  reducedMotion,
  isLowEnd,
}: {
  active: boolean;
  reducedMotion: boolean;
  isLowEnd: boolean;
}) {
  const { width, height } = useThree(
    (state) => state.viewport
  );

  const modelRefs = useRef<
    Array<Group | null>
  >([]);

  /*
   * Low-end devices only display high-priority
   * models, cutting geometry and draw calls.
   */
  const visibleModels = useMemo(
    () =>
      isLowEnd
        ? MODEL_CONFIGS.filter(
            ({ priority }) =>
              priority === "high"
          )
        : MODEL_CONFIGS,
    [isLowEnd]
  );

  const positions = useMemo<
    Vector3Tuple[]
  >(() => {
    const edgeInset = Math.min(
      1.25,
      width * 0.18
    );

    return visibleModels.map(
      ({ side, y, depth = 0 }) => {
        const x =
          side === "left"
            ? -width / 2 + edgeInset
            : width / 2 - edgeInset;

        const verticalPosition =
          height / 2 - height * y;

        return [
          x,
          verticalPosition,
          depth,
        ];
      }
    );
  }, [
    visibleModels,
    width,
    height,
  ]);

  useFrame((_, delta) => {
    if (
      !active ||
      reducedMotion
    ) {
      return;
    }

    const safeDelta = Math.min(
      delta,
      0.05
    );

    visibleModels.forEach(
      ({ spin }, index) => {
        const group =
          modelRefs.current[index];

        if (!group) return;

        group.rotation.x +=
          safeDelta * spin[0];

        group.rotation.y +=
          safeDelta * spin[1];

        group.rotation.z +=
          safeDelta * spin[2];
      }
    );
  });

  return (
    <>
      {visibleModels.map(
        (
          {
            id,
            Model,
            scale,
            rotation,
          },
          index
        ) => (
          <group
            key={id}
            ref={(group) => {
              modelRefs.current[index] =
                group;
            }}
            position={positions[index]}
            rotation={rotation}
            scale={scale}
            frustumCulled
          >
            <Model />
          </group>
        )
      )}
    </>
  );
}

/* =========================================
   LIGHTING
========================================= */

function SceneLighting({
  isLowEnd,
}: {
  isLowEnd: boolean;
}) {
  if (isLowEnd) {
    return (
      <>
        <ambientLight
          intensity={1.5}
        />

        <directionalLight
          position={[5, 7, 8]}
          intensity={2}
        />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={1.4} />

      <hemisphereLight
        args={[
          "#f2efe7",
          "#1c1d19",
          1,
        ]}
      />

      <directionalLight
        position={[5, 7, 8]}
        intensity={2.2}
      />

      <directionalLight
        position={[-5, -2, 4]}
        intensity={0.8}
        color="#c88262"
      />
    </>
  );
}

/* =========================================
   SCENE CONTENT
========================================= */

function SceneContent({
  active,
  reducedMotion,
  isLowEnd,
}: {
  active: boolean;
  reducedMotion: boolean;
  isLowEnd: boolean;
}) {
  return (
    <>
      <FrameController
        active={active}
        reducedMotion={reducedMotion}
        isLowEnd={isLowEnd}
      />

      <SceneLighting
        isLowEnd={isLowEnd}
      />

      <Suspense fallback={null}>
        <SideModels
          active={active}
          reducedMotion={reducedMotion}
          isLowEnd={isLowEnd}
        />
      </Suspense>
    </>
  );
}

/* =========================================
   EXPERIENCE SCENE
========================================= */

export default function ExperienceScene() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const reducedMotion =
    useReducedMotion();

  const isLowEnd =
    useLowEndDevice();

  const {
    shouldMount,
    isActive,
  } = useSceneVisibility(containerRef);

  return (
    <div
      ref={containerRef}
      className="experience-scene__canvas"
      aria-hidden="true"
    >
      {shouldMount && (
        <Canvas
          orthographic
          frameloop="demand"
          camera={{
            position: [0, 0, 10],
            zoom: 100,
            near: 0.1,
            far: 50,
          }}
          dpr={
            isLowEnd
              ? 0.75
              : [0.75, 1]
          }
          gl={{
            alpha: true,
            antialias: false,
            powerPreference:
              "high-performance",
          }}
        >
          <SceneContent
            active={isActive}
            reducedMotion={
              reducedMotion
            }
            isLowEnd={isLowEnd}
          />
        </Canvas>
      )}
    </div>
  );
}