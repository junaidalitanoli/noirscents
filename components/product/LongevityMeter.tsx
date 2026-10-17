import { Clock, Wind } from "lucide-react";

interface LongevityMeterProps {
  longevity: number; // 1 to 5
  projection: string;
}

export default function LongevityMeter({ longevity, projection }: LongevityMeterProps) {
  const bars = [1, 2, 3, 4, 5];

  const getLongevityLabel = (rating: number) => {
    switch (rating) {
      case 5:
        return "Beast Mode (10-14+ Hours)";
      case 4:
        return "Long Lasting (8-10 Hours)";
      case 3:
        return "Moderate (6-8 Hours)";
      case 2:
        return "Subtle (4-6 Hours)";
      default:
        return "Intimate (2-4 Hours)";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-900 text-white rounded-2xl p-5 border border-zinc-800">
      {/* Longevity */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
          Longevity Endurance
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white">{longevity}/5</span>
          <span className="text-xs text-[#fef08a] font-medium">{getLongevityLabel(longevity)}</span>
        </div>
        {/* Rating Bars */}
        <div className="flex gap-1.5 pt-1">
          {bars.map((bar) => (
            <div
              key={bar}
              className={`h-2 flex-1 rounded-full ${
                bar <= longevity ? "bg-[#d4af37]" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sillage / Projection */}
      <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-4">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
          <Wind className="w-3.5 h-3.5 text-sky-400" />
          Sillage &amp; Projection
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-white">{projection}</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-tight">
          Leaves a mesmerizing scented trail in air-conditioned environments and outdoor gatherings.
        </p>
      </div>
    </div>
  );
}
