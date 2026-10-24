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

// Infinite carousel clones array: [Clone(Bundles), Signature, Aqua, Royal Amber, Bundles, Clone(Signature)]
const ALL_SLIDES = [
  { ...SLIDES[SLIDES.length - 1], uniqueKey: "clone-last" },
  ...SLIDES.map((s) => ({ ...s, uniqueKey: s.id })),
  { ...SLIDES[0], uniqueKey: "clone-first" },
];

// Continuous auto-rotation every 6 seconds (5 to 8 second range)
const SLIDE_DURATION = 6000;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  // Compute 0-indexed real slide for tabs, counters and accents
  const realIndex =
    activeIndex === 0
      ? SLIDES.length - 1
      : activeIndex === ALL_SLIDES.length - 1
      ? 0
      : activeIndex - 1;

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setEnableTransition(true);
    setActiveIndex((prev) => prev + 1);
    setTimerKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setEnableTransition(true);
    setActiveIndex((prev) => prev - 1);
    setTimerKey((k) => k + 1);
  }, []);

  const goToSlide = (targetRealIndex: number) => {
    if (targetRealIndex === realIndex || isTransitioning) return;
    setIsTransitioning(true);
    setEnableTransition(true);
    setActiveIndex(targetRealIndex + 1);
    setTimerKey((k) => k + 1);
  };

  // Seamless snap when sliding past the clones
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (activeIndex === ALL_SLIDES.length - 1) {
      setEnableTransition(false);
      setActiveIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    } else if (activeIndex === 0) {
      setEnableTransition(false);
      setActiveIndex(SLIDES.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }
  };

  // Uninterrupted auto-rotation every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, timerKey]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current < -45) {
      nextSlide();
    } else if (touchDeltaX.current > 45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const activeSlide = SLIDES[realIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#faf8f5] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Noir Scents Featured Campaigns"
    >
      {/* Sliding Track Viewport */}
      <div className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex overflow-hidden">
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: enableTransition
              ? "transform 750ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {ALL_SLIDES.map((slide, index) => {
            const isCurrent = index === activeIndex;
            const IconComponent = slide.eyebrowIcon;

            return (
              <div
                key={`${slide.uniqueKey}-${index}`}
                className="w-full shrink-0 relative min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden"
                aria-hidden={!isCurrent}
              >
                {/* Background Image with Cinematic Ken Burns Breathe */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    priority={index === 1}
                    sizes="100vw"
                    className={`object-cover object-[78%_center] sm:object-right md:object-center brightness-[1.02] contrast-[1.02] transition-transform duration-[6500ms] ease-out ${
                      isCurrent ? "scale-100" : "scale-108"
                    }`}
                  />
                </div>

                {/* Tailored Luxury Vignettes */}
                <div
                  className={`hidden lg:block absolute inset-0 bg-gradient-to-r ${slide.vignetteDesktop} w-[62%] pointer-events-none`}
                />
                <div
                  className={`lg:hidden absolute inset-0 bg-gradient-to-t ${slide.vignetteMobile} pointer-events-none`}
                />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#faf8f5]/90 to-transparent pointer-events-none" />

                {/* Content Overlay with Staggered Slide-In Transitions */}
                <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                  <div className="max-w-[620px] space-y-4 sm:space-y-6 text-left">
                    {/* Eyebrow Badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-stone-200/90 text-stone-800 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md shadow-xs rounded-full transition-all duration-600 ease-out delay-150 ${
                        isCurrent
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <IconComponent
                        className="w-3.5 h-3.5"
                        style={{ color: slide.themeAccent }}
                      />
                      <span>{slide.eyebrow}</span>
                    </div>

                    {/* Headline & Taglines */}
                    <div
                      className={`space-y-2 transition-all duration-700 ease-out delay-250 ${
                        isCurrent
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                    >
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[1.08] text-stone-950 font-heading">
                        {slide.headlineLead} <br />
                        <span
                          className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.headlineGradient}`}
                        >
                          {slide.headlineHighlight}
                        </span>
                      </h1>
                      <p
                        className="text-sm sm:text-base font-semibold tracking-[0.16em] uppercase"
                        style={{ color: slide.themeAccent }}
                      >
                        {slide.tagline}
                      </p>
                      <p className="text-[11px] sm:text-xs font-medium tracking-[0.12em] text-stone-600 uppercase">
                        {slide.subText}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div
                      className={`flex items-center gap-3 pt-2 transition-all duration-700 ease-out delay-400 ${
                        isCurrent
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <a
                        href={slide.primaryButton.href}
                        className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 text-white font-semibold text-[11px] sm:text-xs uppercase tracking-widest transition-all text-center shadow-md hover:shadow-lg active:scale-95"
                        style={{ backgroundColor: "#1c1917" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            slide.themeAccent;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            "#1c1917";
                        }}
                      >
                        {slide.primaryButton.label}
                      </a>
                      <Link
                        href={slide.secondaryButton.href}
                        className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 bg-white/95 border border-stone-300 text-stone-900 font-semibold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-stone-100 hover:border-stone-900 transition-all text-center backdrop-blur-xs shadow-xs active:scale-95"
                      >
                        {slide.secondaryButton.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top-Right Editorial Slide Counter */}
        <div className="hidden sm:flex absolute top-6 right-6 lg:right-10 z-20 items-center gap-2 px-3.5 py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-stone-200/80 shadow-xs text-xs font-mono tracking-widest text-stone-700 pointer-events-none">
          <span className="font-bold text-stone-950">0{realIndex + 1}</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-400">0{SLIDES.length}</span>
        </div>

        {/* Previous / Next Chevrons */}
        <div className="hidden sm:flex absolute inset-y-0 inset-x-4 lg:inset-x-8 items-center justify-between z-20 pointer-events-none">
          <button
            type="button"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous Slide"
            className="pointer-events-auto p-3.5 rounded-full bg-white/85 hover:bg-white text-stone-800 border border-stone-200/90 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next Slide"
            className="pointer-events-auto p-3.5 rounded-full bg-white/85 hover:bg-white text-stone-800 border border-stone-200/90 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Interactive Navigation Tabs & Real-time Progress Countdown */}
        <div className="absolute bottom-5 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-white/85 backdrop-blur-md rounded-full border border-stone-200/80 shadow-sm max-w-[94vw] overflow-x-auto scrollbar-none">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === realIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative overflow-hidden px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-stone-950 text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-950 hover:bg-stone-100/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-colors"
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
