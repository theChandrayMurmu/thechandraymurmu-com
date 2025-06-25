// import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Support from '@/components/Support';
// import Navigation from '@/components/Navigation';
// import { StickyBanner } from '@/components/ui/sticky-banner';
import InfiniteMovingCardsDemo from '@/components/ui/infinite-moving-cards-demo';
import Footer from '@/components/Footer';
import DevStrip from '@/components/ui/DevStrip';

const Index = () => {
  return (
    <div className="min-h-screen">
      <DevStrip />
      {/* <Navigation /> */}
      {/* <StickyBanner>
        <span className="text-lg font-bold text-white" style={{ lineHeight: '20px' }}>My Sticky Navbar</span>
      </StickyBanner> */}
      <Hero />
      <InfiniteMovingCardsDemo />
      <Projects />
      <Blog />
      <Support />
      <Footer />
    </div>
  );
};

export default Index;
