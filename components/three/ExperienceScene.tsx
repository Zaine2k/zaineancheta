"use client";

import { Preload } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";

import AwardTrophy from "./models/AwardTrophy";
import Guitar from "./models/Guitar";
import GuitarAmp from "./models/GuitarAmp";
import HeroSculpture from "./models/HeroSculpture";
import PlantModel from "./models/PlantModel";
import PlantModel2 from "./models/PlantModel2";
import RecordPlayer from "./models/RecordPlayer";
import Shelf from "./models/Shelf";
import SmallTable from "./models/SmallTable";
import Vinyl from "./models/Vinyl";

type SpaceModelProps = {
  children: ReactNode;
  side: "left" | "right";
  y: number;
  depth?: number;
  scale: number;
  rotation: [number, number, number];
  spin: [number, number, number];
  reducedMotion: boolean;
};

function SpaceModel({
  children,
  side,
  y,
  depth = 0,
  scale,
  rotation,
  spin,
  reducedMotion,
}: SpaceModelProps) {
  const model = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const edgeInset = 1.25;

  const x =
    side === "left"
      ? -viewport.width / 2 + edgeInset
      : viewport.width / 2 - edgeInset;

  const verticalPosition =
    viewport.height / 2 - viewport.height * y;

  useFrame((_, delta) => {
    if (!model.current || reducedMotion) return;

    model.current.rotation.x += delta * spin[0];
    model.current.rotation.y += delta * spin[1];
    model.current.rotation.z += delta * spin[2];
  });

  return (
    <group
      ref={model}
      position={[x, verticalPosition, depth]}
      rotation={rotation}
      scale={scale}
    >
      {children}
    </group>
  );
}

function SideModels({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <>
      {/* SHELF */}
      <SpaceModel
        side="left"
        y={0.07}
        depth={0.05}
        scale={0.58}
        rotation={[0.08, 0.42, -0.08]}
        spin={[0.018, 0.045, 0.012]}
        reducedMotion={reducedMotion}
      >
        <Shelf />
      </SpaceModel>

      {/* GUITAR */}
      <SpaceModel
        side="right"
        y={0.14}
        depth={0.2}
        scale={0.82}
        rotation={[0.08, -0.45, 0.16]}
        spin={[-0.035, 0.09, -0.025]}
        reducedMotion={reducedMotion}
      >
        <Guitar />
      </SpaceModel>

      {/* HERO SYNTH */}
      <SpaceModel
        side="left"
        y={0.24}
        depth={-0.1}
        scale={0.62}
        rotation={[-0.16, 0.5, 0.08]}
        spin={[0.025, -0.08, 0.04]}
        reducedMotion={reducedMotion}
      >
        <HeroSculpture />
      </SpaceModel>

      {/* RECORD PLAYER */}
      <SpaceModel
        side="right"
        y={0.33}
        depth={0.1}
        scale={0.74}
        rotation={[0.18, -0.3, -0.08]}
        spin={[0.05, 0.07, 0.02]}
        reducedMotion={reducedMotion}
      >
        <RecordPlayer />
      </SpaceModel>

      {/* PLANT */}
      <SpaceModel
        side="left"
        y={0.43}
        depth={0.25}
        scale={0.7}
        rotation={[0.12, 0.28, -0.18]}
        spin={[-0.03, 0.1, 0.025]}
        reducedMotion={reducedMotion}
      >
        <PlantModel />
      </SpaceModel>

      {/* GUITAR AMP */}
      <SpaceModel
        side="right"
        y={0.53}
        depth={-0.05}
        scale={0.76}
        rotation={[-0.1, -0.42, 0.1]}
        spin={[0.04, -0.075, -0.03]}
        reducedMotion={reducedMotion}
      >
        <GuitarAmp />
      </SpaceModel>

      {/* VINYL */}
      <SpaceModel
        side="left"
        y={0.63}
        depth={0.15}
        scale={0.64}
        rotation={[0.3, 0.2, -0.06]}
        spin={[0.08, 0.04, 0.055]}
        reducedMotion={reducedMotion}
      >
        <Vinyl />
      </SpaceModel>

      {/* SMALL TABLE */}
      <SpaceModel
        side="right"
        y={0.73}
        depth={0.3}
        scale={0.64}
        rotation={[-0.08, 0.4, 0.12]}
        spin={[-0.025, 0.085, 0.035]}
        reducedMotion={reducedMotion}
      >
        <SmallTable />
      </SpaceModel>

      {/* TROPHY */}
      <SpaceModel
        side="left"
        y={0.84}
        depth={0}
        scale={0.54}
        rotation={[0.14, -0.34, -0.08]}
        spin={[0.035, 0.07, -0.025]}
        reducedMotion={reducedMotion}
      >
        <AwardTrophy />
      </SpaceModel>

      {/* SECOND PLANT */}
      <SpaceModel
        side="right"
        y={0.83}
        depth={0.2}
        scale={0.98}
        rotation={[-0.12, 0.3, 0.16]}
        spin={[0.045, -0.065, 0.03]}
        reducedMotion={reducedMotion}
      >
        <PlantModel2 />
      </SpaceModel>
    </>
  );
}

export default function ExperienceScene() {
  const [reducedMotion, setReducedMotion] =
    useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updatePreference = () => {
      setReducedMotion(media.matches);
    };

    updatePreference();

    media.addEventListener(
      "change",
      updatePreference,
    );

    return () => {
      media.removeEventListener(
        "change",
        updatePreference,
      );
    };
  }, []);

  return (
    <div
      className="experience-scene__canvas"
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 10],
          zoom: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <ambientLight intensity={1.55} />

        <hemisphereLight
          args={[
            "#f2efe7",
            "#1c1d19",
            1.15,
          ]}
        />

        <directionalLight
          position={[5, 7, 8]}
          intensity={2.35}
        />

        <directionalLight
          position={[-5, -2, 4]}
          intensity={0.95}
          color="#c88262"
        />

        <pointLight
          position={[0, 0, 6]}
          intensity={0.7}
          color="#8fa37e"
        />

        <Suspense fallback={null}>
          <SideModels
            reducedMotion={reducedMotion}
          />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}