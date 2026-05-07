"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimelineEntry, TimelineEntryType } from "@/types";
import { 
  Plus, 
  ArrowDown, 
  ArrowUp, 
  Rocket, 
  Target, 
  Users, 
  Briefcase, 
  Zap, 
  AlertCircle,
  Trophy,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  FileText
} from "lucide-react";

interface JourneyTimelineProps {
  entries: TimelineEntry[];
  onAdd?: () => void;
  isPrivate?: boolean;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  entries,
  onAdd,
  isPrivate = false,
}) => {
  const [sortNewest, setSortNewest] = useState(true);

  const sortedEntries = [...entries].sort((a, b) => 
    sortNewest ? b.dayNumber - a.dayNumber : a.dayNumber - b.dayNumber
  );

  const getTypeStyles = (type: TimelineEntryType) => {
    switch (type) {
      case "Setup": return { color: "text-blue-500", bg: "bg-blue-500/10", icon: Rocket };
      case "Spend": return { color: "text-red-500", bg: "bg-red-500/10", icon: Target };
      case "Lead": return { color: "text-purple-500", bg: "bg-purple-500/10", icon: Users };
      case "Proposal": return { color: "text-indigo-500", bg: "bg-indigo-500/10", icon: FileText };
      case "Close": return { color: "text-green-500", bg: "bg-green-500/10", icon: Briefcase };
      case "Lesson": return { color: "text-[#c5a059]", bg: "bg-[#c5a059]/10", icon: Zap };
      case "Failure": return { color: "text-red-600", bg: "bg-red-600/10", icon: AlertCircle };
      case "Milestone": return { color: "text-gold-500", bg: "bg-gold-500/10", icon: Trophy };
      default: return { color: "text-zinc-500", bg: "bg-zinc-100", icon: Zap };
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950 flex items-center gap-2">
          <Rocket size={16} className="text-[#c5a059]" />
          Journey Timeline
        </h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSortNewest(!sortNewest)}
            className="text-zinc-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:text-zinc-600 transition-all"
          >
            {sortNewest ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
            {sortNewest ? "Newest First" : "Oldest First"}
          </button>
          {isPrivate && (
            <button 
              onClick={onAdd}
              className="text-[#c5a059] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:text-[#a58039] transition-all"
            >
              <Plus size={14} /> Add Entry
            </button>
          )}
        </div>
      </div>

      <div className="relative pl-8 space-y-12 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100">
        <AnimatePresence mode="popLayout">
          {sortedEntries.map((entry, index) => {
            const styles = getTypeStyles(entry.type);
            const Icon = styles.icon;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute -left-8 top-0 w-6.5 h-6.5 rounded-full border-4 border-white flex items-center justify-center shadow-md z-10 transition-transform hover:scale-125",
                  styles.bg, styles.color
                )}>
                  <Icon size={12} />
                </div>

                <div className="premium-card p-6 space-y-4 group">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest">Day {entry.dayNumber}</span>
                        <span className={cn("text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border", styles.bg, styles.color, styles.color.replace("text-", "border-").replace("-500", "-500/20"))}>
                          {entry.type}
                        </span>
                      </div>
                      <h4 className="text-lg font-black tracking-tight text-zinc-950 group-hover:text-[#c5a059] transition-colors">{entry.title}</h4>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">{new Date(entry.date).toLocaleDateString()}</span>
                  </div>

                  <p className="text-sm text-zinc-600 font-medium leading-relaxed italic border-l-2 border-zinc-100 pl-4">
                    "{entry.publicNote}"
                  </p>

                  {isPrivate && entry.privateNote && (
                    <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 flex gap-3 items-start">
                      <Lock size={14} className="text-zinc-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-zinc-500 leading-relaxed">
                        <span className="font-black uppercase tracking-widest text-[8px] text-zinc-400 block mb-1">Private Note</span>
                        {entry.privateNote}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

