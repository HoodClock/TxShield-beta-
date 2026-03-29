"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from "postprocessing";
import { useVisibility } from "@/hooks/useVisibility"; // ✅ ADD THIS

import "./LightPillar.css";

const Hyperspeed = ({ effectOptions = {} }) => {
  const hyperspeed = useRef(null);
  const appRef = useRef(null);

  // ✅ VISIBILITY HOOK
  const { ref, isActive } = useVisibility();

  useEffect(() => {
    if (!isActive) return; // ✅ STOP INIT IF NOT VISIBLE

    if (appRef.current) {
      appRef.current.dispose();
    }

    const container = hyperspeed.current;
    if (!container) return;

    class App {
      constructor(container) {
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        container.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.clock = new THREE.Clock();
        this.disposed = false;

        this.animate = this.animate.bind(this);
      }

      animate() {
        if (this.disposed || !isActive) return; // ✅ STOP LOOP

        const delta = this.clock.getDelta();

        this.renderer.render(this.scene, this.camera);

        this.raf = requestAnimationFrame(this.animate);
      }

      start() {
        this.disposed = false;
        this.animate();
      }

      stop() {
        cancelAnimationFrame(this.raf);
      }

      dispose() {
        this.disposed = true;
        cancelAnimationFrame(this.raf);

        this.renderer.dispose();
        this.scene.clear();

        if (this.container) {
          while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
          }
        }
      }
    }

    const app = new App(container);
    appRef.current = app;
    app.start();

    return () => {
      app.dispose();
    };
  }, [isActive]); // ✅ IMPORTANT

  return <div id="lights" ref={(node) => {
    hyperspeed.current = node;
    ref.current = node; // ✅ CONNECT OBSERVER
  }} />;
};

export default Hyperspeed;