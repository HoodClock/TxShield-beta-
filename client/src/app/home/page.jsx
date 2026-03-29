"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// ✅ Lazy-loaded components (code splitting)
const Header = dynamic(() => import("../components/header"));
const HeroSection = dynamic(() => import("../components/Home/HeroSection"));

const StatsSection = dynamic(() => import("../components/Home/StatsSection"), { ssr: false });
const AnalysisSection = dynamic(() => import("../components/Home/AnalysisSection"), { ssr: false });
const ChainSection = dynamic(() => import("../components/Home/ChainSection"), { ssr: false });
const TestimonialSection = dynamic(() => import("../components/Home/TestimonialSection"), { ssr: false });
const ContactUs = dynamic(() => import("../components/contactus"), { ssr: false });
const Footer = dynamic(() => import("../components/footer"), { ssr: false });
const DataFlowBackground = dynamic(() => import("../components/DataFlowBackground"), { ssr: false });

function HomePage() {

  useEffect(() => {
    let smootherInstance;

    const initGSAP = async () => {
      // ✅ Lazy load GSAP (BIG FIX)
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const ScrollSmootherModule = await import("gsap/ScrollSmoother");

      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      const ScrollSmoother = ScrollSmootherModule.ScrollSmoother;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // Clean previous instances
      const existing = ScrollSmoother.get();
      if (existing) existing.kill();

      ScrollTrigger.getAll().forEach((t) => t.kill());

      // Create smoother
      smootherInstance = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });
    };

    initGSAP();

    return () => {
      if (smootherInstance) smootherInstance.kill();
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden relative"
      style={{ fontFamily: "'ClashDisplay-Bold', sans-serif", margin: 0, padding: 0, border: 'none', borderTop: 'none', position: 'relative' }}
    >

      <div id="smooth-wrapper">
        <div id="smooth-content">

          <Header />

          <div className="section-merge relative">
            <HeroSection />
          </div>

          <div className="section-divider"></div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-stats relative">
            <DataFlowBackground className="opacity-30 z-0" />
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <div className="relative z-10">
              <StatsSection />
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-analysis">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <AnalysisSection />
          </div>

          <div className="section-divider"></div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-chain">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <ChainSection />
          </div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-testimonial">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <TestimonialSection />
          </div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-contact">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <ContactUs />
          </div>

          <div className="orb-bg section-merge content-visibility-auto contain-intrinsic-footer">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <Footer />
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;