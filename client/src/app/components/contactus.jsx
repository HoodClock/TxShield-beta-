"use client";
import { useState, useRef } from "react";
import { m, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import { contactApi } from "@/api/api";
import ScrollIndicator from "./ScrollIndicator";

// ─── Testimonials Data ─────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Ravi Sankar",
    role: "Web 3 Developer",
    content:
      "Just checked out TxShield — really cool stuff! The interface is clean, and straight to the point. I can totally see how this helps people feel safer in Web3. The community really needs more tools that focus on transparency and user education like this one does.",
    image: "/Images/ravisankar.jpeg",
    linkedin: "https://www.linkedin.com/in/ravi-sankar13/",
    initials: "RS",
  },
  {
    name: "Sarah Chen",
    role: "DeFi Researcher",
    content:
      "The honeypot detection feature is a lifesaver. I analyze dozens of tokens daily, and TxShield gives me that extra layer of confidence. Essential tool for anyone serious about navigating the risks of decentralized finance without losing their shirt to sophisticated scams.",
    image: null,
    linkedin: "#",
    initials: "SC",
  },
  {
    name: "Alex Thompson",
    role: "NFT Collector",
    content:
      "I've lost funds to phishing links before. Seeing exactly what a transaction will do before signing it changes everything. This is the tool I needed. No more crossing my fingers every time I hit 'Confirm' on a new minting site or marketplace interaction.",
    image: null,
    linkedin: "#",
    initials: "AT",
  },
  {
    name: "Elena Rostova",
    role: "Smart Contract Auditor",
    content:
      "Impressive static analysis speed. Catches obscure reentrancy patterns before broadcasting — on par with enterprise-grade tools. Very well executed. The way it visualizes the flow of funds and potential state changes is exactly what the industry has been lacking for a long time.",
    image: null,
    linkedin: "#",
    initials: "ER",
  },
  {
    name: "Marcus Webb",
    role: "DEX Trader",
    content:
      "Sandbox simulations have saved me from multiple front-running bots this week alone. This is now mandatory for my entire trading team. We've seen a significant drop in slippage losses and unexpected contract failures since making TxShield our primary pre-flight check.",
    image: null,
    linkedin: "#",
    initials: "MW",
  },
  {
    name: "David Kim",
    role: "Web3 Agency Lead",
    content:
      "We strictly advise our high-net-worth clients to install TxShield. The visual pipeline makes it easy for non-technical users to understand what they're approving. It bridges the gap between complex blockchain transactions and human-readable security oversight perfectly.",
    image: null,
    linkedin: "#",
    initials: "DK",
  },
  {
    name: "Jessica Lin",
    role: "Yield Farmer",
    content:
      "Finally a security tool that doesn't scream WARNING at everything. It accurately flags the real threats. The UI feels like a premium SaaS dashboard. It integrates so cleanly into my daily workflow that I sometimes forget it's there until it saves me from a bad signature.",
    image: null,
    linkedin: "#",
    initials: "JL",
  },
  {
    name: "Omar Farooq",
    role: "Protocol Engineer",
    content:
      "Integrating with TxShield's API for our custom wallet was seamless. The threat intelligence feed is top-call and constantly updated. Highly recommended for any developer building in the space who wants to prioritize their users' security without adding friction.",
    image: null,
    linkedin: "#",
    initials: "OF",
  },
];

const track = [...testimonials, ...testimonials];

// ─── Review Card ───────────────────────────────────────────────────────────
const ReviewCard = ({ t, isExpanded, onExpand, onCollapse }) => (
  <m.div 
    onClick={(e) => { e.stopPropagation(); onExpand(); }}
    onMouseLeave={onCollapse}
    initial={false}
    animate={{ 
      height: isExpanded ? "auto" : 140,
      scale: isExpanded ? 1.05 : 1,
      zIndex: isExpanded ? 100 : 1,
      borderColor: isExpanded ? "rgba(168,85,247,0.5)" : "var(--border)",
      backgroundColor: isExpanded ? "var(--card)" : "var(--muted)",
      boxShadow: isExpanded ? "0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(168,85,247,0.2)" : "0 0 0px rgba(0,0,0,0)",
    }}
    transition={{ 
      type: "spring", 
      stiffness: 280, 
      damping: 30,
      restDelta: 0.001
    }}
    style={{ willChange: "transform, height, box-shadow" }}
    className={`w-[300px] shrink-0 border p-4 flex flex-col gap-3 group cursor-pointer relative overflow-hidden transition-colors duration-500 ${isExpanded ? '' : 'hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]'}`}
  >
    <div className={`font-mono text-[11px] leading-relaxed transition-colors duration-500 ${isExpanded ? "text-foreground" : "text-muted-foreground line-clamp-3 group-hover:text-foreground/70"}`}>
      "{t.content}"
    </div>
    
    <div className="flex items-center gap-2.5 pt-2 border-t border-border mt-auto">
      <div className="w-7 h-7 shrink-0 border border-border overflow-hidden bg-card flex items-center justify-center">
        {t.image ? (
          <Image src={t.image} alt={t.name} width={28} height={28} className="w-full h-full object-cover" />
        ) : (
          <span className="font-mono text-[9px] text-purple-400/80">{t.initials}</span>
        )}
      </div>
      <div>
        <p className="font-clash text-[11px] text-foreground font-semibold group-hover:text-purple-400 transition-colors">{t.name}</p>
        <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{t.role}</p>
      </div>
      {t.linkedin !== "#" && (
        <a href={t.linkedin} target="_blank" rel="noopener noreferrer"
          className="ml-auto text-muted-foreground/40 hover:text-blue-400 transition-colors"
          onClick={(e) => e.stopPropagation()}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      )}
    </div>

    {!isExpanded && (
      <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-purple-500/40 group-hover:bg-purple-500 animate-pulse shadow-[0_0_5px_rgba(168,85,247,0.5)]" />
    )}
  </m.div>
);

