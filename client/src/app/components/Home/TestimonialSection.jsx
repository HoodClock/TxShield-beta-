import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

// Expanded Testimonials for Infinite Scrolling
const testimonials = [
  {
    name: "Ravi Sankar",
    role: "Web 3 Developer",
    content:
      "Just checked out TxShield — really cool stuff! I can totally see how something like this can help people feel safer when interacting with Web3 apps. The interface is clean, and I love that it's straight to the point.",
    image: "/Images/ravisankar.jpeg",
    linkedin: "https://www.linkedin.com/in/ravi-sankar13/",
    initials: "RS",
  },
  {
    name: "Sarah Chen",
    role: "DeFi Researcher",
    content:
      "The honeypot detection feature is a lifesaver. I analyze dozens of tokens daily, and TxShield gives me that extra layer of confidence before I recommend anything to my community. Essential tool.",
    image: null,
    linkedin: "#",
    initials: "SC",
  },
  {
    name: "Alex Thompson",
    role: "NFT Collector",
    content:
      "I've lost funds to phishing links before, so the simulation feature is exactly what I needed. Seeing exactly what a transaction will do before I sign it changes everything.",
    image: null,
    linkedin: "#",
    initials: "AT",
  },
  {
    name: "Elena Rostova",
    role: "Smart Contract Auditor",
    content:
      "Impressive static analysis speed. The way it catches obscure reentrancy patterns before transaction broadcasting is on par with enterprise-grade tools. Very well executed.",
    image: null,
    linkedin: "#",
    initials: "ER",
  },
  {
    name: "Marcus Webb",
    role: "DEX Trader",
    content:
      "Slippage protection and sandbox simulations have saved me from multiple front-running bots this week alone. This extension is now mandatory for my entire trading team.",
    image: null,
    linkedin: "#",
    initials: "MW",
  },
  {
    name: "David Kim",
    role: "Web3 Agency Lead",
    content:
      "We strictly advise our high-net-worth clients to install TxShield. The visual pipeline makes it easy for non-technical users to understand exactly what they are approving.",
    image: null,
    linkedin: "#",
    initials: "DK",
  },
  {
    name: "Jessica Lin",
    role: "Yield Farmer",
    content:
      "Finally, a security tool that doesn't scream 'WARNING' at everything. It accurately flags the real threats. The UI is absolutely stunning, feels like a premium SaaS dashboard.",
    image: null,
    linkedin: "#",
    initials: "JL",
  },
  {
    name: "Omar Farooq",
    role: "Protocol Engineer",
    content:
      " Integrating with TxShield's API for our custom wallet was seamless. The threat intelligence feed is top-notch and constantly updated. Highly recommended.",
    image: null,
    linkedin: "#",
    initials: "OF",
  },
];

// Helper to shuffle the array for different tracks
const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

// Create two distinct tracks
const track1 = [...testimonials, ...testimonials]; // Duplicate for seamless looping
const track2 = [...shuffleArray(testimonials), ...shuffleArray(testimonials)];

function TestimonialSection() {
  return (
    <section className="relative py-20 bg-background overflow-hidden flex flex-col justify-center min-h-[700px] transition-colors duration-700">
      {/* CSS Variables & Keyframes for Scrolling */}
      <style jsx global>{`
        :root {
          --marquee-gap: 1.5rem;
          --marquee-duration: 50s;
        }

        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
          gap: var(--marquee-gap);
          /* Gradient masks to fade edges */
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .marquee-content {
          flex-shrink: 0;
          display: flex;
          justify-content: space-around;
          min-width: 100%;
          gap: var(--marquee-gap);
        }

        .scroll-left {
          animation: scroll-left var(--marquee-duration) linear infinite;
        }

        .scroll-right {
          animation: scroll-right calc(var(--marquee-duration) * 1.2) linear
            infinite;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--marquee-gap)));
          }
        }

        @keyframes scroll-right {
          from {
            transform: translateX(calc(-100% - var(--marquee-gap)));
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] translate-x-1/2"></div>
        {/* Subtle grid line background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBWMHBoMjB2MjBIMHptLjUtLjVoMTl2LTE5aC0xOXYxOXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
      </div>

      <div className="relative z-10 w-full max-w-[100vw] overflow-hidden">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            <span className="text-xs text-gray-300 font-semibold tracking-wider uppercase">
              Live Intel
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Community <span className="grad-word">Feedback</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Real-time reviews from developers, analysts, and traders utilizing
            TxShield.
          </p>
        </m.div>

        {/* Marquee Wrapper */}
        <div className="flex flex-col gap-6 w-full py-4">
          {/* Track 1: Scroll Left */}
          <div className="marquee-container w-full">
            <div className="marquee-content scroll-left">
              {track1.map((testimonial, idx) => (
                <ReviewCard key={`t1-${idx}`} testimonial={testimonial} />
              ))}
            </div>
            <div className="marquee-content scroll-left aria-hidden">
              {track1.map((testimonial, idx) => (
                <ReviewCard key={`t1-dup-${idx}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Track 2: Scroll Right */}
          <div className="marquee-container w-full">
            <div className="marquee-content scroll-right">
              {track2.map((testimonial, idx) => (
                <ReviewCard key={`t2-${idx}`} testimonial={testimonial} />
              ))}
            </div>
            <div className="marquee-content scroll-right aria-hidden">
              {track2.map((testimonial, idx) => (
                <ReviewCard key={`t2-dup-${idx}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual Review Card Component
const ReviewCard = ({ testimonial }) => (
  <div className="relative group w-[350px] sm:w-[400px] shrink-0">
    {/* Glow effect that appears on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

    {/* Glassmorphic Card Body */}
    <div className="relative h-full bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-border flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer hover:-translate-y-1 transition-transform duration-300 group-hover:border-primary/50">
      {/* Top row: Quote & Rating */}
      <div className="flex justify-between items-start mb-4">
        <svg
          className="w-8 h-8 text-blue-500/40 group-hover:text-blue-500/80 transition-colors"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        {/* 5-Star Rating Simulation */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-3.5 h-3.5 text-purple-500 animate-[pulse_2s_ease-in-out_infinite]"
              style={{ animationDelay: `${star * 0.1}s` }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Content text */}
      <p className="text-foreground/80 text-sm leading-relaxed mb-6 font-light group-hover:text-foreground transition-colors">
        "{testimonial.content}"
      </p>

      {/* User Info Bar */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border group-hover:border-primary/50 transition-colors">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-xs text-white font-bold"
            style={{ display: testimonial.image ? "none" : "flex" }}
          >
            {testimonial.initials}
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="font-semibold text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">
            {testimonial.name}
          </h4>
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">
            {testimonial.role}
          </p>
        </div>

        {testimonial.linkedin !== "#" && (
          <a
            href={testimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-card hover:bg-primary/20 text-muted-foreground hover:text-primary border border-transparent hover:border-primary/50 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  </div>
);

export default TestimonialSection;
