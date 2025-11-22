"use client";

import React, { useEffect } from "react";
import Header from "../components/header";
import StatsSection from "../components/Home/StatsSection";
import ContactUs from "../components/contactus";
import HeroSection from "../components/Home/HeroSection";
import AnalysisSection from "../components/Home/AnalysisSection";
import ChainSection from "../components/Home/ChainSection";
import TestimonialSection from "../components/Home/TestimonialSection";
import Footer from "../components/footer";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function HomePage() {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden relative" style={{ fontFamily: "'ClashDisplay-Bold', sans-serif", margin: 0, padding: 0, border: 'none', borderTop: 'none', position: 'relative' }}>
      <style>{`
        @font-face {
          font-family: 'ClashDisplay-Bold';
          src: url('/fonts/ClashDisplay-Bold.woff2') format('woff2');
          font-weight: bold;
          font-display: swap;
        }
        :root {
          --primary-black: #000000;
          --elevated-black: #0A0A0A;
          --surface-black: #111111;
          --pure-white: #FFFFFF;
          --text-primary: #F5F5F5;
          --text-secondary: #A3A3A3;
          --accent-glow: rgba(255, 255, 255, 0.1);
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gradient-border {
          background: linear-gradient(black, black) padding-box,
                      linear-gradient(45deg, transparent, white, transparent) border-box;
          border: 1px solid transparent;
        }
        * {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
      <div id="smooth-wrapper" style={{ margin: 0, padding: 0, border: 'none', borderTop: 'none' }}>
        <div id="smooth-content" style={{ margin: 0, padding: 0, border: 'none', borderTop: 'none' }}>
          <Header />
          <div className="section-merge" style={{ border: 'none', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
            <HeroSection />
          </div>

          {/* Beautiful Section Divider */}
          <div className="section-divider"></div>

          <div className="orb-bg section-merge">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <StatsSection />
          </div>

          {/* Beautiful Section Divider */}
          <div className="section-divider"></div>

          <div className="orb-bg section-merge">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <AnalysisSection />
          </div>

          {/* Beautiful Section Divider */}
          <div className="section-divider"></div>

          <div className="orb-bg section-merge">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <ChainSection />
          </div>

          <div className="orb-bg section-merge">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <TestimonialSection />
          </div>

          <div className="orb-bg section-merge">
            <div className="orb orb-1" aria-hidden="true"></div>
            <div className="orb orb-2" aria-hidden="true"></div>
            <div className="orb orb-3" aria-hidden="true"></div>
            <ContactUs />
          </div>

          <div className="orb-bg section-merge">
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