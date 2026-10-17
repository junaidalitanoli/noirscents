import { Sparkles, Heart, Trees } from "lucide-react";
import { FragranceNotes } from "@/types";

interface NotesPyramidProps {
  notes: FragranceNotes;
}

export default function NotesPyramid({ notes }: NotesPyramidProps) {
  return (
    <div className="bg-[#fafafa] border border-black/8 p-6">
      <div className="flex items-center gap-2 mb-6 border-b border-black/8 pb-3">
        <Sparkles className="w-4 h-4 text-black" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
          Olfactory Architecture
        </h3>
      </div>

      <div className="space-y-6">
        {/* Top Notes */}
        <div className="relative pl-5 border-l-2 border-black">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            Top Notes (First 15-30 Minutes)
          </div>
          <p className="text-xs text-zinc-500 mb-2">The exhilarating initial impression upon spraying.</p>
          <div className="flex flex-wrap gap-2">
            {notes.top.map((note) => (
              <span
                key={note}
                className="px-3 py-1 bg-white border border-zinc-200 text-zinc-800 text-xs font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Heart Notes */}
        <div className="relative pl-5 border-l-2 border-zinc-500">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-800 mb-1">
            <Heart className="w-3.5 h-3.5 text-zinc-600" />
            Heart / Middle Notes (2 to 4 Hours)
          </div>
          <p className="text-xs text-zinc-500 mb-2">The defining core character and sillage aura.</p>
          <div className="flex flex-wrap gap-2">
            {notes.heart.map((note) => (
              <span
                key={note}
                className="px-3 py-1 bg-white border border-zinc-200 text-zinc-800 text-xs font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Base Notes */}
        <div className="relative pl-5 border-l-2 border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-1">
            <Trees className="w-3.5 h-3.5 text-zinc-700" />
            Base Notes (8 to 12+ Hours)
          </div>
          <p className="text-xs text-zinc-500 mb-2">The deep, intoxicating foundation that clings to skin and fabric.</p>
          <div className="flex flex-wrap gap-2">
            {notes.base.map((note) => (
              <span
                key={note}
                className="px-3 py-1 bg-[#121212] text-white text-xs font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
