"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LeadRecord, LeadStatus } from "@/types";
import { Users, Phone, FileText, Handshake, CheckCircle2, Ghost, XCircle } from "lucide-react";

interface LeadFunnelProps {
  leads: LeadRecord[];
  className?: string;
}

export const LeadFunnel: React.FC<LeadFunnelProps> = ({
  leads,
  className,
}) => {
  const getCount = (status: LeadStatus) => leads.filter(l => l.status === status).length;

  const funnelData = [
    { label: "New Leads", count: getCount("New Lead"), icon: Users, color: "bg-blue-500" },
    { label: "Contacted", count: getCount("Contacted"), icon: Phone, color: "bg-purple-500" },
    { label: "Proposal Sent", count: getCount("Proposal Sent"), icon: FileText, color: "bg-indigo-500" },
    { label: "Negotiation", count: getCount("Negotiation"), icon: Handshake, color: "bg-[#c5a059]" },
    { label: "Closed Won", count: getCount("Closed Won"), icon: CheckCircle2, color: "bg-green-500" },
  ];

  const totalLeads = leads.length;
  const contacted = getCount("Contacted") + getCount("Proposal Sent") + getCount("Negotiation") + getCount("Closed Won") + getCount("Closed Lost");
  const proposals = getCount("Proposal Sent") + getCount("Negotiation") + getCount("Closed Won") + getCount("Closed Lost");
  const closedWon = getCount("Closed Won");
  const ghosted = getCount("Ghosted");

  const rates = {
    contact: totalLeads > 0 ? (contacted / totalLeads) * 100 : 0,
    proposal: contacted > 0 ? (proposals / contacted) * 100 : 0,
    close: proposals > 0 ? (closedWon / proposals) * 100 : 0,
    ghost: totalLeads > 0 ? (ghosted / totalLeads) * 100 : 0,
  };

  if (totalLeads === 0) {
    return (
      <div className={cn("premium-card p-12 text-center opacity-50", className)}>
        <p className="text-sm text-zinc-500 italic font-medium">No leads logged yet.</p>
      </div>
    );
  }

  return (
    <div className={cn("premium-card p-8 flex flex-col lg:flex-row gap-12", className)}>
      <div className="flex-1 space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950 mb-8">Lead Funnel</h3>
        <div className="flex flex-col gap-2">
          {funnelData.map((step, index) => {
            const percentage = totalLeads > 0 ? (step.count / totalLeads) * 100 : 0;
            const width = 100 - (index * 10); // Funnel effect

            return (
              <div key={step.label} className="flex items-center gap-4">
                <div className="w-24 text-[10px] font-black uppercase tracking-tighter text-zinc-500 text-right">
                  {step.label}
                </div>
                <div className="flex-1 h-12 bg-zinc-100 rounded-lg overflow-hidden relative group">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    className={cn("h-full opacity-20", step.color)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center px-4 gap-3">
                    <step.icon size={16} className={step.color.replace("bg-", "text-")} />
                    <span className="text-lg font-black text-zinc-950">{step.count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:w-72 space-y-6 pt-10">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Conversion Metrics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col gap-1">
            <span className="text-[8px] text-zinc-400 font-black uppercase">Contact Rate</span>
            <span className="text-xl font-black text-zinc-950">{rates.contact.toFixed(0)}%</span>
          </div>
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col gap-1">
            <span className="text-[8px] text-zinc-400 font-black uppercase">Proposal Rate</span>
            <span className="text-xl font-black text-zinc-950">{rates.proposal.toFixed(0)}%</span>
          </div>
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col gap-1">
            <span className="text-[8px] text-zinc-400 font-black uppercase">Close Rate</span>
            <span className="text-xl font-black text-green-600">{rates.close.toFixed(0)}%</span>
          </div>
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col gap-1">
            <span className="text-[8px] text-zinc-400 font-black uppercase">Ghost Rate</span>
            <span className="text-xl font-black text-red-600">{rates.ghost.toFixed(0)}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 pt-4 border-t border-zinc-200">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center">
               <Ghost size={8} className="text-red-600" />
             </div>
             <span className="text-[10px] text-zinc-500 font-bold">{ghosted} Ghosted</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-zinc-500/20 flex items-center justify-center">
               <XCircle size={8} className="text-zinc-600" />
             </div>
             <span className="text-[10px] text-zinc-500 font-bold">{getCount("Closed Lost")} Lost</span>
           </div>
        </div>
      </div>
    </div>
  );
};