// ─── Main Component ────────────────────────────────────────────────────────
export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const pageRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await contactApi(formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(""), 5000);
    }, 2000);
  };

  return (
    <div ref={pageRef} className="relative h-screen overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col bg-background transition-colors duration-700">
      
      <ScrollIndicator containerRef={pageRef} />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        @keyframes marquee-h {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.5rem)); }
        }

        @keyframes progress-h {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        .marquee-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: marquee-h 60s linear infinite;
          padding: 4rem 0; /* Consistent padding for vertical growth */
          align-items: center;
          transform: translateZ(0);
        }

        .progress-bar-sync {
          animation: progress-h 60s linear infinite;
        }

        .marquee-hover-zone:hover .marquee-track {
          animation-play-state: paused !important;
        }
        .marquee-hover-zone:hover + .progress-area .progress-bar-sync {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 opacity-40 dark:opacity-100">
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-purple-900/5 dark:bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-cyan-900/5 dark:bg-cyan-900/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col w-full px-6 sm:px-10 lg:px-16 pb-12" onClick={() => setExpandedId(null)}>
        {/* ── TOP: TITLE + FORM ── */}
        <div className="flex flex-col pt-8 pb-4 shrink-0 pr-16">
          <h1 className="font-clash font-extrabold uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}>
            <span className="text-foreground">GET IN </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">TOUCH</span>
          </h1>
          <div className="flex items-center gap-4 mt-2 mb-4">
            <div className="h-[1px] w-10 bg-border" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Signal Transmission</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 shrink-0 pr-0 lg:pr-16">
          {/* LEFT: Info Panel */}
          <div className="lg:w-[320px] xl:w-[360px] shrink-0 border border-border border-t-2 border-t-purple-500 bg-card overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.05)] transition-colors duration-700">
            <div className="h-9 bg-muted border-b border-border flex items-center px-4">
              <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">Transmission Target</span>
            </div>
            <div className="p-5 flex flex-col gap-5">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">Primary Channel</p>
                <p className="font-clash text-lg font-bold text-foreground tracking-wide">TxShield@proton.me</p>
              </div>
              <div className="h-[1px] bg-border" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Response SLA</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                  <span className="font-mono text-xs text-muted-foreground">Within 24 hours</span>
                </div>
              </div>
              <div className="h-[1px] bg-border" />
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Use Cases</p>
                <div className="flex flex-col gap-1.5">
                  {["Security integrations", "Partnership inquiries", "Bug reports", "General feedback"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-border" />
                      <span className="font-mono text-[11px] text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="flex-1 border border-border border-t-2 border-t-cyan-500 bg-card overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-colors duration-700">
            <div className="h-9 bg-muted border-b border-border flex items-center px-4 justify-between">
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">Compose Message</span>
              <span className="font-mono text-[10px] text-cyan-500/50 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,211,238,0.8)]"></span>
                Encrypted via TLS
              </span>
            </div>
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 group">
                  <label className="font-mono text-[10px] text-muted-foreground group-focus-within:text-cyan-400 transition-colors uppercase tracking-widest">Identifier</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] focus:bg-muted text-foreground placeholder-muted-foreground font-mono text-xs transition-all outline-none"
                    placeholder="Full Name" />
                </div>
                <div className="flex flex-col gap-1 group">
                  <label className="font-mono text-[10px] text-muted-foreground group-focus-within:text-cyan-400 transition-colors uppercase tracking-widest">Return Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] focus:bg-muted text-foreground placeholder-muted-foreground font-mono text-xs transition-all outline-none"
                    placeholder="Email Address" />
                </div>
              </div>

              <div className="flex flex-col gap-1 group">
                <label className="font-mono text-[10px] text-muted-foreground group-focus-within:text-cyan-400 transition-colors uppercase tracking-widest">Payload</label>
                <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] focus:bg-muted text-foreground placeholder-muted-foreground font-mono text-xs transition-all outline-none resize-none"
                  placeholder="Your message..." />
              </div>

              <m.button type="submit" disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.005 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.995 }}
                className={`relative overflow-hidden w-full py-3 font-mono text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 group focus:outline-none
                  ${isSubmitting
                    ? "bg-muted border border-border text-muted-foreground cursor-not-allowed"
                    : "bg-muted border border-border hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] text-foreground"
                  }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border border-border border-t-primary animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    Transmit Signal
                  </>
                )}
              </m.button>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <m.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="p-3 border border-cyan-500/20 bg-cyan-500/10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-300/70 uppercase tracking-wider">Signal received — we'll respond within 24h</span>
                  </m.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4 py-8 pr-16">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.3em]">Field Reports — Community Intel</span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        {/* ── TESTIMONIALS AUTO MARQUEE ── */}
        <div className="flex flex-col gap-2 w-full pb-12">
          
          <div className="marquee-hover-zone relative w-full overflow-hidden mask-fade min-h-[300px] flex items-center">
            <div className="marquee-track">
              {track.map((t, i) => (
                <ReviewCard 
                  key={`testi-${i}`} 
                  t={t} 
                  isExpanded={expandedId === i}
                  onExpand={() => setExpandedId(i)}
                  onCollapse={() => setExpandedId(null)}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Scroll Indicator */}
          <div className="progress-area flex items-center gap-4 pr-16">
            <div className="h-[1px] flex-1 bg-border relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-400 origin-left w-full progress-bar-sync" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">Signal Coverage</span>
              <div className="w-8 h-[1px] bg-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
