"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simple password check for now (to be replaced with real Auth if needed)
    // In a real app, this should be done via Supabase Auth
    if (password === "freedom2026") { // Temporary hardcoded password
       localStorage.setItem("freedom_admin_token", "true");
       router.push("/");
    } else {
      setError("Unauthorized access denied.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-cinematic flex items-center justify-center p-6 text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-12 space-y-6">
          <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <Zap size={40} className="text-black" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Freedom <span className="text-cyan-500">Access</span></h1>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Founder War Room Entry</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-zinc-500 px-1">
                <Lock size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Security Clearance Required</span>
             </div>
             <input 
              type="password" 
              placeholder="Enter War Room Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-white/5 rounded-2xl py-5 px-6 text-white font-black focus:outline-none focus:border-cyan-500 transition-all text-center tracking-[0.5em]"
             />
             {error && (
               <p className="text-red-500 text-[10px] font-black uppercase text-center animate-shake">{error}</p>
             )}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-cyan-500 text-black rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Enter War Room"}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-12 flex justify-center">
           <div className="flex items-center gap-3 text-zinc-600">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Encrypted Connection</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
