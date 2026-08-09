import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard · ABTalks Redesigned",
  description: "One task, one mentor, one path. The ABTalks dashboard that remembers you.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
