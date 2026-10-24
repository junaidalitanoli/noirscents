"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Waves, Flower2, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { STORE_CONFIG } from "@/lib/store-config";
import { SITE_IMAGES } from "@/lib/images";

interface SlideData {
  id: string;
  tabLabel: string;
  eyebrow: string;
  eyebrowIcon: typeof Sparkles;
  headlineLead: string;
  headlineHighlight: string;
  headlineGradient: string;
  tagline: string;
  subText: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
  imageSrc: string;
  imageAlt: string;
  themeAccent: string;
  vignetteDesktop: string;
  vignetteMobile: string;
}

const SLIDES: SlideData[] = [
  {
    id: "signature",
    tabLabel: "Signature Reserve",
    eyebrow: `Haute Parfumerie • ${STORE_CONFIG.concentrationText}`,
    eyebrowIcon: Sparkles,
    headlineLead: "Crafted For",
    headlineHighlight: "Extraordinary People.",
    headlineGradient: "from-[#9b6f1e] via-[#c59a3f] to-[#7d5612]",
    tagline: "Scents That Command Respect",
    subText: `${STORE_CONFIG.longevityText} Longevity • Pure Artisan Extrait`,
    primaryButton: {
      label: "Shop Best Sellers",
      href: "#best-sellers",
    },
    secondaryButton: {
      label: "All Collections",
      href: "/collections/all",
    },
    imageSrc: SITE_IMAGES.heroBanners.signature.src,
    imageAlt: SITE_IMAGES.heroBanners.signature.alt,
    themeAccent: "#b48325",
    vignetteDesktop: "from-[#faf8f5]/95 via-[#faf8f5]/85 to-transparent",
    vignetteMobile: "from-[#faf8f5]/98 via-[#faf8f5]/82 to-[#faf8f5]/30",
  },
  {
    id: "aqua",
    tabLabel: "Aqua Mist",
    eyebrow: "Mediterranean Freshness • Formulated For Heat",
    eyebrowIcon: Waves,
    headlineLead: "An Oceanic Rush Of",
    headlineHighlight: "Aqua Mist Extrait.",
    headlineGradient: "from-sky-700 via-teal-600 to-cyan-800",
    tagline: "Sparkling Sea Salt, Zesty Grapefruit & Driftwood",
    subText: "10–12+ Hours Breezy Endurance • Zero Alcohol Evaporation",
    primaryButton: {
      label: "Explore Aqua Mist",
      href: "/products/aqua-mist",
    },
    secondaryButton: {
      label: "Men's Collection",
      href: "/collections/men",
    },
    imageSrc: SITE_IMAGES.heroBanners.aqua.src,
    imageAlt: SITE_IMAGES.heroBanners.aqua.alt,
    themeAccent: "#0284c7",
    vignetteDesktop: "from-[#f4f9fb]/95 via-[#f4f9fb]/85 to-transparent",
    vignetteMobile: "from-[#f4f9fb]/98 via-[#f4f9fb]/82 to-[#f4f9fb]/30",
  },
  {
    id: "royal-amber",
    tabLabel: "Royal Amber",
    eyebrow: "Velvet Florals • Seductive Gourmand Warmth",
    eyebrowIcon: Flower2,
    headlineLead: "Liquid Golden Seduction In",
    headlineHighlight: "Royal Amber.",
    headlineGradient: "from-rose-800 via-amber-600 to-amber-900",
    tagline: "Golden Pear Nectar, White Jasmine & Baltic Amber",
    subText: "Uninhibited Royalty • Velvety Sillage That Captivates",
    primaryButton: {
      label: "Discover Royal Amber",
      href: "/products/royal-amber",
    },
    secondaryButton: {
      label: "Women's Florals",
      href: "/collections/women",
    },
    imageSrc: SITE_IMAGES.heroBanners.rose.src,
    imageAlt: SITE_IMAGES.heroBanners.rose.alt,
    themeAccent: "#be185d",
    vignetteDesktop: "from-[#fdf8f6]/95 via-[#fdf8f6]/85 to-transparent",
    vignetteMobile: "from-[#fdf8f6]/98 via-[#fdf8f6]/82 to-[#fdf8f6]/30",
  },
  {
    id: "bundles",
    tabLabel: "Curated Sets & Deals",
    eyebrow: "Special Value Bundles • Complimentary 2ml Sprays",
    eyebrowIcon: Gift,
    headlineLead: "Artisanal Pairings &",
    headlineHighlight: "Exclusive Duo Sets.",
    headlineGradient: "from-[#9a3412] via-[#b45309] to-[#78350f]",
    tagline: "Curated Twin Flacons & Travel Discovery Flights",
    subText: "Save Up To 30% Off • Nationwide Free TCS Delivery",
    primaryButton: {
      label: "Explore Deals & Sets",
      href: "/collections/deals",
    },
    secondaryButton: {
      label: "Discovery Flights",
      href: "/collections/testers",
    },
    imageSrc: SITE_IMAGES.heroBanners.bundles.src,
    imageAlt: SITE_IMAGES.heroBanners.bundles.alt,
    themeAccent: "#c2410c",
    vignetteDesktop: "from-[#fbf7f0]/95 via-[#fbf7f0]/85 to-transparent",
    vignetteMobile: "from-[#fbf7f0]/98 via-[#fbf7f0]/82 to-[#fbf7f0]/30",
  },
];

