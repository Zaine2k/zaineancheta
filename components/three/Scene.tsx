"use client";

import {
  Canvas,
  useThree,
} from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import type { RefObject } from "react";
import * as THREE from "three";

import { useTheme } from "../ThemeProvider";

import HeroSculpture from "./models/HeroSculpture";
import PlantModel from "./models/PlantModel";
import PlantModel2 from "./models/PlantModel2";
import GuitarAmp from "./models/GuitarAmp";
import CeilingLight from "./models/CeilingLight";
import SmallTable from "./models/SmallTable";
import Chandelier from "./models/Chandelier";
import Guitar from "./models/Guitar";
import Shelf from "./models/Shelf";
import Vinyl from "./models/Vinyl";
import RecordPlayer from "./models/RecordPlayer";
import Window from "./models/Window";
import Room from "./models/Room";

type SceneThemeProps = {
  isDark: boolean;
};

type PerformanceProps = {
  isLowEnd: boolean;
};

type FrameControllerProps = {
  active: boolean;
  reducedMotion: boolean;
  isLowEnd: boolean;
};

/* =========================================
   LOW-END DEVICE DETECTION
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

    const isNarrowScreen =
      window.innerWidth < 768;

    setIsLowEnd(
      processorCount <= 4 ||
        deviceMemory <= 4 ||
        isNarrowScreen
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
   SCENE VISIBILITY
========================================= */

function useSceneVisibility(
  containerRef: RefObject<HTMLDivElement | null>
) {
  const [isIntersecting, setIsIntersecting] =
    useState(true);

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
      },
      {
        /*
         * Keeps rendering briefly before and after
         * the scene enters/leaves the viewport.
         */
        rootMargin: "200px 0px",
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

  return (
    isIntersecting && isPageVisible
  );
}

/* =========================================
   CONTROLLED FRAME RATE
========================================= */

