import React from "react";
import { ProgressBar } from "./ProgressBar";
import { Target, Flag } from "lucide-react";
import { motion } from "framer-motion";

interface GoalTrackerProps {
  currentRevenue: number;
  targetRevenue: number;
}

export const GoalTracker: React.FC<GoalTrackerProps> = ({
  currentRevenue,
  targetRevenue,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="premium-card p-6 flex flex-col gap-4 relative overflow-hidden"
    >
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#c5a059]/10 rounded-lg">
            <Target size={20} className="text-[#c5a059]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-950 tracking-tight">Current Goal</h3>
            <p className="text-xs text-zinc-500 font-medium">Journey to 15,000 AED Revenue</p>
          </div>
        </div>
        <Flag size={20} className="text-zinc-400 opacity-30" />
      </div>

      <div className="bg-zinc-100 p-4 rounded-xl border border-zinc-200 relative z-10">
        <p className="text-sm text-zinc-800 font-bold italic mb-4 leading-relaxed">
          "Turn AED 5,000 into AED 15,000+ revenue using public client acquisition experiments."
        </p>
        <ProgressBar
          current={currentRevenue}
          total={targetRevenue}
          isCurrency
          color="bg-gradient-to-r from-[#c5a059] to-[#e5c07b]"
        />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
    </motion.div>
  );
};
