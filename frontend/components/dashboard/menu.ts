import {
  LayoutDashboard,
  Users,
  UserRound,
  Cpu,
  Activity,
  Brain,
  Settings,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Respondents",
    url: "/dashboard/respondents",
    icon: UserRound,
  },
  {
    title: "Devices",
    url: "/dashboard/devices",
    icon: Cpu,
  },
  {
    title: "Sessions",
    url: "/dashboard/sessions",
    icon: Activity,
  },
  {
    title: "Predictions",
    url: "/dashboard/predictions",
    icon: Brain,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];