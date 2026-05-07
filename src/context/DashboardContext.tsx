"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { DashboardData, Experiment } from "@/types";
import { supabase } from "@/lib/supabase";

interface DashboardContextType {
  data: DashboardData;
  updateExperiment: (slug: string, updatedData: Partial<Experiment>) => void;
  resetData: () => void;
  setStartDate: (date: string) => void;
  isMounted: boolean;
  isReelView: boolean;
  setIsReelView: (val: boolean) => void;
  isShareMode: boolean;
  setIsShareMode: (val: boolean) => void;
  isPrivateMode: boolean;
  setIsPrivateMode: (val: boolean) => void;
  isAdmin: boolean;
  logout: () => void;
}

const INITIAL_EXPERIMENTS: Experiment[] = [
  { 
    id: "web-dev", name: "Web Development", slug: "web-development", role: "Main Offer", budget: 2000, 
    spent: 0, leads: 0, deals: 0, revenue: 0, enquiries: 0, meetingsBooked: 0, meetingsCompleted: 0, proposalsSent: 0, 
    status: "Running", statusBadge: "Primary", color: "#06b6d4", gradient: "from-blue-600 to-cyan-400" 
  },
  { 
    id: "free-consultation", name: "Free Branding Consultation", slug: "free-branding-consultation", role: "Lead Magnet / Meeting Funnel", budget: 1000, 
    spent: 0, leads: 0, deals: 0, revenue: 0, enquiries: 0, meetingsBooked: 0, meetingsCompleted: 0, proposalsSent: 0, 
    status: "Running", statusBadge: "Active", color: "#d946ef", gradient: "from-purple-600 to-pink-400" 
  },
  { 
    id: "branding", name: "Branding", slug: "branding", role: "Brand Identity / Company Profile / Design", budget: 700, 
    spent: 0, leads: 0, deals: 0, revenue: 0, enquiries: 0, meetingsBooked: 0, meetingsCompleted: 0, proposalsSent: 0, 
    status: "Testing", statusBadge: "Testing", color: "#f59e0b", gradient: "from-gold-600 to-orange-400" 
  },
  { 
    id: "ai-agency", name: "AI Agency Work", slug: "ai-agency-work", role: "Premium Service", budget: 800, 
    spent: 0, leads: 0, deals: 0, revenue: 0, enquiries: 0, meetingsBooked: 0, meetingsCompleted: 0, proposalsSent: 0, 
    status: "Running", statusBadge: "Organic / Premium", color: "#8b5cf6", gradient: "from-violet-600 to-blue-400" 
  },
  { 
    id: "business-services", name: "Business Services", slug: "business-services", role: "UAE Business Leads", budget: 300, 
    spent: 0, leads: 0, deals: 0, revenue: 0, enquiries: 0, meetingsBooked: 0, meetingsCompleted: 0, proposalsSent: 0, 
    status: "Testing", statusBadge: "Testing", color: "#10b981", gradient: "from-green-600 to-emerald-400" 
  },
  { 
    id: "digital-marketing", name: "Digital Marketing", slug: "digital-marketing", role: "Upsell Only", budget: 200, 
    spent: 0, leads: 0, deals: 0, revenue: 0, enquiries: 0, meetingsBooked: 0, meetingsCompleted: 0, proposalsSent: 0, 
    status: "Running", statusBadge: "Upsell", color: "#ef4444", gradient: "from-red-600 to-orange-400" 
  },
];

const INITIAL_DATA: DashboardData = {
  experiments: INITIAL_EXPERIMENTS,
  startDate: "2026-05-01",
  totalBudget: 5000,
  targetRevenue: 15000,
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>(INITIAL_DATA);
  const [isMounted, setIsMounted] = useState(false);
  const [isReelView, setIsReelView] = useState(false);
  const [isShareMode, setIsShareMode] = useState(false);
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
    
    const adminToken = localStorage.getItem("freedom_admin_token");
    if (adminToken === "true") {
      setIsAdmin(true);
      setIsPrivateMode(true);
    }

    // Subscribe to changes
    const experimentsChannel = supabase
      .channel('experiments_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'experiments' }, (payload) => {
        fetchData(); // Simplest way to sync for now
      })
      .subscribe();

    const settingsChannel = supabase
      .channel('settings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'challenge_settings' }, (payload) => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(experimentsChannel);
      supabase.removeChannel(settingsChannel);
    };
  }, []);

  const fetchData = async () => {
    try {
      const { data: experiments, error: expError } = await supabase
        .from('experiments')
        .select('*')
        .order('budget', { ascending: false });

      const { data: settings, error: setError } = await supabase
        .from('challenge_settings')
        .select('*')
        .single();

      if (experiments && settings) {
        setData({
          experiments: experiments.map(e => ({
            ...e,
            meetingsBooked: e.meetings_booked,
            meetingsCompleted: e.meetings_completed,
            proposalsSent: e.proposals_sent,
          })),
          startDate: settings.start_date,
          totalBudget: settings.total_budget,
          targetRevenue: settings.target_revenue,
        });
      }
    } catch (e) {
      console.error("Error fetching data from Supabase", e);
    }
  };

  const updateExperiment = async (slug: string, updatedFields: Partial<Experiment>) => {
    if (!isAdmin) return;

    // Map fields back to snake_case for Supabase
    const supabaseFields: any = { ...updatedFields };
    if (updatedFields.meetingsBooked !== undefined) supabaseFields.meetings_booked = updatedFields.meetingsBooked;
    if (updatedFields.meetingsCompleted !== undefined) supabaseFields.meetings_completed = updatedFields.meetingsCompleted;
    if (updatedFields.proposalsSent !== undefined) supabaseFields.proposals_sent = updatedFields.proposalsSent;
    
    // Remove camelCase fields
    delete supabaseFields.meetingsBooked;
    delete supabaseFields.meetingsCompleted;
    delete supabaseFields.proposalsSent;

    try {
      const { error } = await supabase
        .from('experiments')
        .update(supabaseFields)
        .eq('slug', slug);

      if (error) throw error;
      
      // Optimistic update
      setData(prev => ({
        ...prev,
        experiments: prev.experiments.map(e => e.slug === slug ? { ...e, ...updatedFields } : e)
      }));
    } catch (e) {
      console.error("Update error", e);
      alert("Sync failed. Check connection.");
    }
  };

  const setStartDate = async (date: string) => {
    if (!isAdmin) return;
    try {
      const { error } = await supabase
        .from('challenge_settings')
        .update({ start_date: date })
        .eq('total_budget', data.totalBudget); // Unique enough for now

      if (error) throw error;
      setData(prev => ({ ...prev, startDate: date }));
    } catch (e) { console.error(e); }
  };

  const resetData = async () => {
    if (!isAdmin) return;
    if (confirm("Reset cloud data to initial state?")) {
      // Logic to reset Supabase data would go here
      // For now just refresh or re-seed
    }
  };

  const logout = () => {
    localStorage.removeItem("freedom_admin_token");
    setIsAdmin(false);
    setIsPrivateMode(false);
    window.location.href = "/";
  };

  const value = useMemo(() => ({
    data, updateExperiment, resetData, setStartDate,
    isMounted, isReelView, setIsReelView, isShareMode, setIsShareMode, isPrivateMode, setIsPrivateMode,
    isAdmin, logout
  }), [data, isMounted, isReelView, isShareMode, isPrivateMode, isAdmin]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) { throw new Error("useDashboard must be used within a DashboardProvider"); }
  return context;
}