function FrameController({
  active,
  reducedMotion,
  isLowEnd,
}: FrameControllerProps) {
  const invalidate = useThree(
    (state) => state.invalidate
  );

  useEffect(() => {
    /*
     * Render once whenever these settings change.
     */
    invalidate();

    if (!active || reducedMotion) {
      return;
    }

    /*
     * Use 24 FPS on low-end devices and
     * 30 FPS everywhere else.
     */
    const targetFps = isLowEnd
      ? 24
      : 30;

    const intervalId =
      window.setInterval(
        invalidate,
        1000 / targetFps
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
   SCENE ENVIRONMENT
========================================= */

function SceneEnvironment({
  isDark,
}: SceneThemeProps) {
  const gl = useThree(
    (state) => state.gl
  );

  const scene = useThree(
    (state) => state.scene
  );

  const invalidate = useThree(
    (state) => state.invalidate
  );

  useEffect(() => {
    gl.toneMapping =
      THREE.ACESFilmicToneMapping;

    gl.outputColorSpace =
      THREE.SRGBColorSpace;

    if (isDark) {
      gl.toneMappingExposure = 0.78;

      gl.setClearColor(
        "#0c0f0d",
        1
      );

      scene.background =
        new THREE.Color("#0c0f0d");

      scene.fog = new THREE.Fog(
        "#10130f",
        10,
        28
      );
    } else {
      gl.toneMappingExposure = 1;

      gl.setClearColor(
        "#000000",
        0
      );

      scene.background = null;
      scene.fog = null;
    }

    invalidate();

    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [
    gl,
    scene,
    invalidate,
    isDark,
  ]);

  return null;
}

/* =========================================
   LIGHT MODE LIGHTING
========================================= */

function LightModeLighting({
  isLowEnd,
}: PerformanceProps) {
  return (
    <>
      <ambientLight intensity={1.1} />

      <directionalLight
        position={[0, 3, 5]}
        intensity={1.5}
        castShadow={!isLowEnd}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-bias={-0.0002}
      />

      {!isLowEnd && (
        <pointLight
          position={[-4, 2, 3]}
          intensity={1.5}
          distance={8}
          decay={2}
          color="#ff79c8"
        />
      )}
    </>
  );
}

/* =========================================
   DARK MODE LIGHTING
========================================= */

function DarkModeLighting({
  isLowEnd,
}: PerformanceProps) {
  if (isLowEnd) {
    return (
      <>
        <ambientLight
          intensity={0.24}
          color="#75809a"
        />

        <hemisphereLight
          args={[
            "#60749a",
            "#17120e",
            0.38,
          ]}
        />

        <directionalLight
          position={[-5, 7, 5]}
          intensity={0.55}
          color="#91a8d4"
        />

        <pointLight
          position={[0, 2.4, 0.5]}
          intensity={12}
          distance={8}
          decay={2}
          color="#e8aa72"
        />

        <pointLight
          position={[-3.6, 2.1, -1.2]}
          intensity={6}
          distance={5}
          decay={2}
          color="#d68b68"
        />
      </>
    );
  }

  return (
    <>
      <ambientLight
        intensity={0.16}
        color="#75809a"
      />

      <hemisphereLight
        args={[
          "#60749a",
          "#17120e",
          0.34,
        ]}
      />

      <directionalLight
        position={[-5, 7, 5]}
        intensity={0.5}
        color="#91a8d4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0002}
      />

      {/*
       * Point-light shadows are intentionally disabled.
       * A shadow-casting point light renders six shadow maps.
       */}
      <pointLight
        position={[0, 2.4, 0.5]}
        intensity={13}
        distance={9}
        decay={2}
        color="#e8aa72"
      />

      <pointLight
        position={[0, 0.7, 1.5]}
        intensity={5}
        distance={8}
        decay={2}
        color="#d6b286"
      />

      <pointLight
        position={[-3.6, 2.1, -1.2]}
        intensity={8}
        distance={6}
        decay={2}
        color="#d68b68"
      />

      <pointLight
        position={[-4, 0.5, 3]}
        intensity={3.5}
        distance={7}
        decay={2}
        color="#776b91"
      />

      <pointLight
        position={[5, 1, 2]}
        intensity={3}
        distance={8}
        decay={2}
        color="#667b9f"
      />

      <pointLight
        position={[0, -2.3, 2]}
        intensity={2}
        distance={7}
        decay={2}
        color="#59485d"
      />
    </>
  );
}

/* =========================================
   THEME LIGHTING
========================================= */

function SceneLighting({
  isDark,
  isLowEnd,
}: SceneThemeProps & PerformanceProps) {
  if (isDark) {
    return (
      <DarkModeLighting
        isLowEnd={isLowEnd}
      />
    );
  }

  return (
    <LightModeLighting
      isLowEnd={isLowEnd}
    />
  );
}

/* =========================================
   ROOM CONTENT
========================================= */

function RoomContent({
  isDark,
  isLowEnd,
}: SceneThemeProps & PerformanceProps) {
  return (
    <>
      <Room />

      <group
        position={[0, 0.95, -3.05]}
      >
        <Window
          curtains={
            isDark ? "closed" : "open"
          }
        />
      </group>

      <PlantModel />

      {!isLowEnd && <PlantModel2 />}

      <GuitarAmp />

      <CeilingLight />

      <group
        position={[0, 3, -0.5]}
      >
        <Chandelier />
      </group>

      <group
        position={[
          -4.2,
          -2.08,
          -2.72,
        ]}
        rotation={[0, 0.08, 0]}
        scale={0.85}
      >
        <Shelf />
      </group>

      <group
        position={[
          5.5,
          -1.85,
          -1.5,
        ]}
        rotation={[0, -0.55, 0]}
        scale={0.65}
      >
        <group
          position={[
            -0.9,
            -0.43,
            4.15,
          ]}
          rotation={[0, 1.38, 0]}
          scale={0.85}
        >
          <Guitar />
        </group>

        <group
          position={[-3, 2, 14.5]}
          rotation={[0, 0.3, 0]}
          scale={0.25}
        >
          <Vinyl />
        </group>

        <group
          position={[
            -10.8,
            -0.4,
            8.65,
          ]}
          rotation={[0, 58, 0]}
          scale={0.85}
        >
          <RecordPlayer />
        </group>

        <SmallTable />
      </group>

      <HeroSculpture />
    </>
  );
}

/* =========================================
   SCENE CONTENT
========================================= */

function SceneContent({
  isDark,
  isLowEnd,
  active,
  reducedMotion,
}: SceneThemeProps &
  PerformanceProps & {
    active: boolean;
    reducedMotion: boolean;
  }) {
  return (
    <>
      <FrameController
        active={active}
        reducedMotion={reducedMotion}
        isLowEnd={isLowEnd}
      />

      <SceneEnvironment
        isDark={isDark}
      />

      <SceneLighting
        isDark={isDark}
        isLowEnd={isLowEnd}
      />

      <RoomContent
        isDark={isDark}
        isLowEnd={isLowEnd}
      />
    </>
  );
}

/* =========================================
   MAIN SCENE
========================================= */

export default function Scene() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const isDark = theme === "dark";
  const isLowEnd =
    useLowEndDevice();
  const reducedMotion =
    useReducedMotion();

  const isActive =
    useSceneVisibility(containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        /*
         * Demand mode prevents unnecessary
         * full-refresh-rate rendering.
         */
        frameloop="demand"
        shadows={
          isLowEnd ? false : "basic"
        }
        camera={{
          position: [0, 0, 7],
          fov: 45,
          near: 0.1,
          far: 35,
        }}
        dpr={
          isLowEnd
            ? 0.75
            : [0.75, 1.25]
        }
        gl={{
          antialias: false,
          alpha: true,
          powerPreference:
            "high-performance",
          toneMapping:
            THREE.ACESFilmicToneMapping,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SceneContent
          isDark={isDark}
          isLowEnd={isLowEnd}
          active={isActive}
          reducedMotion={
            reducedMotion
          }
        />
      </Canvas>
    </div>
  );
}