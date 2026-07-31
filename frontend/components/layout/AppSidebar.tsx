"use client";

import Link from "next/link";
import {
  Home,
  Users,
 Cpu,
  Activity,
  Brain,
  Settings,
} from "lucide-react";

export default function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-white min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">
          Stress Monitoring
        </h1>

        <p className="text-sm text-gray-500">
          IoT Dashboard
        </p>
      </div>

      <nav className="p-4 space-y-2">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          href="/dashboard/respondents"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Users size={18} />
          Respondents
        </Link>

        <Link
          href="/dashboard/devices"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Cpu size={18} />
          Devices
        </Link>

        <Link
          href="/dashboard/sessions"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Activity size={18} />
          Sessions
        </Link>

        <Link
          href="/dashboard/predictions"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Brain size={18} />
          Predictions
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>
    </aside>
  );
}