import {
  Users,
  UserRound,
  Cpu,
  Activity,
} from "lucide-react";

import DashboardCard from "./DashboardCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <DashboardCard
        title="Users"
        value={0}
        icon={Users}
      />

      <DashboardCard
        title="Respondents"
        value={0}
        icon={UserRound}
      />

      <DashboardCard
        title="Devices"
        value={0}
        icon={Cpu}
      />

      <DashboardCard
        title="Sessions"
        value={0}
        icon={Activity}
      />

    </div>
  );
}