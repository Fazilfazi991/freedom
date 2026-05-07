"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { Trophy, TrendingUp, Zap, Users, Briefcase } from "lucide-react";
import { Experiment } from "@/types";

interface BattleViewProps {
  experiments: Experiment[];
  className?: string;
}

export const BattleView: React.FC<BattleViewProps> = ({
  experiments,
  className,
}) => {
  const [metric, setMetric] = useState<"revenue" | "profit" | "roi" | "leads" | "deals">("revenue");

  const getMetricValue = (exp: Experiment) => {
    switch (metric) {
      case "revenue": return exp.revenue;
      case "profit": return exp.revenue - exp.spent;
      case "roi": return exp.spent > 0 ? ((exp.revenue - exp.spent) / exp.spent) * 100 : 0;
      case "leads": return exp.leads;
      case "deals": return exp.deals;
      default: return 0;
    }
  };

  const sortedExperiments = [...experiments].sort((a, b) => getMetricValue(b) - getMetricValue(a));
  const maxVal = Math.max(...sortedExperiments.map(exp => getMetricValue(exp)), 1);

  const formatValue = (val: number) => {
    if (metric === "roi") return `${val.toFixed(1)}%`;
    if (metric === "revenue" || metric === "profit") return formatCurrency(val);
    return val.toString();
  };

  const tabs = [
    { id: "revenue", label: "Revenue", icon: TrendingUp },
    { id: "profit", label: "Profit", icon: Zap },
    { id: "roi", label: "ROI", icon: Trophy },
    { id: "leads", label: "Leads", icon: Users },
    { id: "deals", label: "Deals", icon: Briefcase },
  ] as const;

  return (
    <div className={cn("premium-card p-6 flex flex-col gap-8", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950 flex items-center gap-2">
          <Trophy size={16} className="text-[#c5a059]" />
          Experiment Battle View
        </h3>
        <div className="flex bg-zinc-100 p-1 rounded-xl gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMetric(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all flex items-center gap-1.5",
                metric === tab.id ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {sortedExperiments.map((exp, index) => {
            const val = getMetricValue(exp);
            const percentage = (val / maxVal) * 100;
            const isLeading = index === 0 && val > 0;

            return (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-zinc-950">{exp.name}</span>
                    {isLeading && (
                      <span className="bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full flex items-center gap-1">
                        <Trophy size={8} /> Leading
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-black text-zinc-950">{formatValue(val)}</span>
                </div>
                <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn(
                      "h-full relative z-10",
                      exp.color === 'blue' ? 'bg-blue-500' : 
                      exp.color === 'green' ? 'bg-green-500' : 
                      exp.color === 'gold' ? 'bg-[#c5a059]' : 
                      exp.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {sortedExperiments.every(e => getMetricValue(e) === 0) && (
          <div className="py-12 text-center opacity-50 flex flex-col items-center gap-4">
             <div className="p-4 bg-zinc-100 rounded-full">
                <Zap size={32} className="text-zinc-300" />
             </div>
             <p className="text-sm text-zinc-500 italic font-medium">Waiting for the first result.</p>
          </div>
        )}
      </div>
    </div>
  );
};
