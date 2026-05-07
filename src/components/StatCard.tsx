"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatedNumber } from "./AnimatedNumber";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  isCurrency?: boolean;
  variant?: "default" | "green" | "red" | "gold";
  className?: string;
  isPrivate?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  isCurrency = false,
  variant = "default",
  className,
  isPrivate = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "green": return "text-green-500 bg-green-500/5 border-green-500/10";
      case "red": return "text-red-500 bg-red-500/5 border-red-500/10";
      case "gold": return "text-cyan-500 bg-cyan-500/5 border-cyan-500/10";
      default: return "text-zinc-400 bg-zinc-900/50 border-white/5";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "p-6 rounded-[2rem] border backdrop-blur-xl transition-all shadow-xl group",
        getVariantStyles(),
        className
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "p-3 rounded-2xl transition-all group-hover:scale-110",
          variant === "green" ? "bg-green-500/10 text-green-500" :
          variant === "red" ? "bg-red-500/10 text-red-500" :
          variant === "gold" ? "bg-cyan-500/10 text-cyan-500" :
          "bg-zinc-800 text-zinc-400"
        )}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">{label}</p>
        <div className="text-2xl font-black tracking-tighter text-white italic truncate">
          {isPrivate ? (
            <span className="opacity-20 select-none tracking-widest font-sans uppercase text-sm">Confidential</span>
          ) : (
            <>
              {isCurrency && <span className="text-sm mr-1 opacity-50">AED</span>}
              <AnimatedNumber value={value} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
