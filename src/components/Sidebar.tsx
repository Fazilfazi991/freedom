"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Code, 
  Users, 
  Sparkles, 
  Cpu, 
  Briefcase, 
  TrendingUp,
  Menu, 
  X,
  Zap,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/DashboardContext";

export const Sidebar = () => {
  const pathname = usePathname();
  const { data, isReelView, isShareMode, isAdmin, logout } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);

  if (isReelView || isShareMode) return null;

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Web Dev", href: "/experiments/web-development", icon: Code, slug: "web-development" },
    { name: "Consultation", href: "/experiments/free-branding-consultation", icon: Users, slug: "free-branding-consultation" },
    { name: "Branding", href: "/experiments/branding", icon: Sparkles, slug: "branding" },
    { name: "AI Agency", href: "/experiments/ai-agency-work", icon: Cpu, slug: "ai-agency-work" },
    { name: "Business", href: "/experiments/business-services", icon: Briefcase, slug: "business-services" },
    { name: "Marketing", href: "/experiments/digital-marketing", icon: TrendingUp, slug: "digital-marketing" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#050505] border-b border-white/5 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
            <Zap size={18} className="text-black" />
          </div>
          <span className="font-black tracking-tighter text-lg">FREEDOM</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[#050505] border-r border-white/5 transition-transform md:translate-x-0 md:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <Link href="/" className="hidden md:flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Zap size={22} className="text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-xl leading-none">FREEDOM</span>
              <span className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mt-1">Project</span>
            </div>
          </Link>

          <nav className="flex-1 space-y-1">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4 px-2">Challenge</p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group border",
                  isActive(item.href) 
                    ? "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" 
                    : "text-zinc-400 border-transparent hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={cn(isActive(item.href) ? "text-cyan-500" : "text-zinc-500 group-hover:text-white")} />
                  <span className="text-sm font-bold tracking-tight">{item.name}</span>
                </div>
                {isActive(item.href) && <ChevronRight size={14} />}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            {isAdmin && (
              <button 
                onClick={logout}
                className="w-full py-3 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 hover:border-red-500/20 transition-all"
              >
                Terminate Session
              </button>
            )}
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Freedom Project</p>
              <p className="text-xl font-black text-white">AED 5,000</p>
              <div className="mt-3 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
