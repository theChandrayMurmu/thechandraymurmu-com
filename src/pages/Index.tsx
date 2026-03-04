import React, { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Mail, DollarSign } from 'lucide-react';
// @ts-ignore
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);
  useEffect(() => {
    const handleScroll = () => setNavBg(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[95%] max-w-5xl ${navBg ? 'bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-accent/10' : 'bg-transparent'}`}>
      <span className={`font-sans font-bold text-xl tracking-tighter ${navBg ? 'text-primary' : 'text-primary'}`}>thechandraymurmu</span>
      <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-primary/70">
        <a href="#work" className="hover:-translate-y-[1px] hover:text-accent transition-all">My Work</a>
        <a href="#pricing" className="hover:-translate-y-[1px] hover:text-accent transition-all">Pricing</a>
        <a href="#support" className="hover:-translate-y-[1px] hover:text-accent transition-all">Support Me</a>
      </div>
      <a href="#contact" className="bg-accent text-accent-foreground px-6 py-2 rounded-full font-mono text-sm tracking-wider uppercase hover:scale-105 transition-transform overflow-hidden relative group shadow-[0_0_15px_#7B61FF] hover:shadow-[0_0_25px_#7B61FF]">
        <span className="relative z-10 font-bold">Initiate</span>
      </a>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end justify-start overflow-hidden bg-background">
      {/* Background Image: Bioluminescence, modern vaporware */}
      <img
        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
        alt="Neon reflections and dark water patterns"
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 flex flex-col justify-end w-full md:w-3/4">
        <h1 className="flex flex-col gap-0 md:gap-2">
          <span className="hero-anim font-sans font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter text-primary">
            Engineering beyond
          </span>
          <span className="hero-anim font-drama italic text-6xl md:text-8xl lg:text-[11rem] text-accent leading-none -mt-2 drop-shadow-[0_0_30px_#7B61FF]">
            limits.
          </span>
        </h1>
        <p className="hero-anim mt-8 text-lg md:text-2xl text-primary/70 max-w-2xl font-sans font-light">
          thechandraymurmu — Building websites, SaaS, and Open Source artifacts.
        </p>
        <div className="hero-anim mt-12 flex items-center gap-4">
          <a href="#work" className="inline-flex items-center gap-2 bg-accent/10 border border-accent/50 text-accent px-8 py-4 rounded-full text-sm font-mono tracking-widest uppercase hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all shadow-[0_0_20px_rgba(123,97,255,0.2)]">
            Explore <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const ShufflerCard = () => {
  const [cards, setCards] = useState(['Neuromorphic Design', 'Kinetic Interfaces', 'Absolute Precision']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary/50 rounded-[2rem] p-8 shadow-sm border border-border flex flex-col h-[400px] relative overflow-hidden group">
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/20 blur-[100px] rounded-full group-hover:bg-accent/40 transition-colors duration-1000"></div>
      <h3 className="font-sans font-bold text-2xl text-primary mb-2 relative z-10 tracking-tight">Thoughtful Design</h3>
      <p className="text-primary/60 mb-8 font-light text-sm relative z-10">Every pixel serves a purpose. No decorative noise.</p>

      <div className="relative flex-1 mt-4 z-10">
        {cards.map((label, idx) => (
          <div
            key={label}
            className="absolute left-0 right-0 bg-background border border-border rounded-xl p-6 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center backdrop-blur-md"
            style={{
              top: `${idx * 16}px`,
              scale: 1 - (idx * 0.05),
              opacity: 1 - (idx * 0.1),
              zIndex: 10 - idx
            }}
          >
            <div className="w-2 h-2 rounded-full bg-accent mr-3 shadow-[0_0_10px_#7B61FF]"></div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const TypewriterCard = () => {
  const text = "INITIALIZING CORE...\n> System diagnostic running\n> Optimization 100%\n> Tests passed\n> Shipping on time.\n> _";
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setTimeout(() => { i = 0; }, 3000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="bg-secondary/50 rounded-[2rem] p-8 shadow-sm border border-border flex flex-col h-[400px] relative overflow-hidden group">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/10 blur-[100px] rounded-full group-hover:bg-accent/30 transition-colors duration-1000"></div>
      <div className="flex justify-between items-start xl:items-center mb-2 flex-col xl:flex-row gap-2 relative z-10">
        <h3 className="font-sans font-bold text-2xl text-primary tracking-tight">Shipped on Time</h3>
        <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border border-accent/20 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#7B61FF]"></span>
          <span className="font-mono text-[10px] uppercase text-accent tracking-widest">Live Feed</span>
        </div>
      </div>
      <p className="text-primary/60 mb-8 font-light text-sm relative z-10">No missed deadlines. Pure operational execution.</p>

      <div className="flex-1 bg-background rounded-xl p-6 overflow-hidden relative shadow-inner border border-border/50 z-10">
        <pre className="font-mono text-xs md:text-sm text-accent whitespace-pre-wrap leading-relaxed">
          {displayed}<span className="inline-block w-2 h-4 bg-accent animate-pulse align-middle ml-1 shadow-[0_0_8px_#7B61FF]"></span>
        </pre>
      </div>
    </div>
  )
}

const SchedulerCard = () => {
  return (
    <div className="bg-secondary/50 rounded-[2rem] p-8 shadow-sm border border-border flex flex-col h-[400px] overflow-hidden group relative">
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/20 blur-[100px] rounded-full group-hover:bg-accent/40 transition-colors duration-1000"></div>
      <h3 className="font-sans font-bold text-2xl text-primary mb-2 relative z-10 tracking-tight">Modern Design</h3>
      <p className="text-primary/60 mb-8 font-light text-sm relative z-10">Architecting contemporary aesthetic systems.</p>

      <div className="flex-1 relative bg-background/80 backdrop-blur-md rounded-xl border border-border/50 p-6 flex items-center justify-center z-10">
        <div className="grid grid-cols-7 gap-2 w-full">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center font-mono text-xs text-primary/40 pb-2 border-b border-border/50 mb-2">{d}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={`cell-${i}`} className={`aspect-square rounded-md border transition-all duration-300 ${i === 9 ? 'bg-accent/20 border-accent shadow-[0_0_15px_#7B61FF]' : 'bg-secondary/30 border-secondary/50 group-hover:border-primary/20'}`}></div>
          ))}
        </div>

        {/* Mock cursor animation */}
        <div className="absolute top-[40%] left-[60%] text-accent hover:animate-bounce shadow-2xl scale-x-[-1] transition-all drop-shadow-[0_0_10px_#7B61FF]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M4 2v20l5.5-5.5h7.5z" /></svg>
        </div>

        <div className="absolute bottom-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-mono text-[10px] tracking-widest uppercase shadow-[0_0_15px_#7B61FF] group-hover:scale-95 transition-transform cursor-pointer">
          Run.exe
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  return (
    <section id="work" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ShufflerCard />
          <TypewriterCard />
          <SchedulerCard />
        </div>
      </div>
    </section>
  )
}

const Philosophy = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-line',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
      )
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 md:py-56 px-6 bg-primary overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=2000&auto=format&fit=crop"
        alt="Dark neon water texture"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-color-dodge object-center"
      />
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <p className="phil-line font-sans font-light text-xl md:text-3xl text-primary-foreground/60 flex flex-col sm:flex-row sm:items-baseline gap-2 tracking-tight">
          Most developers focus on: <span className="text-primary-foreground font-mono text-sm md:text-sm uppercase tracking-widest border border-primary-foreground/20 px-6 py-3 rounded-full inline-block mt-2 sm:mt-0 w-max bg-primary-foreground/5 backdrop-blur-md">writing code.</span>
        </p>
        <p className="phil-line font-drama italic text-5xl md:text-7xl lg:text-[7rem] text-primary-foreground leading-none">
          I focus on: <br /><span className="text-accent underline decoration-1 underline-offset-[12px] drop-shadow-[0_0_20px_#7B61FF]">architecting systems.</span>
        </p>
      </div>
    </section>
  )
}

const Protocol = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.prot-card') as HTMLElement[];

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: 'max'
        });

        if (i > 0) {
          gsap.fromTo(cards[i - 1],
            { scale: 1, filter: 'blur(0px)', opacity: 1 },
            {
              scale: 0.9, filter: 'blur(20px)', opacity: 0.5,
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top top',
                scrub: true
              }
            }
          )
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-background pt-10">

      <div className="prot-card h-screen w-full flex items-center justify-center sticky top-0 bg-background border-t border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-64 rounded-full border border-accent/20 flex items-center justify-center animate-[spin_20s_linear_infinite] shadow-[inset_0_0_30px_rgba(123,97,255,0.1)] bg-secondary/30 backdrop-blur-md relative">
              <div className="absolute inset-0 rounded-full border border-accent/50 scale-105 opacity-50"></div>
              <div className="w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-accent flex items-center justify-center bg-accent/10 shadow-[0_0_20px_#7B61FF]">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-accent text-xs mb-4 tracking-widest uppercase px-3 py-1 border border-accent/30 rounded-full inline-block bg-accent/5 shadow-[0_0_10px_rgba(123,97,255,0.2)]">seq_01 / Discovery</div>
            <h2 className="font-sans font-bold text-5xl text-primary mb-6 tracking-tight">Discuss Ideas</h2>
            <p className="text-primary/60 text-lg md:text-xl font-light leading-relaxed">We map out the architecture, define the visual language, and set clear parameters. No guesswork, just strategic alignment.</p>
          </div>
        </div>
      </div>

      <div className="prot-card h-screen w-full flex items-center justify-center sticky top-0 bg-background border-t border-border shadow-[0_-20px_50px_#0A0A14]">
        <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-16 md:flex-row-reverse">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-sm h-64 bg-secondary/50 rounded-3xl relative overflow-hidden border border-border p-6 shadow-inner backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/80 shadow-[0_0_20px_#7B61FF] animate-[bounce_3s_infinite]"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5"></div>
              <div className="grid grid-cols-4 gap-4 h-full relative z-10">
                {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`rounded-lg transition-colors border border-border/50 ${i % 4 === 0 ? 'bg-accent/20 shadow-[inset_0_0_10px_#7B61FF]' : 'bg-primary/5'}`}></div>)}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-accent text-xs mb-4 tracking-widest uppercase px-3 py-1 border border-accent/30 rounded-full inline-block bg-accent/5 shadow-[0_0_10px_rgba(123,97,255,0.2)]">seq_02 / Development</div>
            <h2 className="font-sans font-bold text-5xl text-primary mb-6 tracking-tight">Build & Refine</h2>
            <p className="text-primary/60 text-lg md:text-xl font-light leading-relaxed">I engineer the solution using modern stacks. Interactive prototypes, clean codebases, and iterative feedback loops.</p>
          </div>
        </div>
      </div>

      <div className="prot-card h-screen w-full flex items-center justify-center sticky top-0 bg-background border-t border-border shadow-[0_-20px_50px_#0A0A14]">
        <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2 flex justify-center items-center h-64 bg-secondary/30 rounded-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border border-border/50 p-8 backdrop-blur-md">
            <svg viewBox="0 0 100 50" className="w-full stroke-accent fill-none stroke-[3] overflow-visible drop-shadow-[0_0_8px_#7B61FF]">
              <path d="M0,25 L30,25 L40,5 L50,45 L60,25 L100,25" className="animate-[dash_2s_linear_infinite]" strokeDasharray="120" strokeDashoffset="120" strokeLinecap="square" strokeLinejoin="miter"></path>
            </svg>
            <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-accent text-xs mb-4 tracking-widest uppercase px-3 py-1 border border-accent/30 rounded-full inline-block bg-accent/5 shadow-[0_0_10px_rgba(123,97,255,0.2)]">seq_03 / Deployment</div>
            <h2 className="font-sans font-bold text-5xl text-primary mb-6 tracking-tight">Ship on Time</h2>
            <p className="text-primary/60 text-lg md:text-xl font-light leading-relaxed">Rigorous QA, performance optimization, and seamless handover. The final product pushed to production.</p>
          </div>
        </div>
      </div>

    </section>
  )
}

const Pricing = () => {
  return (
    <section id="pricing" className="py-40 px-6 bg-background relative border-t border-border/50">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-drama italic text-5xl md:text-7xl text-primary mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Pricing options for booking</h2>
          <p className="text-primary/60 text-xl max-w-2xl mx-auto font-light">Transparent models for high-fidelity engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="bg-secondary/20 rounded-[3rem] p-10 border border-border shadow-sm hover:border-accent/30 transition-colors backdrop-blur-sm group">
            <h3 className="font-sans font-bold text-2xl text-primary mb-2">Essential</h3>
            <div className="font-mono text-4xl text-primary mb-8">$3k<span className="text-sm text-primary/30">/proj</span></div>
            <ul className="space-y-4 mb-10 text-sm text-primary/70 font-mono tracking-wide">
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> Custom Landing Page</li>
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> Responsive Layouts</li>
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> Basic SEO Setup</li>
            </ul>
            <a href="#contact" className="block text-center w-full py-4 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-colors font-mono text-xs uppercase tracking-widest group-hover:border-accent/50 group-hover:text-accent">Select</a>
          </div>

          <div className="bg-primary rounded-[3rem] p-12 shadow-[0_0_50px_rgba(123,97,255,0.15)] scale-100 md:scale-110 relative border border-accent/20 z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full"></div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_#7B61FF]">RECOMMENDED</div>
            <h3 className="font-sans font-bold text-2xl text-primary-foreground mb-2 mt-4 relative z-10">Performance</h3>
            <div className="font-mono text-5xl font-bold mb-8 text-accent drop-shadow-[0_0_10px_#7B61FF] relative z-10">$6k<span className="text-sm text-primary-foreground/30 font-normal">/proj</span></div>
            <ul className="space-y-4 mb-10 text-sm text-primary-foreground/80 font-mono tracking-wide relative z-10">
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> Full Web Application</li>
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> CMS Integration</li>
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent drop-shadow-[0_0_5px_#7B61FF]" /> Advanced Tech Stack</li>
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> 30-Day Support</li>
            </ul>
            <a href="#contact" className="relative z-10 block text-center w-full py-4 rounded-full bg-accent text-accent-foreground hover:scale-105 transition-transform font-mono text-xs tracking-widest uppercase font-bold shadow-[0_0_20px_#7B61FF]">Book Now</a>
          </div>

          <div className="bg-secondary/20 rounded-[3rem] p-10 border border-border shadow-sm hover:border-accent/30 transition-colors backdrop-blur-sm group">
            <h3 className="font-sans font-bold text-2xl text-primary mb-2">Enterprise</h3>
            <div className="font-mono text-4xl text-primary mb-8">Custom</div>
            <ul className="space-y-4 mb-10 text-sm text-primary/70 font-mono tracking-wide">
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> Retainer Options</li>
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> Dedicated Engineering</li>
              <li className="flex items-center gap-3"><CheckCircle size={16} className="text-accent" /> SaaS Architecture</li>
            </ul>
            <a href="#contact" className="block text-center w-full py-4 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-colors font-mono text-xs uppercase tracking-widest group-hover:border-accent/50 group-hover:text-accent">Discuss Idea</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary/50 relative px-6 pt-32 pb-12 border-t border-border/50 overflow-hidden">
      {/* Background noise grid for footer */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwQzBDMTQiPjwvcmVjdD48cGF0aCBkPSJNMCA4TDggMFpNMCAwTDggOFoiIHN0cm9rZT0iIzFGMUYyOCIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9zdmc+')] opacity-50 mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="font-drama italic text-6xl md:text-[7rem] text-accent mb-8 leading-none drop-shadow-[0_0_20px_rgba(123,97,255,0.4)]">Let's build.</h2>
            <p className="font-sans font-light text-lg mb-10 max-w-lg text-primary/70">
              Ready to turn an idea into a digital instrument? Reach out below or support the open source journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:hello@chandraymurmu.com" className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full transition-transform hover:scale-105 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_#7B61FF] font-bold">
                <Mail size={16} /> Contact Me
              </a>
              <a id="support" href="#" className="flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/40 focus:ring-1 focus:ring-accent px-8 py-4 rounded-full transition-colors font-mono text-xs uppercase tracking-widest border border-primary/20 text-primary">
                <DollarSign size={16} className="text-accent" /> Support Me
              </a>
            </div>
          </div>
          <div className="flex justify-start md:justify-end items-end">
            <div className="grid grid-cols-2 gap-16 font-mono text-sm tracking-wide">
              <div>
                <span className="text-primary/40 block mb-6 text-[10px] tracking-widest uppercase">Navigate</span>
                <ul className="space-y-4 text-primary/80">
                  <li><a href="#work" className="hover:text-accent hover:drop-shadow-[0_0_8px_#7B61FF] transition-all block">My Work</a></li>
                  <li><a href="#pricing" className="hover:text-accent hover:drop-shadow-[0_0_8px_#7B61FF] transition-all block">Pricing</a></li>
                </ul>
              </div>
              <div>
                <span className="text-primary/40 block mb-6 text-[10px] tracking-widest uppercase">Legal</span>
                <ul className="space-y-4 text-primary/80">
                  <li><a href="#" className="hover:text-accent hover:drop-shadow-[0_0_8px_#7B61FF] transition-all block">Twitter</a></li>
                  <li><a href="#" className="hover:text-accent hover:drop-shadow-[0_0_8px_#7B61FF] transition-all block">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-sans font-bold text-xl tracking-tighter leading-none text-primary">thechandraymurmu</div>

          <div className="flex items-center gap-3 bg-secondary/30 px-5 py-2.5 rounded-full border border-border/50 backdrop-blur-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_15px_#7B61FF]"></div>
            <span className="font-mono text-[10px] text-primary/70 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background border-x border-border max-w-full overflow-x-hidden selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
