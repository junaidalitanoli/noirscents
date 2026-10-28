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
  mobileTabLabel: string;
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
}

const SLIDES: SlideData[] = [
  {
    id: "signature",
    tabLabel: "Signature Reserve",
    mobileTabLabel: "Signature",
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
  },
  {
    id: "desert-majesty",
    tabLabel: "Desert Majesty",
    mobileTabLabel: "Black Edition",
    eyebrow: "Obsidian Black Collection • For Men",
    eyebrowIcon: Sparkles,
    headlineLead: "Command Respect With",
    headlineHighlight: "Desert Majesty Extrait.",
    headlineGradient: "from-amber-700 via-amber-500 to-amber-900",
    tagline: "Sun-Warmed Saffron, Smoky Amber & Desert Cedar",
    subText: "All-Day Authoritative Sillage • Pure 50ml Artisan Extrait",
    primaryButton: {
      label: "Explore Desert Majesty",
      href: "/products/desert-majesty",
    },
    secondaryButton: {
      label: "Men's Black Collection",
      href: "/collections/men",
    },
    imageSrc: SITE_IMAGES.heroBanners.aqua.src,
    imageAlt: SITE_IMAGES.heroBanners.aqua.alt,
    themeAccent: "#b48325",
    vignetteDesktop: "from-[#f4f9fb]/95 via-[#f4f9fb]/85 to-transparent",
  },
  {
    id: "loyal-heart",
    tabLabel: "Loyal Heart",
    mobileTabLabel: "Gold Edition",
    eyebrow: "Radiant Gold Collection • For Women",
    eyebrowIcon: Flower2,
    headlineLead: "Liquid Golden Seduction In",
    headlineHighlight: "Loyal Heart.",
    headlineGradient: "from-rose-800 via-amber-600 to-amber-900",
    tagline: "Jasmine Sambac, Madagascar Vanilla & Baltic Amber Nectar",
    subText: "Velvety Golden Sillage • Pure 50ml Artisan Extrait",
    primaryButton: {
      label: "Discover Loyal Heart",
      href: "/products/loyal-heart",
    },
    secondaryButton: {
      label: "Women's Gold Collection",
      href: "/collections/women",
    },
    imageSrc: SITE_IMAGES.heroBanners.rose.src,
    imageAlt: SITE_IMAGES.heroBanners.rose.alt,
    themeAccent: "#be185d",
    vignetteDesktop: "from-[#fdf8f6]/95 via-[#fdf8f6]/85 to-transparent",
  },
  {
    id: "collections",
    tabLabel: "Men & Women",
    mobileTabLabel: "Collections",
    eyebrow: "Artisanal Black & Gold Extraits • 50ml Editions",
    eyebrowIcon: Sparkles,
    headlineLead: "Handcrafted Luxury",
    headlineHighlight: "Exclusively For You.",
    headlineGradient: "from-[#9a3412] via-[#b45309] to-[#78350f]",
    tagline: "13 Signature Extraits Crafted For Pakistan's Climate",
    subText: "Nationwide Cash on Delivery • Free Delivery Over Rs. 3,000",
    primaryButton: {
      label: "Shop Men's Collection",
      href: "/collections/men",
    },
    secondaryButton: {
      label: "Shop Women's Collection",
      href: "/collections/women",
    },
    imageSrc: SITE_IMAGES.heroBanners.bundles.src,
    imageAlt: SITE_IMAGES.heroBanners.bundles.alt,
    themeAccent: "#c2410c",
    vignetteDesktop: "from-[#fbf7f0]/95 via-[#fbf7f0]/85 to-transparent",
  },
];

// Infinite carousel clones array: [Clone(Bundles), Signature, Aqua, Royal Amber, Bundles, Clone(Signature)]
const ALL_SLIDES = [
  { ...SLIDES[SLIDES.length - 1], uniqueKey: "clone-last" },
  ...SLIDES.map((s) => ({ ...s, uniqueKey: s.id })),
  { ...SLIDES[0], uniqueKey: "clone-first" },
];

