"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Save, 
  TrendingUp, 
  Wallet, 
  Target, 
  Users, 
  Briefcase,
  AlertCircle,
  MessageSquare,
  FileText,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Experiment, ExperimentStatus } from "@/types";
import { cn } from "@/lib/utils";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  experiment: Experiment;
  onSave: (updatedFields: any) => void;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  experiment,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    spent: 0,
    revenue: 0,
    enquiries: 0,
    meetingsBooked: 0,
    meetingsCompleted: 0,
    proposalsSent: 0,
    deals: 0,
    status: "Running" as ExperimentStatus,
  });

  useEffect(() => {
    if (experiment) {
      setFormData({
        spent: experiment.spent,
        revenue: experiment.revenue,
        enquiries: experiment.enquiries,
        meetingsBooked: experiment.meetingsBooked,
        meetingsCompleted: experiment.meetingsCompleted,
        proposalsSent: experiment.proposalsSent,
        deals: experiment.deals,
        status: experiment.status,
      });
    }
  }, [experiment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-zinc-900 to-zinc-800">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl text-black shadow-lg bg-cyan-500")}>
                <TrendingUp size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Sync Progress</h2>
                <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">{experiment.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-zinc-900">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-1">Spent (AED)</label>
                <input 
                  type="number" 
                  value={formData.spent}
                  onChange={(e) => setFormData({...formData, spent: Number(e.target.value)})}
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-4 px-6 text-white font-black focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-1">Revenue (AED)</label>
                <input 
                  type="number" 
                  value={formData.revenue}
                  onChange={(e) => setFormData({...formData, revenue: Number(e.target.value)})}
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-4 px-6 text-white font-black focus:outline-none focus:border-green-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-1">Enquiries</label>
                <input 
                  type="number" 
                  value={formData.enquiries}
                  onChange={(e) => setFormData({...formData, enquiries: Number(e.target.value)})}
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-4 px-6 text-white font-black focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-1">Meetings Booked</label>
                <input 
                  type="number" 
                  value={formData.meetingsBooked}
                  onChange={(e) => setFormData({...formData, meetingsBooked: Number(e.target.value)})}
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-4 px-6 text-white font-black focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-1">Proposals Sent</label>
                <input 
                  type="number" 
                  value={formData.proposalsSent}
                  onChange={(e) => setFormData({...formData, proposalsSent: Number(e.target.value)})}
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-4 px-6 text-white font-black focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-1">Deals Closed</label>
                <input 
                  type="number" 
                  value={formData.deals}
                  onChange={(e) => setFormData({...formData, deals: Number(e.target.value)})}
                  className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-4 px-6 text-white font-black focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-1">Current Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as ExperimentStatus})}
                className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-4 px-6 text-white font-black focus:outline-none focus:border-cyan-500 transition-all appearance-none"
              >
                {["Running", "Paused", "Testing", "Scaling", "Closed", "Failed"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-8 py-5 rounded-3xl bg-zinc-800 text-zinc-400 font-black uppercase tracking-widest hover:text-white transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-[2] px-8 py-5 rounded-3xl bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 active:scale-95"
              >
                <Save size={20} /> Update Tracker
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
