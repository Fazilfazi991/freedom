"use client";

import React, { useMemo, useState } from "react";
import { 
  TrendingUp, 
  Wallet, 
  Target, 
  Users, 
  Briefcase, 
  Zap, 
  Share2, 
  Smartphone, 
  Monitor,
  Trophy,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Globe,
  FileText,
  Calendar,
  Timer,
  ZapOff,
  Flame,
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StatCard } from "@/components/StatCard";
import { ProgressBar } from "@/components/ProgressBar";
import { useDashboard } from "@/context/DashboardContext";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { AnimatedNumber } from "@/components/AnimatedNumber";

export default function MainDashboard() {
  const { 
    data, 
    isMounted, 
    isReelView, 
    setIsReelView, 
    isShareMode, 
    setIsShareMode,
    isPrivateMode,
    setIsPrivateMode,
    setStartDate,
    isAdmin
  } = useDashboard();

  const timeStats = useMemo(() => {
    const start = new Date(data.startDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const daysRunning = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1, 1);
    const daysLeft = Math.max(90 - daysRunning, 0);
    const progress = (daysRunning / 90) * 100;

    return { daysRunning, daysLeft, progress };
  }, [data.startDate]);

  const stats = useMemo(() => {
    const totalSpent = data.experiments.reduce((acc, exp) => acc + exp.spent, 0);
    const totalRevenue = data.experiments.reduce((acc, exp) => acc + exp.revenue, 0);
    const totalEnquiries = data.experiments.reduce((acc, exp) => acc + exp.enquiries, 0);
    const totalMeetings = data.experiments.reduce((acc, exp) => acc + exp.meetingsBooked, 0);
    const totalDeals = data.experiments.reduce((acc, exp) => acc + exp.deals, 0);
    const netPL = totalRevenue - totalSpent;
    const remainingRevenue = Math.max(data.targetRevenue - totalRevenue, 0);
    const revProgress = (totalRevenue / data.targetRevenue) * 100;

    return { totalSpent, totalRevenue, totalEnquiries, totalMeetings, totalDeals, netPL, remainingRevenue, revProgress };
  }, [data.experiments, data.targetRevenue]);

  if (!isMounted) return null;

  return (
    <div className={cn(
      "p-4 md:p-12 transition-all duration-700 min-h-screen bg-cinematic text-white",
      isReelView ? "max-w-[480px] mx-auto border-x border-white/5 shadow-[0_0_100px_rgba(6,182,212,0.1)]" : "max-w-7xl mx-auto"
    )}>
      {/* Decorative Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] -z-10 animate-pulse-slow" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] -z-10 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
              Freedom <span className="text-cyan-500 text-glow-cyan">Project</span>
            </h1>
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
               <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">Live Tracker</span>
            </div>
          </div>
          <p className="text-zinc-500 text-lg md:text-2xl font-black italic tracking-tight opacity-80">
            90 DAYS. REAL SPEND. <span className="text-white">REAL FREEDOM.</span>
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          {isAdmin && !isShareMode && (
            <div className="flex bg-zinc-900/80 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
              <button 
                onClick={() => setIsPrivateMode(!isPrivateMode)}
                className={cn("p-3 rounded-xl transition-all", isPrivateMode ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300")}
              >
                {isPrivateMode ? <Lock size={20} /> : <Eye size={20} />}
              </button>
              <button 
                onClick={() => setIsReelView(!isReelView)}
                className={cn("p-3 rounded-xl transition-all", isReelView ? "bg-cyan-500 text-black shadow-lg" : "text-zinc-500 hover:text-zinc-300")}
              >
                {isReelView ? <Monitor size={20} /> : <Smartphone size={20} />}
              </button>
            </div>
          )}
          <button 
            onClick={() => setIsShareMode(!isShareMode)}
            className={cn(
              "px-8 py-4 rounded-2xl font-black flex items-center gap-3 transition-all border shadow-2xl",
              isShareMode ? "bg-white text-black border-transparent" : "bg-zinc-950 text-white border-white/10 hover:border-cyan-500/50"
            )}
          >
            <Share2 size={20} />
            {isShareMode ? "EXIT" : "SHARE"}
          </button>
        </div>
      </header>

      {/* Main Vision Blocks: Countdown & Target */}
      <div className={cn(
        "grid gap-8 mb-16",
        isReelView ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
      )}>
        {/* The Clock */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="h-full bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start mb-12">
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-cyan-500">
                    <Clock size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Time elapsed</span>
                 </div>
                 <p className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
                   DAY <span className="text-cyan-500">{timeStats.daysRunning}</span>
                 </p>
               </div>
               <div className="text-right space-y-2">
                  <div className="flex items-center gap-2 text-zinc-500 justify-end">
                    <Timer size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Remaining</span>
                 </div>
                 <p className="text-4xl md:text-5xl font-black text-white italic opacity-40">
                   {timeStats.daysLeft}D
                 </p>
               </div>
            </div>

            <div className="space-y-6">
              <div className="h-4 w-full bg-white/5 rounded-full p-1 overflow-hidden border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${timeStats.progress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                <span>PROJECT START</span>
                <span className="text-cyan-500">{timeStats.progress.toFixed(1)}% COMPLETE</span>
                <span>FINISH LINE</span>
              </div>
            </div>
            
            {timeStats.daysLeft === 0 && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center backdrop-blur-md z-30">
                 <motion.h2 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="text-5xl font-black text-cyan-500 italic tracking-tighter text-center"
                 >
                   CHALLENGE<br/>COMPLETED
                 </motion.h2>
              </div>
            )}
          </div>
        </motion.div>

        {/* The Goal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="h-full bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start mb-12">
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-green-500">
                    <Trophy size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Revenue Goal</span>
                 </div>
                 <p className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
                   {formatCurrency(data.targetRevenue).split(' ')[1]}
                   <span className="text-2xl ml-2 text-zinc-600 not-italic uppercase font-bold">AED</span>
                 </p>
               </div>
               <div className="text-right space-y-2">
                  <div className="flex items-center gap-2 text-zinc-500 justify-end">
                    <TrendingUp size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Current</span>
                 </div>
                 <p className="text-4xl md:text-5xl font-black text-green-500 italic tracking-tighter">
                   {formatCurrency(stats.totalRevenue).split(' ')[1]}
                 </p>
               </div>
            </div>

            <div className="space-y-6">
              <div className="h-4 w-full bg-white/5 rounded-full p-1 overflow-hidden border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.revProgress}%` }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                <span>{formatCurrency(0)}</span>
                <span className="text-green-500">{formatCurrency(stats.remainingRevenue)} TO GO</span>
                <span>{formatCurrency(data.targetRevenue)}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
               <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-4 backdrop-blur-md">
                  <Flame size={18} className="text-orange-500 animate-bounce" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white italic">
                    {timeStats.daysLeft} DAYS LEFT TO FREEDOM
                  </span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Summary - Horizontal Scroll on Mobile */}
      <div className="flex overflow-x-auto no-scrollbar gap-6 mb-16 pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        <StatCard label="Total Budget" value={data.totalBudget} icon={Wallet} isCurrency variant="default" className="min-w-[200px] md:min-w-0 bg-white/5 border-white/10" />
        <StatCard label="Total Spent" value={stats.totalSpent} icon={Target} isCurrency variant="red" className="min-w-[200px] md:min-w-0 bg-white/5 border-white/10" />
        <StatCard label="Net P&L" value={stats.netPL} icon={Zap} isCurrency variant={stats.netPL >= 0 ? "green" : "red"} className="min-w-[200px] md:min-w-0 bg-zinc-900 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
        <StatCard label="Total Enquiries" value={stats.totalEnquiries} icon={Users} variant="default" className="min-w-[200px] md:min-w-0 bg-white/5 border-white/10" />
        <StatCard label="Deals Closed" value={stats.totalDeals} icon={Briefcase} variant="green" className="min-w-[200px] md:min-w-0 bg-white/5 border-white/10" />
      </div>

      {/* Battlefield Sections */}
      <div className="space-y-12 mb-20">
        <div className="flex justify-between items-end border-b border-white/10 pb-6">
           <div className="space-y-2">
             <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">The Battlefield</h2>
             <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.4em]">Active Experiments & Yield</p>
           </div>
           <div className="hidden md:flex gap-3">
             <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
               Meetings: {stats.totalMeetings}
             </div>
           </div>
        </div>

        <div className={cn(
          "grid gap-8",
          isReelView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {data.experiments.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/experiments/${exp.slug}`}>
                <div className="group relative h-full">
                  {/* Decorative Gradient Border */}
                  <div className={cn("absolute -inset-[1px] bg-gradient-to-br opacity-20 group-hover:opacity-100 blur-[2px] transition-all duration-500 rounded-[3rem] -z-10", exp.gradient)} />
                  
                  <div className="h-full bg-zinc-950/90 backdrop-blur-2xl rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative">
                    <div className="flex justify-between items-start mb-10">
                      <div className="space-y-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-zinc-500">
                          {exp.statusBadge}
                        </span>
                        <h3 className="text-2xl font-black text-white italic group-hover:text-cyan-400 transition-colors">{exp.name}</h3>
                      </div>
                      <div className="p-3 bg-white/5 rounded-2xl text-zinc-500 group-hover:text-white group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-xl">
                        <ChevronRight size={20} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 mb-10">
                       <div className="space-y-1">
                         <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Spent</p>
                         <p className="text-lg font-black text-white italic">{formatCurrency(exp.spent)}</p>
                       </div>
                       <div className="space-y-1">
                         <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Revenue</p>
                         <p className="text-lg font-black text-green-500 italic">{formatCurrency(exp.revenue)}</p>
                       </div>
                       <div className="space-y-1">
                         <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Enquiries</p>
                         <p className="text-lg font-black text-white italic">{exp.enquiries}</p>
                       </div>
                       <div className="space-y-1">
                         <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Deals</p>
                         <p className="text-lg font-black text-white italic">{exp.deals}</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                         <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(exp.spent / exp.budget) * 100}%` }}
                          className={cn("h-full rounded-full shadow-lg", exp.gradient.replace("from-", "bg-"))}
                         />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest italic">{exp.role.split(' / ')[0]}</span>
                        <div className="flex items-center gap-1.5">
                           <Rocket size={12} className="text-cyan-500" />
                           <span className={cn("text-xs font-black italic", (exp.revenue - exp.spent) >= 0 ? "text-green-500" : "text-red-500")}>
                             {exp.spent > 0 ? (((exp.revenue - exp.spent) / exp.spent) * 100).toFixed(0) : 0}% ROI
                           </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Settings & Branding */}
      <footer className="pt-16 pb-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white italic tracking-tighter">THE FREEDOM PROJECT</span>
            <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">90-Day Public Business Challenge</span>
          </div>
        </div>
        {!isAdmin && !isShareMode && (
          <Link href="/login" className="text-[10px] font-black text-zinc-800 hover:text-cyan-500 transition-colors uppercase tracking-[0.5em] italic">
             War Room Login
          </Link>
        )}
        {isAdmin && !isShareMode && (
          <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
             <div className="flex flex-col gap-1">
                <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Set Start Date</label>
                <input 
                  type="date" 
                  value={data.startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-white font-black text-sm focus:outline-none"
                />
             </div>
             <div className="h-8 w-px bg-white/10" />
             <button 
              onClick={() => { if(confirm("RESET CHALLENGE?")) window.location.reload(); }}
              className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
             >
               Reset
             </button>
          </div>
        )}
      </footer>
    </div>
  );
}