const SLIDE_DURATION = 6000;

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const realIndex =
    activeIndex === 0
      ? SLIDES.length - 1
      : activeIndex === ALL_SLIDES.length - 1
      ? 0
      : activeIndex - 1;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev >= ALL_SLIDES.length - 1) {
        return 1;
      }
      setIsTransitioning(true);
      setEnableTransition(true);
      return prev + 1;
    });
    setTimerKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev <= 0) {
        return SLIDES.length;
      }
      setIsTransitioning(true);
      setEnableTransition(true);
      return prev - 1;
    });
    setTimerKey((k) => k + 1);
  }, []);

  const goToSlide = (targetRealIndex: number) => {
    if (targetRealIndex === realIndex || isTransitioning) return;
    setIsTransitioning(true);
    setEnableTransition(true);
    setActiveIndex(targetRealIndex + 1);
    setTimerKey((k) => k + 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (activeIndex >= ALL_SLIDES.length - 1) {
      setEnableTransition(false);
      setActiveIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    } else if (activeIndex <= 0) {
      setEnableTransition(false);
      setActiveIndex(SLIDES.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }
  };

  // Safety fallback: If browser delays or drops transitionend event
  useEffect(() => {
    if (!isTransitioning) return;
    const safetyTimeout = setTimeout(() => {
      setIsTransitioning(false);
      setActiveIndex((curr) => {
        if (curr >= ALL_SLIDES.length - 1) return 1;
        if (curr <= 0) return SLIDES.length;
        return curr;
      });
    }, 850);
    return () => clearTimeout(safetyTimeout);
  }, [isTransitioning]);

  // Window Focus & Visibility Change Handler to prevent desync when tab is minimized or backgrounded
  useEffect(() => {
    const handleVisibilitySync = () => {
      if (typeof document !== "undefined" && document.hidden) {
        return; // Tab is hidden/minimized: pause
      }
      // When tab becomes active again, restore healthy state
      setIsTransitioning(false);
      setEnableTransition(false);
      setActiveIndex((curr) => {
        if (curr <= 0 || curr >= ALL_SLIDES.length - 1) {
          return 1;
        }
        return curr;
      });
      requestAnimationFrame(() => {
        setEnableTransition(true);
      });
      setTimerKey((k) => k + 1);
    };

    document.addEventListener("visibilitychange", handleVisibilitySync);
    window.addEventListener("focus", handleVisibilitySync);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilitySync);
      window.removeEventListener("focus", handleVisibilitySync);
    };
  }, []);

  // Autoplay interval with visibility check: strictly pauses while tab is minimized
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) {
        return; // Do not advance in background tabs
      }
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, timerKey]);

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

  return (
    <section
      className="relative w-full overflow-hidden bg-[#faf8f5] dark:bg-[#09090b] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Noir Scent Featured Campaigns"
    >
      {/* Sliding Track Viewport:
          - Mobile: Dedicated 520px height with editorial split (flacon visual on top, clean card below)
          - Desktop/Tablet: Panoramic side-by-side view with viewport constraint */}
      <div className="relative w-full h-[510px] sm:h-[530px] md:h-[540px] lg:h-[560px] xl:h-[580px] max-h-[calc(100vh-115px)] flex overflow-hidden">
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
                className="w-full shrink-0 relative h-full flex overflow-hidden"
                aria-hidden={!isCurrent}
              >
                {/* ========================================================
                    1. MOBILE LUXURY EDITORIAL SPLIT VIEW (< md)
                    Unobstructed bottle showcase on top + refined card below
                   ======================================================== */}
                <div className="md:hidden flex flex-col h-full w-full bg-[#faf8f5] dark:bg-[#0d0d10]">
                  {/* Top: 100% Clear Bottle Visual (No text collision) */}
                  <div className="relative w-full h-[52%] overflow-hidden bg-stone-100 dark:bg-stone-900">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      priority={index === 1}
                      sizes="(max-width: 768px) 100vw, 1920px"
                      className={`object-cover object-[78%_center] brightness-[1.01] contrast-[1.01] transition-transform duration-[6500ms] ease-out ${
                        isCurrent ? "scale-100" : "scale-[1.02]"
                      }`}
                    />
                    {/* Delicate gradient transition into card */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#faf8f5] dark:from-[#0d0d10] to-transparent pointer-events-none" />

                    {/* Floating Eyebrow Pill on Top Left */}
                    <div className="absolute top-3 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 dark:bg-[#16161b]/95 backdrop-blur-md border border-stone-200/90 dark:border-white/10 rounded-full shadow-xs text-[9.5px] font-semibold uppercase tracking-[0.16em] text-stone-900 dark:text-stone-100">
                      <IconComponent className="w-3 h-3" style={{ color: slide.themeAccent }} />
                      <span>{slide.eyebrow}</span>
                    </div>
                  </div>

                  {/* Bottom: Refined Typography & Action Card */}
                  <div className="relative flex-1 w-full bg-[#faf8f5] dark:bg-[#0d0d10] px-4 pt-2.5 pb-12 flex flex-col justify-between text-left">
                    <div className="space-y-1">
                      <h1 className="text-xl font-serif font-semibold tracking-tight uppercase leading-[1.12] text-stone-950 dark:text-stone-100">
                        {slide.headlineLead}{" "}
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.headlineGradient}`}>
                          {slide.headlineHighlight}
                        </span>
                      </h1>
                      <p className="text-[11.5px] font-semibold tracking-wider uppercase" style={{ color: slide.themeAccent }}>
                        {slide.tagline}
                      </p>
                      <p className="text-[9.5px] text-stone-600 dark:text-stone-400 tracking-wide uppercase font-medium">
                        {slide.subText}
                      </p>
                    </div>

                    {/* Mobile Thumb-Friendly CTA Buttons */}
                    <div className="flex items-center gap-2 pt-1.5">
                      <a
                        href={slide.primaryButton.href}
                        className="flex-1 py-2.5 px-3 text-white dark:text-[#09090b] text-center font-semibold text-[11px] uppercase tracking-wider rounded-xs shadow-xs active:scale-95 transition-all bg-[#1c1917] dark:bg-[#d4af37]"
                      >
                        {slide.primaryButton.label}
                      </a>
                      <Link
                        href={slide.secondaryButton.href}
                        className="flex-1 py-2.5 px-3 bg-white dark:bg-[#18181d] border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-stone-200 text-center font-semibold text-[11px] uppercase tracking-wider rounded-xs shadow-xs active:scale-95 transition-all"
                      >
                        {slide.secondaryButton.label}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    2. DESKTOP & TABLET PANORAMIC VIEW (>= md)
                    Side-by-side presentation with un-cropped flacon on right
                   ======================================================== */}
                <div className="hidden md:flex relative w-full h-full items-center overflow-hidden">
                  {/* Desktop Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      priority={index === 1}
                      sizes="(max-width: 1024px) 100vw, 1920px"
                      className={`object-cover object-[80%_center] brightness-[1.01] contrast-[1.01] transition-transform duration-[6500ms] ease-out ${
                        isCurrent ? "scale-100" : "scale-[1.02]"
                      }`}
                    />
                  </div>

                  {/* Refined Luxury Vignettes (Light Mode) */}
                  <div className={`hidden lg:block absolute inset-0 bg-gradient-to-r ${slide.vignetteDesktop} dark:hidden w-[58%] pointer-events-none`} />
                  <div className={`hidden sm:block lg:hidden absolute inset-0 bg-gradient-to-r ${slide.vignetteDesktop} dark:hidden w-[65%] pointer-events-none`} />
                  <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#faf8f5]/80 dark:hidden to-transparent pointer-events-none" />

                  {/* Dark Mode Luxury Obsidian Vignette */}
                  <div className="hidden lg:dark:block absolute inset-0 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/80 to-transparent w-[58%] pointer-events-none" />
                  <div className="hidden sm:dark:block lg:hidden absolute inset-0 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/80 to-transparent w-[65%] pointer-events-none" />
                  <div className="hidden dark:block absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />

                  {/* Desktop Content Overlay */}
                  <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 lg:px-8 py-8 lg:py-10 flex items-center h-full">
                    <div className="max-w-[560px] space-y-4 lg:space-y-5 text-left">
                      {/* Eyebrow Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3.5 py-1 bg-white/90 dark:bg-[#16161b]/90 border border-stone-200/90 dark:border-white/10 text-stone-800 dark:text-stone-200 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md shadow-xs rounded-full transition-all duration-600 ease-out delay-150 ${
                          isCurrent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5" style={{ color: slide.themeAccent }} />
                        <span>{slide.eyebrow}</span>
                      </div>

                      {/* Headline & Taglines */}
                      <div
                        className={`space-y-1.5 sm:space-y-2 transition-all duration-700 ease-out delay-250 ${
                          isCurrent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                      >
                        <h1 className="text-3xl lg:text-5xl font-serif font-semibold tracking-tight uppercase leading-[1.1] text-stone-950 dark:text-stone-100">
                          {slide.headlineLead} <br />
                          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.headlineGradient}`}>
                            {slide.headlineHighlight}
                          </span>
                        </h1>
                        <p className="text-sm lg:text-base font-semibold tracking-[0.14em] uppercase" style={{ color: slide.themeAccent }}>
                          {slide.tagline}
                        </p>
                        <p className="text-xs font-medium tracking-[0.1em] text-stone-600 dark:text-stone-400 uppercase">
                          {slide.subText}
                        </p>
                      </div>

                      {/* Desktop CTA Buttons */}
                      <div
                        className={`flex items-center gap-3 pt-2 transition-all duration-700 ease-out delay-400 ${
                          isCurrent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                        }`}
                      >
                        <a
                          href={slide.primaryButton.href}
                          className="px-7 py-3 text-white dark:text-[#09090b] bg-[#1c1917] dark:bg-[#d4af37] font-semibold text-xs uppercase tracking-widest transition-all text-center shadow-md hover:shadow-lg active:scale-95 rounded-xs hover:opacity-90"
                        >
                          {slide.primaryButton.label}
                        </a>
                        <Link
                          href={slide.secondaryButton.href}
                          className="px-7 py-3 bg-white/95 dark:bg-[#16161b]/95 border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-stone-100 font-semibold text-xs uppercase tracking-widest hover:bg-stone-100 dark:hover:bg-[#22222a] hover:border-stone-900 dark:hover:border-[#d4af37] transition-all text-center backdrop-blur-xs shadow-xs active:scale-95 rounded-xs"
                        >
                          {slide.secondaryButton.label}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Previous / Next Chevrons (Desktop & Tablet only) */}
        <div className="hidden sm:flex absolute inset-y-0 inset-x-4 lg:inset-x-8 items-center justify-between z-20 pointer-events-none">
          <button
            type="button"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous Slide"
            className="pointer-events-auto p-3 rounded-full bg-white/85 dark:bg-[#16161b]/85 hover:bg-white dark:hover:bg-[#22222a] text-stone-800 dark:text-stone-200 border border-stone-200/90 dark:border-white/10 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next Slide"
            className="pointer-events-auto p-3 rounded-full bg-white/85 dark:bg-[#16161b]/85 hover:bg-white dark:hover:bg-[#22222a] text-stone-800 dark:text-stone-200 border border-stone-200/90 dark:border-white/10 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Interactive Navigation Tabs & Real-time Progress Countdown */}
        <div className="absolute bottom-2 sm:bottom-4 inset-x-0 z-20 flex flex-col items-center gap-1.5 pointer-events-auto px-2">
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/90 dark:bg-[#16161b]/90 backdrop-blur-md rounded-full border border-stone-200/80 dark:border-white/10 shadow-xs max-w-full overflow-x-auto scrollbar-none">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === realIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative overflow-hidden px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider rounded-full transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 shadow-xs"
                      : "text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100/70 dark:hover:bg-zinc-800/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: isActive ? slide.themeAccent : "#a8a29e",
                    }}
                  />
                  {/* Short clean labels on mobile, full labels on desktop */}
                  <span className="sm:hidden">{slide.mobileTabLabel}</span>
                  <span className="hidden sm:inline">{slide.tabLabel}</span>

                  {/* 6-Second Visual Countdown Progress Line on the Active Tab */}
                  {isActive && (
                    <span
                      key={`${idx}-${timerKey}`}
                      className="absolute bottom-0 left-0 h-[2px] rounded-full"
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
