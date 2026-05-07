import React from "react";
import { LogEntry } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface JourneyLogProps {
  logs: LogEntry[];
}

export const JourneyLog: React.FC<JourneyLogProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="premium-card p-8 flex flex-col items-center justify-center text-center gap-4 opacity-50">
        <div className="p-3 bg-secondary rounded-full">
          <Clock size={24} className="text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No updates logged yet. Start experimenting!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log, index) => (
        <motion.div
          key={log.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-6 pb-6 border-l border-white/10 last:pb-0"
        >
          {/* Timeline Dot */}
          <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
          
          <div className="premium-card p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-zinc-950">{log.experimentName} updated</h4>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="p-1.5 bg-green-500/10 rounded-full">
                <CheckCircle2 size={12} className="text-green-600" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2 border-y border-zinc-200">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Spent</span>
                <span className="text-xs font-black text-red-600">{formatCurrency(log.spent)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Revenue</span>
                <span className="text-xs font-black text-green-600">{formatCurrency(log.revenue)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Leads</span>
                <span className="text-xs font-black text-zinc-950">{log.leads}</span>
              </div>
            </div>

            {log.lesson && (
              <div className="flex gap-2 items-start bg-zinc-100 p-3 rounded-lg border border-zinc-200">
                <AlertCircle size={14} className="text-[#c5a059] mt-0.5 shrink-0" />
                <p className="text-xs text-zinc-600 leading-relaxed font-medium italic">
                  "{log.lesson}"
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
