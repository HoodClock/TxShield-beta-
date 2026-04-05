"use client";

import React, { useEffect, useRef } from "react";
import Header from "../components/header";
import StatsSection from "../components/Home/StatsSection";
import ContactUs from "../components/contactus";
import HeroSection from "../components/Home/HeroSection";
import AnalysisSection from "../components/Home/AnalysisSection";
import ChainSection from "../components/Home/ChainSection";
import TestimonialSection from "../components/Home/TestimonialSection";
import Footer from "../components/footer";
import DataFlowBackground from "../components/DataFlowBackground";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function HomePage() {
  const smoother = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const setupSmoother = async () => {
      const [{ gsap }, { ScrollSmoother }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollSmoother"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) {
        return;
      }

      gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

      const existingSmoother = ScrollSmoother.get();
      if (existingSmoother) {
        existingSmoother.kill();
      }

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      smoother.current = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

      cleanupRef.current = () => {
        if (smoother.current) {
          smoother.current.kill();
          smoother.current = null;
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    setupSmoother();

    return () => {
      isMounted = false;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden relative" style={{ fontFamily: "'ClashDisplay-Bold', sans-serif", margin: 0, padding: 0, border: 'none', borderTop: 'none', position: 'relative' }}>
      <div id="smooth-wrapper" style={{ margin: 0, padding: 0, border: 'none', borderTop: 'none' }}>
        <div id="smooth-content" style={{ margin: 0, padding: 0, border: 'none', borderTop: 'none' }}>
          <Header />
          <div className="section-merge relative" style={{ border: 'none', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
            <HeroSection />
          </div>

          {/* Beautiful Section Divider */}
          <div className="section-divider"></div>

          {/* Below-the-fold sections with content-visibility optimization */}
          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-stats relative">
            <DataFlowBackground className="opacity-30 z-0" />
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <div className="relative z-10">
              <StatsSection />
            </div>
          </div>

          {/* Beautiful Section Divider */}
          <div className="section-divider"></div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-analysis">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <AnalysisSection />
          </div>

          {/* Beautiful Section Divider */}
          <div className="section-divider"></div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-chain">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <ChainSection />
          </div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-testimonial">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <TestimonialSection />
          </div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-contact">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <ContactUs />
          </div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-footer">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
