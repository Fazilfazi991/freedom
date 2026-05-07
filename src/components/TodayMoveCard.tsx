"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TodayMove, Priority, MoveStatus } from "@/types";
import { Zap, Clock, Edit3, Target, ChevronRight } from "lucide-react";

interface TodayMoveCardProps {
  move: TodayMove;
  onEdit?: () => void;
  className?: string;
  isPrivate?: boolean;
}

export const TodayMoveCard: React.FC<TodayMoveCardProps> = ({
  move,
  onEdit,
  className,
  isPrivate = false,
}) => {
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case "High": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "Medium": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "Low": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  const getStatusColor = (s: MoveStatus) => {
    switch (s) {
      case "Done": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Doing": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Planned": return "bg-zinc-100 text-zinc-500 border-zinc-200";
    }
  };

  return (
    <div className={cn("premium-card p-8 relative overflow-hidden group", className)}>
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#c5a059]/10 rounded-2xl text-[#c5a059] shadow-inner">
              <Zap size={24} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Today's Move</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Day {new Date(move.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", getPriorityColor(move.priority))}>
              {move.priority}
            </span>
            <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", getStatusColor(move.status))}>
              {move.status}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-2xl font-black tracking-tight text-zinc-950 leading-tight">
            {move.title}
          </h4>
          <p className="text-zinc-600 font-medium leading-relaxed italic border-l-2 border-[#c5a059]/30 pl-4">
            "{move.description}"
          </p>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-zinc-100">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <Target size={14} className="text-[#c5a059]" />
            Focus: {move.linkedExperimentId || "General Journey"}
          </div>
          {isPrivate && (
            <button 
              onClick={onEdit}
              className="p-2.5 rounded-xl bg-zinc-50 text-zinc-400 hover:text-[#c5a059] hover:bg-zinc-100 transition-all border border-zinc-100 shadow-sm"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
