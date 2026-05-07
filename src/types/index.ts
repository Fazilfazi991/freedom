export type ExperimentStatus =
  | "Running"
  | "Paused"
  | "Closed"
  | "Testing"
  | "Scaling"
  | "Failed";

export interface Experiment {
  id: string;
  name: string;
  slug: string;
  role: string;
  budget: number;
  spent: number;
  leads: number;
  deals: number;
  revenue: number;
  enquiries: number;
  meetingsBooked: number;
  meetingsCompleted: number;
  proposalsSent: number;
  status: ExperimentStatus;
  statusBadge: string;
  color: string;
  gradient: string;
}

export interface DashboardData {
  experiments: Experiment[];
  startDate: string;
  totalBudget: number;
  targetRevenue: number;
}
