import { Sparkles, Heart, Trees, Clock, ShieldCheck } from "lucide-react";
import { FragranceNotes } from "@/types";

interface NotesPyramidProps {
  notes: FragranceNotes;
  macerationDays?: number;
}

export default function NotesPyramid({ notes, macerationDays = 45 }: NotesPyramidProps) {
  return (
    <div className="bg-white dark:bg-[#111115] border border-black/8 dark:border-white/10 p-6 sm:p-8 space-y-8 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-black/8 dark:border-white/10 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#121212] dark:bg-[#1c1c24] flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4 text-[#c5a059] dark:text-[#d4af37]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#121212] dark:text-[#f4f4f5]">
              Olfactory Architecture &amp; Evolution
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light">
              How the fragrance blossoms and evolves over 12+ hours on warm skin
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 rounded-full text-[11px] font-semibold text-amber-900 dark:text-amber-200 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-[#c5a059] dark:text-[#d4af37]" />
          <span>Full 3-Tier Drydown</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Tier 1: Top Notes */}
        <div className="relative p-5 bg-[#fafafa] dark:bg-[#16161c] border border-black/6 dark:border-zinc-800 flex flex-col justify-between group hover:border-[#c5a059] dark:hover:border-[#d4af37] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] dark:text-[#d4af37] px-2 py-0.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-700/40">
                Phase 1
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">0–30 Mins</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-100 mb-1">
              Top Notes (Opening)
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-4">
              The luminous initial impression upon spraying—sparkling, fresh, and captivating.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60">
            {notes.top.map((note) => (
              <span
                key={note}
                className="px-2.5 py-1 bg-white dark:bg-[#202028] border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-xs shadow-2xs"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Tier 2: Heart Notes */}
        <div className="relative p-5 bg-[#fafafa] dark:bg-[#16161c] border border-black/6 dark:border-zinc-800 flex flex-col justify-between group hover:border-[#c5a059] dark:hover:border-[#d4af37] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-900 dark:text-zinc-200 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                Phase 2
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">2–6 Hours</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <Heart className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-100">
                Heart Notes (Core Sillage)
              </h4>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-4">
              The defining soul and signature of the fragrance that radiates into the room.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60">
            {notes.heart.map((note) => (
              <span
                key={note}
                className="px-2.5 py-1 bg-white dark:bg-[#202028] border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-xs shadow-2xs"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Tier 3: Base Notes */}
        <div className="relative p-5 bg-[#121212] dark:bg-[#0c0c10] border border-black/10 dark:border-[#d4af37]/30 text-white flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] dark:text-[#d4af37] px-2 py-0.5 bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-800">
                Phase 3
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">8–12+ Hours</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <Trees className="w-3.5 h-3.5 text-[#c5a059] dark:text-[#d4af37]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Base Notes (Deep Drydown)
              </h4>
            </div>
            <p className="text-[11px] text-zinc-300 dark:text-zinc-400 font-light leading-relaxed mb-4">
              The intoxicating foundation of precious woods, leathers, and ambers that clings to skin and fabric.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-700">
            {notes.base.map((note) => (
              <span
                key={note}
                className="px-2.5 py-1 bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-800 text-zinc-100 text-xs font-medium rounded-xs"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Super Maceration Certificate Note */}
      <div className="p-4 bg-[#fbf9f4] dark:bg-[#16161c] border border-[#e8dfcf] dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-colors">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#b48325] dark:text-[#d4af37] shrink-0" />
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
            <strong className="text-zinc-950 dark:text-zinc-100 font-semibold">{macerationDays}-Day Vault Maturation:</strong> All Noir Scent creations undergo temperature-controlled dark chamber maceration to seamlessly merge natural perfume oils and eliminate harshness.
          </p>
        </div>
        <span className="text-[11px] font-bold text-[#b48325] dark:text-[#d4af37] uppercase tracking-wider shrink-0 bg-white dark:bg-[#121216] px-3 py-1 border border-[#e8dfcf] dark:border-zinc-800">
          Quality Certified
        </span>
      </div>
    </div>
  );
}
