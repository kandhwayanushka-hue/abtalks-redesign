import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard · ABTalks Redesigned",
  description: "One task, one mentor, one path. Your ABTalks challenge, redesigned to remember you.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