// Automatically rotates every 6 seconds (5 to 8 second target range)
const SLIDE_DURATION = 6000;

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setTimerKey((k) => k + 1); // Resets full 6s timer for the newly picked slide
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setTimerKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimerKey((k) => k + 1);
  }, []);

  // Continuous auto-rotation every 6 seconds:
  // Runs continuously without getting stuck or paused indefinitely on mouse hover.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setTimerKey((k) => k + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [timerKey]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left -> next
      nextSlide();
    } else if (diff < -50) {
      // Swiped right -> prev
      prevSlide();
    }
    touchStartX.current = null;
  };

  const activeSlide = SLIDES[currentSlide];
  const IconComponent = activeSlide.eyebrowIcon;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#faf8f5] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Noir Scents Featured Campaigns"
    >
      <div className="relative w-full min-h-[540px] sm:min-h-[620px] lg:min-h-[690px] flex items-center">
        {/* Render Background Slides (Cross-Fade Effect) */}
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-0 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* Campaign Image */}
              <Image
                src={slide.imageSrc}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover object-[78%_center] sm:object-right md:object-center brightness-[1.02] contrast-[1.02] transition-transform duration-7000 ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
              />

              {/* Luminous Vignette Overlays Tailored to Slide Theme */}
              <div
                className={`hidden lg:block absolute inset-0 bg-gradient-to-r ${slide.vignetteDesktop} w-[62%] pointer-events-none`}
              />
              <div
                className={`lg:hidden absolute inset-0 bg-gradient-to-t ${slide.vignetteMobile} pointer-events-none`}
              />
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Content Overlay (Animated on slide change with key={currentSlide}) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-[620px]">
            <div
              key={currentSlide}
              className="space-y-4 sm:space-y-6 text-left animate-fade-in"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-stone-200/90 text-stone-800 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md shadow-xs rounded-full">
                <IconComponent
                  className="w-3.5 h-3.5"
                  style={{ color: activeSlide.themeAccent }}
                />
                <span>{activeSlide.eyebrow}</span>
              </div>

              {/* Headline & Taglines */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[1.08] text-stone-950 font-heading">
                  {activeSlide.headlineLead} <br />
                  <span
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${activeSlide.headlineGradient}`}
                  >
                    {activeSlide.headlineHighlight}
                  </span>
                </h1>
                <p
                  className="text-sm sm:text-base font-semibold tracking-[0.16em] uppercase"
                  style={{ color: activeSlide.themeAccent }}
                >
                  {activeSlide.tagline}
                </p>
                <p className="text-[11px] sm:text-xs font-medium tracking-[0.12em] text-stone-600 uppercase">
                  {activeSlide.subText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={activeSlide.primaryButton.href}
                  className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 text-white font-semibold text-[11px] sm:text-xs uppercase tracking-widest transition-all text-center shadow-md hover:shadow-lg active:scale-95"
                  style={{ backgroundColor: "#1c1917" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = activeSlide.themeAccent;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#1c1917";
                  }}
                >
                  {activeSlide.primaryButton.label}
                </a>
                <Link
                  href={activeSlide.secondaryButton.href}
                  className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 bg-white/95 border border-stone-300 text-stone-900 font-semibold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-stone-100 hover:border-stone-900 transition-all text-center backdrop-blur-xs shadow-xs active:scale-95"
                >
                  {activeSlide.secondaryButton.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Arrows (Desktop & Tablet) */}
        <div className="hidden sm:flex absolute inset-y-0 inset-x-4 lg:inset-x-8 items-center justify-between z-20 pointer-events-none">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="pointer-events-auto p-3 rounded-full bg-white/80 hover:bg-white text-stone-800 border border-stone-200/80 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="pointer-events-auto p-3 rounded-full bg-white/80 hover:bg-white text-stone-800 border border-stone-200/80 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Interactive Navigation Tabs & Animated Countdown Progress */}
        <div className="absolute bottom-5 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-auto">
          {/* Slide Switcher Pill Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-white/85 backdrop-blur-md rounded-full border border-stone-200/80 shadow-sm">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative overflow-hidden px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-stone-950 text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-950 hover:bg-stone-100/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? slide.themeAccent : "#a8a29e",
                    }}
                  />
                  <span>{slide.tabLabel}</span>

                  {/* 6-Second Visual Countdown Progress Line on the Active Tab */}
                  {isActive && (
                    <span
                      key={`${idx}-${timerKey}`}
                      className="absolute bottom-0 left-0 h-[2.5px] rounded-full"
                      style={{
                        backgroundColor: slide.themeAccent,
                        animation: `progress ${SLIDE_DURATION}ms linear forwards`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
