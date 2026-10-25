"use client";

import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  variant?: "icon" | "pill" | "drawer";
  className?: string;
}

export default function ThemeToggle({
  variant = "icon",
  className = "",
}: ThemeToggleProps) {
  const { isDark, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch during SSR
  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-transparent opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  if (variant === "drawer") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
          isDark
            ? "bg-[#16161b] border-[#d4af37]/40 text-[#f5e7b2] hover:bg-[#1f1f26]"
            : "bg-stone-50 border-stone-200 text-stone-900 hover:bg-stone-100"
        } ${className}`}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isDark
                ? "bg-[#25252e] text-[#d4af37]"
                : "bg-white text-stone-800 shadow-xs border border-stone-200"
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#d4af37] animate-fade-in" />
            ) : (
              <Moon className="w-4 h-4 text-stone-800 animate-fade-in" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em]">
              {isDark ? "Dark Aesthetic" : "Light Aesthetic"}
            </p>
            <p className="text-[10.5px] opacity-70 font-normal">
              {isDark ? "Haute Parfumerie Obsidian" : "Avenue Montaigne Alabaster"}
            </p>
          </div>
        </div>

        {/* Minimal Luxury Toggle Pill */}
        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative ${
            isDark ? "bg-[#d4af37]" : "bg-stone-300"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              isDark ? "translate-x-5 bg-[#09090b]" : "translate-x-0"
            }`}
          />
        </div>
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
          isDark
            ? "bg-[#18181c] border-[#d4af37]/40 text-[#f5e7b2] hover:border-[#d4af37] hover:bg-[#202027]"
            : "bg-white border-stone-200 text-stone-800 hover:border-black/30 hover:bg-stone-50 shadow-xs"
        } ${className}`}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 text-[#d4af37] transition-transform duration-300 rotate-0 hover:rotate-90" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-stone-800 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  // Default "icon" variant
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
        isDark
          ? "bg-[#16161b] border-white/10 text-[#d4af37] hover:border-[#d4af37]/60 hover:bg-[#1e1e24] shadow-xs"
          : "bg-stone-100/80 border-stone-200/90 text-stone-800 hover:text-black hover:border-black/30 hover:bg-stone-200/60 shadow-xs"
      } ${className}`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#d4af37] transition-transform duration-500 hover:rotate-90 animate-fade-in" />
      ) : (
        <Moon className="w-4 h-4 text-stone-800 transition-transform duration-500 hover:-rotate-45 animate-fade-in" />
      )}
    </button>
  );
}
