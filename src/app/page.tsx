'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import FAQAccordion from "@/components/FAQAccordion";
import GlitchText from "@/components/GlitchText";
import DustEffect from "@/components/DustEffect";
import NightSky from "@/components/NightSky";
import HoverEffect from "@/components/HoverEffect";
import ScrollingText from "@/components/ScrollingText";
import ProductReveal from "@/components/ProductReveal";
import { redirectToCheckout } from "@/lib/stripe";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealProducts, setRevealProducts] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mysterious brand messages for scrolling text
  const brandMessages = [
    "WHAT YOU SEEK LIES WITHIN", 
    "THE KEY TO THE ENIGMA", 
    "DISCOVER THE UNKNOWN",
    "BETWEEN DARKNESS AND LIGHT",
    "ENO·YEK",
    "UNLOCK THE MYSTERY"
  ];
  
  useEffect(() => {
    // Delayed load for dramatic effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    // Reveal products after scrolling
    const productRevealTimer = setTimeout(() => {
      setRevealProducts(true);
    }, 2500);
    
    // Scroll tracking for parallax effects
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      
      // Apply subtle parallax effect to hero section
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.15}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(productRevealTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <NightSky starCount={150} density={0.3} />
      <DustEffect />
      
      {/* Navbar (minimal) */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-md' : 'py-6 bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif tracking-[0.2em] text-sm opacity-80">ENO-YEK</div>
          
          <div className="flex items-center space-x-6">
            <HoverEffect effectIntensity={0.08}>
              <button 
                onClick={redirectToCheckout}
                className="text-xs tracking-wider border-b border-white/30 pb-1 hover:border-white/90 transition-colors mr-4"
              >
                TRY ACCESS
              </button>
            </HoverEffect>
            <HoverEffect effectIntensity={0.08}>
              <a 
                href="/auth"
                className="text-xs tracking-wider border-b border-white/30 pb-1 hover:border-white/90 transition-colors"
              >
                SECURE PORTAL
              </a>
            </HoverEffect>
          </div>
        </div>
      </nav>
      
      {/* Mysterious scrolling text banner */}
      <div className="fixed bottom-0 left-0 w-full py-3 bg-black/50 backdrop-blur-sm z-20 border-t border-white/5">
        <ScrollingText texts={brandMessages} direction="left" className="text-white/40" />
      </div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-32 relative">
        <div ref={heroRef} className="z-10">
          <div 
            className={`flex flex-col items-center text-center gap-6 max-w-lg mx-auto transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-wide font-light leading-relaxed">
              <GlitchText text="PRE-ORDER: FIRST DROP" className="block mb-2" glitchInterval={7000} />
              <span className="block mt-3 opacity-90">IT'S A <span className="italic">SIGNAL</span>.</span>
            </h1>
            <div className="h-px w-16 bg-white/30 my-6"></div>
            <p className="text-lg md:text-xl text-accent/70 mb-2 font-light tracking-wider">1 in 100 gain access.</p>
            <p className="text-sm text-white/50 mb-8 font-light tracking-wide">
              This is a <span className="text-white/80">pre-order</span> for the first drop.<br />
              Pricing is <span className="text-white/80">significantly reduced</span> for early supporters.
            </p>
            <button
              id="checkout-button"
              onClick={redirectToCheckout}
              className="border border-white/20 text-white/90 font-light px-8 py-4 text-sm tracking-widest hover:bg-white/5 transition-all duration-300 relative mb-16"
            >
              <span className="relative z-10">PRE-ORDER ACCESS – €99</span>
              <div className="absolute inset-0 bg-white/5 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
            </button>
            
            {/* Countdown Timer with proper spacing */}
            <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-24 md:py-40 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-serif text-lg uppercase tracking-[0.3em] text-center text-white/70 mb-16">
            <GlitchText text="THE SIGNAL COMPONENTS" glitchInterval={6000} />
            <p className="text-xs text-white/40 mt-4 font-light tracking-wide text-center">
              First drop is a <span className="text-white/70">pre-order</span>.<br />
              Pricing is much lower for early access.
            </p>
          </h2>
          
          <div className="h-px w-24 bg-white/20 mx-auto my-12"></div>
          
          {/* Full Box Display - Premium Reveal Animation */}
          <div className="mb-32 relative group overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9] bg-black/50 border border-white/10 flex items-center justify-center relative group-hover:border-white/20 transition-all duration-700 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
              
              <HoverEffect className="relative z-10 max-w-md text-center mb-12 px-6 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700" effectIntensity={0.03}>
                <GlitchText text="THE BLACK BOX" className="font-serif text-lg md:text-xl tracking-widest mb-4" glitchInterval={5000} />
                <p className="text-sm text-white/60 font-light tracking-wider max-w-sm mx-auto">A signal of belonging. What lies inside determines your access level.</p>
              </HoverEffect>
              
              <div className="relative w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-1000">
                <Image
                  src="/fullbox.png"
                  alt="ENO-YEK Full Mystery Box"
                  width={600}
                  height={400}
                  className="object-contain max-h-full transform transition-all duration-700"
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {/* Product Images - Using ProductReveal for elegant animations */}
            <div className="relative">
              <HoverEffect className="w-full" effectIntensity={0.05}>
                <ProductReveal
                  productImage="/necklace.svg"
                  productName="THE PENDANT"
                  delay={700}
                  className="mb-4"
                />
              </HoverEffect>
              <p className="mt-6 text-xs leading-relaxed text-white/40 text-center max-w-xs mx-auto">Metal pendant with embedded NFC chip. 1 in 100 unlock elevated access.</p>
            </div>
            
            <div className="relative">
              <HoverEffect className="w-full" effectIntensity={0.05}>
                <ProductReveal
                  productImage="/card.svg"
                  productName="THE CARD"
                  delay={1200}
                  className="mb-4"
                />
              </HoverEffect>
              <p className="mt-6 text-xs leading-relaxed text-white/40 text-center max-w-xs mx-auto">Matte black card with embedded chip. Tap to verify identity and access level.</p>
            </div>
            
            <div className="relative">
              <HoverEffect className="w-full" effectIntensity={0.05}>
                <ProductReveal
                  productImage="/note.svg"
                  productName="THE NOTE"
                  delay={1700}
                  className="mb-4"
                />
              </HoverEffect>
              <p className="mt-6 text-xs leading-relaxed text-white/40 text-center max-w-xs mx-auto">Letterpressed note with coordinates. Sealed with wax for the chosen few.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section - Mysterious abstract visualization */}
      <section className="py-32 md:py-40 px-6 bg-gradient-to-b from-black via-black/90 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Abstract pattern background */}
          <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '15s' }}></div>
          <div className="absolute w-[400px] h-[400px] border border-white/3 rounded-full top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
          <div className="absolute w-[200px] h-[200px] border border-white/8 rounded-full top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col items-center mb-24">
            <GlitchText 
              text="1%" 
              className="font-mono text-6xl md:text-8xl font-light text-white/90 mb-6" 
              glitchInterval={4000} 
              glitchProbability={0.2}
            />
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-white/50">Gain Elevated Access</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group cursor-pointer">
              <div className="h-px w-full bg-white/10 mb-8 transition-all duration-500 group-hover:bg-white/30"></div>
              <div className="relative overflow-hidden">
                <p className="font-serif text-sm uppercase tracking-wider mb-3 text-white/80">Exclusive Events</p>
                <p className="text-xs text-white/40 leading-relaxed">Private gatherings in undisclosed locations. Verified access only.</p>
                <div className="absolute top-0 right-0 font-mono text-xs opacity-30 group-hover:opacity-60 transition-opacity">01</div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="h-px w-full bg-white/10 mb-8 transition-all duration-500 group-hover:bg-white/30"></div>
              <div className="relative overflow-hidden">
                <p className="font-serif text-sm uppercase tracking-wider mb-3 text-white/80">Inner Network</p>
                <p className="text-xs text-white/40 leading-relaxed">Connect with other verified members through secure channels.</p>
                <div className="absolute top-0 right-0 font-mono text-xs opacity-30 group-hover:opacity-60 transition-opacity">02</div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="h-px w-full bg-white/10 mb-8 transition-all duration-500 group-hover:bg-white/30"></div>
              <div className="relative overflow-hidden">
                <p className="font-serif text-sm uppercase tracking-wider mb-3 text-white/80">Hidden Knowledge</p>
                <p className="text-xs text-white/40 leading-relaxed">Access to restricted information and rare opportunities.</p>
                <div className="absolute top-0 right-0 font-mono text-xs opacity-30 group-hover:opacity-60 transition-opacity">03</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/FOMO - Minimal, mysterious */}
      <section className="py-32 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-serif text-sm uppercase tracking-[0.15em] text-center text-white/60 mb-24">Recipient Experiences</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="group">
              <p className="text-sm md:text-base leading-relaxed text-white/70 font-light">
                <span className="text-lg font-serif opacity-60">"</span>
                <span className="relative">
                  I was invited to <span className="italic">something</span> last week. I cannot share details, but it has changed everything.
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-white/10 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                </span>
                <span className="text-lg font-serif opacity-60">"</span>
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-white/30">A.M., Verified — June 2025</p>
            </div>
            
            <div className="group">
              <p className="text-sm md:text-base leading-relaxed text-white/70 font-light">
                <span className="text-lg font-serif opacity-60">"</span>
                <span className="relative">
                  The object itself is exquisite. Even without access, the craftsmanship alone makes it worth acquiring.
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-white/10 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                </span>
                <span className="text-lg font-serif opacity-60">"</span>
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-white/30">C.L., Standard — April 2025</p>
            </div>
            
            <div className="group md:col-span-2 max-w-xl mx-auto">
              <p className="text-sm md:text-base leading-relaxed text-white/70 font-light text-center">
                <span className="text-lg font-serif opacity-60">"</span>
                <span className="relative">
                  <GlitchText 
                    text="[REDACTED FOR PRIVACY]" 
                    className="inline" 
                    glitchInterval={6000}
                    glitchProbability={0.15}
                  />
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-white/10 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                </span>
                <span className="text-lg font-serif opacity-60">"</span>
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-white/30 text-center">J.D., Verified — May 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 md:py-40 px-6 bg-black relative overflow-hidden" id="faq">
        <div className="max-w-5xl mx-auto">
          <FAQAccordion />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-10 md:mb-0">
            <p className="font-serif tracking-[0.3em] text-sm text-white/70">ENO—YEK</p>
          </div>
          <div className="flex gap-8 md:gap-12 text-[10px] md:text-xs uppercase tracking-widest">
            <a href="#faq" className="text-white/40 hover:text-white/90 transition-colors duration-300">Inquiries</a>
            <a href="#" className="text-white/40 hover:text-white/90 transition-colors duration-300">Terms</a>
            <a href="#" className="text-white/40 hover:text-white/90 transition-colors duration-300">Discord</a>
            <a href="#" className="text-white/40 hover:text-white/90 transition-colors duration-300">Contact</a>
          </div>
          <div className="mt-10 md:mt-0 text-[8px] md:text-[10px] uppercase tracking-wider text-white/30">
            © {new Date().getFullYear()} ENO-YEK
          </div>
        </div>
      </footer>
    </div>
  );
}
