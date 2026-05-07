"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertTriangle, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface RiskMeterProps {
  spent: number;
  budget: number;
  revenue: number;
  className?: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({
  spent,
  budget,
  revenue,
  className,
}) => {
  const budgetUsedPercent = (spent / budget) * 100;
  const revenueRecoveredPercent = spent > 0 ? (revenue / spent) * 100 : 0;

  let riskLevel: "Not Started" | "Low" | "Medium" | "High" | "Critical" = "Low";
  let color = "text-green-600";
  let message = "";
  let Icon = ShieldCheck;

  if (spent === 0) {
    riskLevel = "Not Started";
    color = "text-zinc-400";
    message = "No spend yet. Journey is still at setup stage.";
    Icon = ShieldCheck;
  } else if (revenue >= spent) {
    riskLevel = "Low";
    color = "text-green-600";
    message = "Revenue has recovered the current spend. Risk is under control.";
    Icon = ShieldCheck;
  } else if (budgetUsedPercent < 30) {
    riskLevel = "Medium";
    color = "text-yellow-600";
    message = "Early spend stage. Watch lead quality before scaling.";
    Icon = ShieldAlert;
  } else if (budgetUsedPercent < 70) {
    riskLevel = "High";
    color = "text-orange-600";
    message = "Spend is increasing without enough recovery. Review performance.";
    Icon = ShieldAlert;
  } else {
    riskLevel = "Critical";
    color = "text-red-600";
    message = "Most budget used without recovery. Analyze before spending more.";
    Icon = ShieldX;
  }

  return (
    <div className={cn("premium-card p-6 flex flex-col gap-6", className)}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950 flex items-center gap-2">
          <AlertTriangle size={16} className={color} />
          Risk Meter
        </h3>
        <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border", color.replace("text-", "bg-").replace("-600", "-500/10") + " " + color.replace("text-", "border-").replace("-600", "-500/20"))}>
          {riskLevel}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end mb-1">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Budget Utilization</span>
          <span className="text-xs font-black text-zinc-950">{budgetUsedPercent.toFixed(1)}%</span>
        </div>
        <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${budgetUsedPercent}%` }}
            className={cn("h-full transition-all", budgetUsedPercent > 70 ? "bg-red-500" : budgetUsedPercent > 30 ? "bg-orange-500" : "bg-[#c5a059]")}
          />
        </div>

        <div className="flex justify-between items-end mb-1 mt-2">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Recovery Rate</span>
          <span className="text-xs font-black text-zinc-950">{revenueRecoveredPercent.toFixed(1)}%</span>
        </div>
        <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(revenueRecoveredPercent, 100)}%` }}
            className={cn("h-full transition-all", revenueRecoveredPercent >= 100 ? "bg-green-500" : "bg-blue-500")}
          />
        </div>
      </div>

      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex gap-3 items-start mt-2">
        <Icon size={18} className={cn("shrink-0", color)} />
        <p className="text-xs text-zinc-600 font-medium leading-relaxed italic">
          "{message}"
        </p>
      </div>
    </div>
  );
};
