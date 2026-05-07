"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Milestone } from "@/types";
import { Trophy, Lock, CheckCircle2, Star } from "lucide-react";

interface MilestoneTrackerProps {
  milestones: Milestone[];
  className?: string;
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  milestones,
  className,
}) => {
  return (
    <div className={cn("premium-card p-6 flex flex-col gap-8", className)}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950 flex items-center gap-2">
          <Star size={16} className="text-[#c5a059]" />
          Journey Milestones
        </h3>
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
          {milestones.filter(m => m.isUnlocked).length} / {milestones.length} Achieved
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={cn(
              "p-4 rounded-2xl border transition-all flex items-start gap-4",
              m.isUnlocked 
                ? "bg-[#c5a059]/5 border-[#c5a059]/20" 
                : "bg-zinc-50 border-zinc-100 opacity-60"
            )}
          >
            <div className={cn(
              "p-2.5 rounded-xl shrink-0",
              m.isUnlocked ? "bg-[#c5a059] text-black shadow-lg" : "bg-zinc-200 text-zinc-400"
            )}>
              {m.isUnlocked ? <Trophy size={18} /> : <Lock size={18} />}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-black tracking-tight", m.isUnlocked ? "text-zinc-950" : "text-zinc-400")}>
                  {m.title}
                </span>
                {m.isUnlocked && <CheckCircle2 size={12} className="text-green-600" />}
              </div>
              <p className="text-[10px] text-zinc-500 font-medium leading-tight">{m.description}</p>
              {m.isUnlocked && m.unlockedAt && (
                <span className="text-[8px] text-[#c5a059] font-black uppercase tracking-widest mt-1">
                  Unlocked {new Date(m.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
