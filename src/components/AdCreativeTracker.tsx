"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { AdCreative } from "@/types";
import { Video, Image as ImageIcon, Layers, Film, Plus, Target, Users, TrendingUp } from "lucide-react";

interface AdCreativeTrackerProps {
  creatives: AdCreative[];
  onAdd?: () => void;
  isPrivate?: boolean;
}

export const AdCreativeTracker: React.FC<AdCreativeTrackerProps> = ({
  creatives,
  onAdd,
  isPrivate = false,
}) => {
  const getIcon = (type: AdCreative["type"]) => {
    switch (type) {
      case "Video": return Video;
      case "Image": return ImageIcon;
      case "Carousel": return Layers;
      case "Reel": return Film;
      default: return Target;
    }
  };

  const getStatusColor = (status: AdCreative["status"]) => {
    switch (status) {
      case "Winner": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Running": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Paused": return "bg-zinc-100 text-zinc-500 border-zinc-200";
      case "Failed": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-zinc-100 text-zinc-600 border-zinc-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950">Ad Creative Tracker</h3>
        {isPrivate && (
          <button 
            onClick={onAdd}
            className="text-[#c5a059] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-[#a58039] transition-colors"
          >
            <Plus size={14} /> Add Creative
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creatives.length === 0 && (
          <div className="lg:col-span-3 premium-card p-12 text-center opacity-50">
            <p className="text-sm text-zinc-500 italic font-medium">No ad creatives tracked yet.</p>
          </div>
        )}
        
        {creatives.map((creative) => {
          const Icon = getIcon(creative.type);
          const cpl = creative.leads > 0 ? creative.spend / creative.leads : 0;

          return (
            <motion.div
              key={creative.id}
              whileHover={{ y: -4 }}
              className="premium-card p-6 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-zinc-100 rounded-xl text-zinc-600">
                  <Icon size={20} />
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border", getStatusColor(creative.status))}>
                    {creative.status}
                  </span>
                  <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{creative.angle}</span>
                </div>
              </div>

              <div>
                <h4 className="font-black text-zinc-950">{creative.name}</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">{creative.platform} · {creative.type}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-zinc-100">
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-400 font-black uppercase">Spend</span>
                  <span className="text-xs font-black text-zinc-950">{formatCurrency(creative.spend)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-400 font-black uppercase">Leads</span>
                  <span className="text-xs font-black text-zinc-950">{creative.leads}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-400 font-black uppercase">CPL</span>
                  <span className={cn("text-xs font-black", cpl > 0 ? "text-[#c5a059]" : "text-zinc-300")}>
                    {cpl > 0 ? formatCurrency(cpl) : "--"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                   <span className="text-[8px] text-zinc-400 font-black uppercase">Profit Result</span>
                   <span className={cn("text-sm font-black", creative.revenue - creative.spend >= 0 ? "text-green-600" : "text-red-600")}>
                     {formatCurrency(creative.revenue - creative.spend)}
                   </span>
                </div>
                <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                   <div className={cn("h-full", creative.revenue > creative.spend ? "bg-green-500" : "bg-zinc-200")} style={{ width: creative.leads > 0 ? '70%' : '0%' }} />
                </div>
              </div>

              {(creative.publicLesson || (isPrivate && creative.notes)) && (
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                   <p className="text-[10px] text-zinc-600 italic leading-relaxed">
                     "{!isPrivate ? creative.publicLesson : creative.notes}"
                   </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
