"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* THREE.JS SYNTH */}
      <div className="hero__scene">
        <Scene />
      </div>

      <span className="hero__label hero__label--side">
        DATA SCIENCE - SOFTWARE - AUDIO
      </span>

      {/* NAME */}
      <div className="hero__content">
        <h1>
          <span>ZAINE</span>
          <span>ANCHETA</span>
        </h1>
      </div>

      {/* TEXTURE */}
      <div className="hero__texture" />
      <div className="hero__noise" />
    </section>
  );
}