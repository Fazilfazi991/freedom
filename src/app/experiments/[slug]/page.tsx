"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Wallet,
  Zap, 
  Clock, 
  Plus, 
  Save, 
  Trash2, 
  Edit3,
  Share2,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Video,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Filter,
  FileText,
  UserPlus,
  CalendarCheck,
  ClipboardCheck,
  Sparkles,
  ChevronRight,
  Rocket,
  Flame,
  Timer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "@/context/DashboardContext";
import { StatCard } from "@/components/StatCard";
import { ProgressBar } from "@/components/ProgressBar";
import { UpdateModal } from "@/components/UpdateModal";
import { cn, formatCurrency } from "@/lib/utils";

export default function ExperimentDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { 
    data, 
    updateExperiment, 
    isMounted, 
    isShareMode, 
    setIsShareMode,
    isPrivateMode,
    setIsPrivateMode,
    isAdmin
  } = useDashboard();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const experiment = useMemo(() => 
    data.experiments.find(e => e.slug === slug), 
    [data.experiments, slug]
  );

  if (!isMounted || !experiment) return null;

  const isConsultation = experiment.slug === "free-branding-consultation";

  const stats = {
    remaining: experiment.budget - experiment.spent,
    cpl: experiment.enquiries > 0 ? experiment.spent / experiment.enquiries : 0,
    conversion: experiment.enquiries > 0 ? (experiment.deals / experiment.enquiries) * 100 : 0,
    spendPercent: (experiment.spent / experiment.budget) * 100,
    netPL: experiment.revenue - experiment.spent,
    roi: experiment.spent > 0 ? ((experiment.revenue - experiment.spent) / experiment.spent) * 100 : 0
  };

  const handleUpdate = (updatedFields: any) => {
    updateExperiment(experiment.slug, updatedFields);
  };

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto space-y-12 bg-cinematic min-h-screen text-white">
      {/* Decorative Glow */}
      <div className={cn("fixed top-0 right-0 w-[500px] h-[500px] blur-[150px] -z-10 opacity-20", experiment.color.includes('#') ? `bg-[${experiment.color}]` : 'bg-cyan-500')} />

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="space-y-6">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-zinc-500 hover:text-cyan-500 transition-colors text-xs font-black uppercase tracking-[0.3em] italic"
          >
            <ArrowLeft size={16} /> WAR ROOM
          </button>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
              {experiment.name.split(' ')[0]} <span className="text-cyan-500">{experiment.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-zinc-400">
                {experiment.statusBadge}
              </span>
              <div className="px-4 py-1.5 rounded-full flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/10 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                {isPrivateMode ? <Lock size={12} /> : <Globe size={12} />}
                <span className="text-[10px] font-black uppercase tracking-widest">{isPrivateMode ? "Admin" : "Public"}</span>
              </div>
            </div>
          </div>
          <p className="text-zinc-500 text-lg md:text-2xl font-black italic tracking-tight max-w-3xl leading-tight">
            {experiment.role.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && !isShareMode && (
            <>
              <button 
                onClick={() => setIsPrivateMode(!isPrivateMode)}
                className="p-4 rounded-2xl bg-zinc-900 border border-white/10 text-zinc-500 hover:text-white transition-all shadow-xl"
              >
                {isPrivateMode ? <Lock size={24} /> : <Eye size={24} />}
              </button>
              <button 
                onClick={() => setIsUpdateModalOpen(true)}
                className="bg-cyan-500 text-black px-10 py-5 rounded-3xl font-black flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
              >
                <Plus size={22} /> Update
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
        <StatCard label="Budget" value={experiment.budget} icon={Wallet} isCurrency className="bg-white/5 border-white/10 backdrop-blur-xl" />
        <StatCard label="Spent" value={experiment.spent} icon={Target} isCurrency variant="red" className="bg-white/5 border-white/10 backdrop-blur-xl" />
        <StatCard label="Net P&L" value={stats.netPL} icon={Zap} isCurrency variant={stats.netPL >= 0 ? "green" : "red"} className="bg-zinc-900 border-white/10 shadow-2xl" />
        <StatCard label="Enquiries" value={experiment.enquiries} icon={Users} variant="default" className="bg-white/5 border-white/10 backdrop-blur-xl" />
        <StatCard label="Yield" value={experiment.revenue} icon={TrendingUp} isCurrency variant="green" className="bg-white/5 border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(34,197,94,0.1)]" />
      </div>

      {/* Core Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Consultation Funnel Visual */}
          {isConsultation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 md:p-12 space-y-12"
            >
              <div className="flex justify-between items-center">
                 <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500">Sales Funnel</h3>
                 <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Active Pipeline</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                 {[
                   { label: "Enquiries", val: experiment.enquiries, icon: UserPlus, color: "bg-blue-500" },
                   { label: "Booked", val: experiment.meetingsBooked, icon: Clock, color: "bg-purple-500" },
                   { label: "Done", val: experiment.meetingsCompleted, icon: CalendarCheck, color: "bg-indigo-500" },
                   { label: "Proposals", val: experiment.proposalsSent, icon: FileText, color: "bg-cyan-500" },
                   { label: "Closed", val: experiment.deals, icon: Briefcase, color: "bg-green-500" },
                 ].map((step, idx, arr) => {
                   const convRate = idx > 0 && arr[idx-1].val > 0 ? (step.val / arr[idx-1].val) * 100 : 0;
                   return (
                     <div key={step.label} className="relative group">
                       <div className="bg-zinc-950/60 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center gap-4 text-center h-full hover:border-cyan-500/30 transition-all group shadow-2xl">
                          <div className={cn("p-5 rounded-3xl text-black shadow-xl group-hover:scale-110 transition-transform", step.color)}>
                            <step.icon size={28} />
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2">{step.label}</p>
                            <p className="text-4xl font-black text-white italic tracking-tighter leading-none">{step.val}</p>
                          </div>
                          {idx > 0 && (
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-zinc-900 border border-white/20 rounded-full px-3 py-1.5 shadow-2xl hidden md:block">
                              <span className="text-[10px] font-black text-cyan-500 italic leading-none">{convRate.toFixed(0)}%</span>
                            </div>
                          )}
                       </div>
                     </div>
                   );
                 })}
              </div>
            </motion.div>
          )}

          {/* Efficiency Hub */}
          <div className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 md:p-12 space-y-12">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500">Yield Efficiency</h3>
              <div className="flex items-center gap-2 text-green-500">
                 <Rocket size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Scaling Factor</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-3">
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">ROI Performance</p>
                <p className={cn("text-6xl font-black italic tracking-tighter", stats.roi >= 0 ? "text-green-500" : "text-red-500")}>
                  {stats.roi.toFixed(0)}%
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">Acquisition Cost</p>
                <p className="text-6xl font-black text-white italic tracking-tighter">
                  {formatCurrency(experiment.enquiries > 0 ? experiment.spent / experiment.enquiries : 0).split(' ')[1]}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">Conversion Velocity</p>
                <p className="text-6xl font-black text-cyan-500 italic tracking-tighter">
                   {experiment.enquiries > 0 ? ((experiment.deals / experiment.enquiries) * 100).toFixed(0) : 0}%
                </p>
              </div>
            </div>
            <div className="pt-12 border-t border-white/10">
              <ProgressBar 
                label="WAR CHEST UTILIZATION" 
                current={experiment.spent} 
                total={experiment.budget} 
                isCurrency
                className="h-4"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-10">
           {/* ROI Meter */}
           <div className="bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 flex flex-col items-center text-center gap-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-[2rem] text-cyan-500 shadow-2xl relative z-10">
                 <Flame size={48} className="animate-pulse" />
              </div>
              <div className="relative z-10">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-3">Total Yield</h4>
                 <p className="text-6xl font-black text-white italic tracking-tighter leading-none">{formatCurrency(experiment.revenue)}</p>
              </div>
              <div className="flex gap-4 w-full relative z-10">
                 <div className="flex-1 px-4 py-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Deals</p>
                    <p className="text-2xl font-black text-white italic leading-none">{experiment.deals}</p>
                 </div>
                 <div className="flex-1 px-4 py-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Burn</p>
                    <p className="text-2xl font-black text-red-500 italic leading-none">{formatCurrency(experiment.spent)}</p>
                 </div>
              </div>
              <div className="w-full pt-4 relative z-10">
                 <div className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center gap-3">
                    <Timer size={16} className="text-cyan-500" />
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest italic">Efficiency Verified</span>
                 </div>
              </div>
           </div>

           {/* Quick Stats */}
           <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Pipeline Integrity</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">Proposal Rate</span>
                    <span className="text-lg font-black text-white italic">{(experiment.meetingsCompleted > 0 ? (experiment.proposalsSent / experiment.meetingsCompleted * 100) : 0).toFixed(0)}%</span>
                 </div>
                 <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">Closing Velocity</span>
                    <span className="text-lg font-black text-green-500 italic">{(experiment.proposalsSent > 0 ? (experiment.deals / experiment.proposalsSent * 100) : 0).toFixed(0)}%</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-16 pb-20 border-t border-white/10 flex justify-between items-center text-zinc-600 relative z-10">
        <div className="flex flex-col">
          <span className="text-xl font-black text-white italic tracking-tighter">THE FREEDOM PROJECT</span>
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mt-1 italic">90-Day Challenge War Room</span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.2em] italic opacity-50">Authorized Personnel Only</span>
      </footer>

      <UpdateModal 
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        experiment={experiment}
        onSave={handleUpdate}
      />
    </div>
  );
}
