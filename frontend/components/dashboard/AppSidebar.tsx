"use client";

import Link from "next/link";
import { menuItems } from "./menu";

export default function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-white h-screen p-4">

      <h2 className="text-2xl font-bold mb-8">
        Stress Monitor
      </h2>

      <nav className="space-y-2">

        {menuItems.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            <item.icon size={18} />
            {item.title}
          </Link>
        ))}

      </nav>
    </aside>
  );
}