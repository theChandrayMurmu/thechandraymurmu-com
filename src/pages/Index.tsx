import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Mail, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);
  useEffect(() => {
    const handleScroll = () => setNavBg(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[95%] max-w-5xl ${navBg ? 'bg-background/80 backdrop-blur-xl border border-border shadow-lg' : 'bg-transparent'}`}>
      <span className={`font-serif font-bold text-xl ${navBg ? 'text-primary' : 'text-primary-foreground'}`}>thechandraymurmu</span>
      <div className={`hidden md:flex items-center gap-8 font-mono text-sm ${navBg ? 'text-primary' : 'text-primary-foreground/80'}`}>
        <a href="#work" className="hover:-translate-y-[1px] hover:text-accent transition-all">My Work</a>
        <a href="#pricing" className="hover:-translate-y-[1px] hover:text-accent transition-all">Pricing</a>
        <a href="#support" className="hover:-translate-y-[1px] hover:text-accent transition-all">Support Me</a>
      </div>
      <a href="#contact" className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-medium hover:scale-105 transition-transform overflow-hidden relative group shadow-sm text-sm">
        <span className="relative z-10">Contact</span>
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
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end justify-start overflow-hidden bg-primary">
      {/* Background Image: dark marble, gold accents, luxury */}
      <img
        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
        alt="Dark architectural marble luxury"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 flex flex-col justify-end w-full md:w-3/4">
        <h1 className="flex flex-col gap-2">
          <span className="hero-anim font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-primary-foreground">
            A private members' club meets
          </span>
          <span className="hero-anim font-drama italic text-6xl md:text-8xl lg:text-[10rem] text-accent leading-none mt-2">
            precision.
          </span>
        </h1>
        <p className="hero-anim mt-8 text-lg md:text-2xl text-primary-foreground/70 max-w-2xl font-sans font-light">
          thechandraymurmu — Building websites, SaaS, and Open Source.
        </p>
        <div className="hero-anim mt-12 flex items-center gap-4">
          <a href="#work" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
            See my work <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

const ShufflerCard = () => {
  const [cards, setCards] = useState(['User-Centric Architecture', 'Accessibility First', 'Pixel-Perfect Execution']);

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
    <div className="bg-background rounded-[2rem] p-8 shadow-sm border border-border flex flex-col h-[400px]">
      <h3 className="font-sans font-bold text-2xl text-primary mb-2">Thoughtful Design</h3>
      <p className="text-foreground/70 mb-8 font-light">Every pixel serves a purpose. No decorative noise.</p>

      <div className="relative flex-1 mt-4">
        {cards.map((label, idx) => (
          <div
            key={label}
            className="absolute left-0 right-0 bg-white border border-border rounded-xl p-6 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center"
            style={{
              top: `${idx * 16}px`,
              scale: 1 - (idx * 0.05),
              opacity: 1 - (idx * 0.1),
              zIndex: 10 - idx
            }}
          >
            <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
            <span className="font-mono text-sm text-primary">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const TypewriterCard = () => {
  const text = "Deploying production build...\n→ Optimization 100%\n→ Tests passed\n→ Shipping on time.";
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
    <div className="bg-background rounded-[2rem] p-8 shadow-sm border border-border flex flex-col h-[400px]">
      <div className="flex justify-between items-start xl:items-center mb-2 flex-col xl:flex-row gap-2">
        <h3 className="font-sans font-bold text-2xl text-primary">Shipped on Time</h3>
        <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="font-mono text-[10px] uppercase text-primary tracking-wider">Live Feed</span>
        </div>
      </div>
      <p className="text-foreground/70 mb-8 font-light">No missed deadlines. Pure operational execution.</p>

      <div className="flex-1 bg-primary rounded-xl p-6 overflow-hidden relative shadow-inner">
        <pre className="font-mono text-sm text-accent whitespace-pre-wrap leading-relaxed">
          {displayed}<span className="inline-block w-2 h-4 bg-accent animate-pulse align-middle ml-1"></span>
        </pre>
      </div>
    </div>
  )
}

const SchedulerCard = () => {
  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-sm border border-border flex flex-col h-[400px] overflow-hidden group hover:shadow-md transition-shadow">
      <h3 className="font-sans font-bold text-2xl text-primary mb-2">Modern Design</h3>
      <p className="text-foreground/70 mb-8 font-light">Architecting contemporary aesthetic systems.</p>

      <div className="flex-1 relative bg-primary/5 rounded-xl border border-primary/10 p-6 flex items-center justify-center">
        <div className="grid grid-cols-7 gap-2 w-full">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center font-mono text-xs text-foreground/40 pb-2 border-b border-border mb-2">{d}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={`cell-${i}`} className={`aspect-square rounded-md border ${i === 9 ? 'bg-accent/20 border-accent shadow-[0_0_10px_rgba(201,168,76,0.3)]' : 'bg-background border-border'}`}></div>
          ))}
        </div>

        {/* Mock cursor animation */}
        <div className="absolute top-[40%] left-[60%] text-primary group-hover:animate-bounce shadow-2xl scale-x-[-1] transition-all">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M4 2v20l5.5-5.5h7.5z" /></svg>
        </div>

        <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-mono text-xs shadow-lg group-hover:scale-95 transition-transform cursor-pointer">
          Save Progress
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  return (
    <section id="work" className="py-32 px-6 bg-white">
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
        src="https://images.unsplash.com/photo-1544256718-3b198d58ceae?q=80&w=2000&auto=format&fit=crop"
        alt="Dark texture luxury"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay object-center"
      />
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <p className="phil-line font-sans font-light text-xl md:text-3xl text-primary-foreground/60 flex flex-col sm:flex-row sm:items-baseline gap-2">
          Most agencies focus on: <span className="text-primary-foreground/90 font-mono text-sm md:text-base uppercase tracking-widest border border-primary-foreground/20 px-4 py-2 rounded-full inline-block mt-2 sm:mt-0 w-max">endless meetings.</span>
        </p>
        <p className="phil-line font-drama italic text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-tight">
          I focus on: <br /><span className="text-accent underline decoration-1 underline-offset-8">collaborating to build something great.</span>
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
            <div className="w-64 h-64 rounded-full border border-primary/10 flex items-center justify-center animate-[spin_20s_linear_infinite] shadow-inner bg-white">
              <div className="w-48 h-48 rounded-full border border-accent/40 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-primary flex items-center justify-center bg-primary/5">
                  <div className="w-4 h-4 rounded-full bg-accent"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">01. Discovery</div>
            <h2 className="font-sans font-bold text-5xl text-primary mb-6">Discuss Ideas</h2>
            <p className="text-foreground/70 text-xl font-light leading-relaxed">We map out the architecture, define the visual language, and set clear parameters. No guesswork, just strategic alignment.</p>
          </div>
        </div>
      </div>

      <div className="prot-card h-screen w-full flex items-center justify-center sticky top-0 bg-background border-t border-border shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-16 md:flex-row-reverse">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-sm h-64 bg-primary/5 rounded-3xl relative overflow-hidden border border-border p-6 shadow-inner">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent/80 shadow-[0_0_20px_#C9A84C] animate-[bounce_3s_infinite]"></div>
              <div className="grid grid-cols-4 gap-4 h-full">
                {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`rounded-lg transition-colors ${i % 3 === 0 ? 'bg-primary/20' : 'bg-primary/5'}`}></div>)}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">02. Development</div>
            <h2 className="font-sans font-bold text-5xl text-primary mb-6">Build & Refine</h2>
            <p className="text-foreground/70 text-xl font-light leading-relaxed">I engineer the solution using modern stacks. Interactive prototypes, clean codebases, and iterative feedback loops.</p>
          </div>
        </div>
      </div>

      <div className="prot-card h-screen w-full flex items-center justify-center sticky top-0 bg-background border-t border-border shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2 flex justify-center items-center h-64 bg-white rounded-3xl shadow-sm border border-border p-8">
            <svg viewBox="0 0 100 50" className="w-full stroke-accent fill-none stroke-2 overflow-visible">
              <path d="M0,25 L30,25 L40,10 L50,40 L60,25 L100,25" className="animate-[dash_2s_linear_infinite]" strokeDasharray="100" strokeDashoffset="100" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">03. Deployment</div>
            <h2 className="font-sans font-bold text-5xl text-primary mb-6">Ship on Time</h2>
            <p className="text-foreground/70 text-xl font-light leading-relaxed">Rigorous QA, performance optimization, and seamless handover. The final product pushed to production.</p>
          </div>
        </div>
      </div>

    </section>
  )
}

const Pricing = () => {
  return (
    <section id="pricing" className="py-40 px-6 bg-white relative border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-drama italic text-5xl md:text-7xl text-primary mb-6">Pricing options for booking</h2>
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto font-light">Transparent models for high-fidelity engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="bg-background rounded-[3rem] p-10 border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-sans font-bold text-2xl text-primary mb-2">Essential</h3>
            <div className="font-mono text-4xl text-primary mb-8">$3k<span className="text-sm text-foreground/50">/project</span></div>
            <ul className="space-y-4 mb-10 text-base text-foreground/80 font-light">
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> Custom Landing Page</li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> Responsive Layouts</li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> Basic SEO Setup</li>
            </ul>
            <a href="#contact" className="block text-center w-full py-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium">Select</a>
          </div>

          <div className="bg-primary rounded-[3rem] p-12 shadow-2xl scale-100 md:scale-110 relative border border-primary z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full text-xs font-mono font-bold tracking-widest shadow-lg">POPULAR</div>
            <h3 className="font-sans font-bold text-2xl text-primary-foreground mb-2 mt-4">Performance</h3>
            <div className="font-mono text-5xl text-primary-foreground mb-8 text-accent">$6k<span className="text-sm text-primary-foreground/50">/project</span></div>
            <ul className="space-y-4 mb-10 text-base text-primary-foreground/80 font-light">
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> Full Web Application</li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> CMS Integration</li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> Advanced Animations</li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> 30-Day Support</li>
            </ul>
            <a href="#contact" className="block text-center w-full py-4 rounded-full bg-accent text-accent-foreground hover:scale-105 transition-transform font-bold shadow-[0_0_20px_rgba(201,168,76,0.3)]">Book Now</a>
          </div>

          <div className="bg-background rounded-[3rem] p-10 border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-sans font-bold text-2xl text-primary mb-2">Enterprise</h3>
            <div className="font-mono text-4xl text-primary mb-8">Custom</div>
            <ul className="space-y-4 mb-10 text-base text-foreground/80 font-light">
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> Retainer Options</li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> Dedicated Engineering</li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-accent" /> SaaS Architecture</li>
            </ul>
            <a href="#contact" className="block text-center w-full py-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium">Discuss Idea</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary rounded-t-[4rem] px-6 pt-24 pb-12 text-primary-foreground -mt-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="font-drama italic text-6xl md:text-8xl text-accent mb-8 leading-none">Let's build.</h2>
            <p className="font-sans font-light text-xl mb-10 max-w-lg text-primary-foreground/80">
              Ready to turn an idea into a digital instrument? Reach out below or support the open source journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:hello@chandraymurmu.com" className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full transition-transform hover:scale-105 font-bold shadow-[0_0_20px_rgba(201,168,76,0.2)] text-lg">
                <Mail size={18} /> Contact Me
              </a>
              <a id="support" href="#" className="flex items-center justify-center gap-2 bg-primary-foreground/5 hover:bg-primary-foreground/10 px-8 py-4 rounded-full transition-colors font-mono text-sm border border-primary-foreground/10 text-lg">
                <DollarSign size={18} className="text-accent" /> Support Me
              </a>
            </div>
          </div>
          <div className="flex justify-start md:justify-end items-end">
            <div className="grid grid-cols-2 gap-16 font-mono text-base">
              <div>
                <span className="text-primary-foreground/40 block mb-6 text-xs tracking-widest uppercase">Navigate</span>
                <ul className="space-y-4">
                  <li><a href="#work" className="hover:text-accent transition-colors block">My Work</a></li>
                  <li><a href="#pricing" className="hover:text-accent transition-colors block">Pricing</a></li>
                </ul>
              </div>
              <div>
                <span className="text-primary-foreground/40 block mb-6 text-xs tracking-widest uppercase">Legal</span>
                <ul className="space-y-4">
                  <li><a href="#" className="hover:text-accent transition-colors block">Twitter</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors block">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif font-bold text-2xl tracking-tight leading-none text-white">thechandraymurmu</div>

          <div className="flex items-center gap-3 bg-primary-foreground/5 px-5 py-2.5 rounded-full border border-primary-foreground/10">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            <span className="font-mono text-xs text-primary-foreground/70 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
