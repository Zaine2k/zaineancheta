"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__scene">
        <Scene />
      </div>

      <div className="hero__blob" />
      <div className="hero__circle" />
      <div className="hero__tiny-square" />

      <span className="hero__label hero__label--top">
        PORTFOLIO
      </span>

      <span className="hero__label hero__label--side">
        SOFTWARE — DATA — AUDIO — CREATIVE TECH
      </span>

      <div className="hero__content">
        <h1>
          <span>ZAINE</span>
          <span>ANCHETA</span>
        </h1>

      </div>

      <div className="hero__noise" />
    </section>
  );
}