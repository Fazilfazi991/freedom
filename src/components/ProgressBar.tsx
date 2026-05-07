"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";

interface ProgressBarProps {
  label?: string;
  current: number;
  total: number;
  isCurrency?: boolean;
  showValues?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  current,
  total,
  isCurrency = false,
  showValues = true,
  className,
}) => {
  const percentage = Math.min((current / Math.max(total, 1)) * 100, 100);

  return (
    <div className="space-y-3 w-full">
      {(label || showValues) && (
        <div className="flex justify-between items-end">
          {label && <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">{label}</span>}
          {showValues && (
            <span className="text-sm font-black text-white italic">
              {percentage.toFixed(0)}% <span className="text-[10px] text-zinc-500 opacity-50 uppercase tracking-widest ml-1">Utilized</span>
            </span>
          )}
        </div>
      )}
      <div className={cn("h-2 w-full bg-zinc-800/50 rounded-full overflow-hidden p-0.5 border border-white/5", className)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full relative overflow-hidden",
            percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-orange-500" : "bg-cyan-500"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" />
        </motion.div>
      </div>
      {showValues && (
         <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-zinc-600">
           <span>{isCurrency ? formatCurrency(current) : current}</span>
           <span>Target: {isCurrency ? formatCurrency(total) : total}</span>
         </div>
      )}
    </div>
  );
};
