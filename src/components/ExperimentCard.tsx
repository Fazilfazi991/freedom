import React from "react";
import { Experiment } from "@/types";
import { cn, formatCurrency, calculateROI } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";
import { TrendingUp, Users, Target, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface ExperimentCardProps {
  experiment: Experiment;
  onUpdate: (experiment: Experiment) => void;
  isShareMode?: boolean;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({
  experiment,
  onUpdate,
  isShareMode = false,
}) => {
  const roi = calculateROI(experiment.revenue, experiment.spent);
  const isProfitable = roi > 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running":
      case "Scaling":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Paused":
      case "Testing":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Failed":
      case "Closed":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="premium-card p-6 flex flex-col gap-6"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-zinc-950">{experiment.name}</h3>
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border",
                getStatusColor(experiment.status)
              )}
            >
              {experiment.status}
            </span>
          </div>
          <p className="text-zinc-500 text-xs font-medium">{experiment.category}</p>
        </div>
        {!isShareMode && (
          <button
            onClick={() => onUpdate(experiment)}
            className="flex items-center gap-1 text-xs font-semibold text-[#c5a059] hover:text-[#a58039] transition-colors group"
          >
            Update
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1 font-bold">
            <Target size={10} /> Spent
          </span>
          <span className="text-sm font-bold text-red-600">
            {formatCurrency(experiment.spent)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1 font-bold">
            <TrendingUp size={10} /> Revenue
          </span>
          <span className="text-sm font-bold text-green-600">
            {formatCurrency(experiment.revenue)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1 font-bold">
            <Users size={10} /> Leads
          </span>
          <span className="text-sm font-bold text-zinc-950">{experiment.leads}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1 font-bold">
            <Briefcase size={10} /> Deals
          </span>
          <span className="text-sm font-bold text-zinc-950">{experiment.deals}</span>
        </div>
      </div>

      <div className="space-y-4">
        <ProgressBar
          label="Budget Utilization"
          current={experiment.spent}
          total={experiment.budget}
          isCurrency
          color={experiment.spent > experiment.budget ? "bg-red-500" : "bg-[#c5a059]"}
        />

        <div className="flex justify-between items-center pt-2 border-t border-zinc-200">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">ROI</span>
            <span className={cn("text-lg font-black", isProfitable ? "text-green-600" : "text-red-600")}>
              {roi.toFixed(1)}%
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Net P&L</span>
            <span className={cn("text-lg font-black", isProfitable ? "text-green-600" : "text-red-600")}>
              {formatCurrency(experiment.revenue - experiment.spent)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
