import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <Icon className="h-10 w-10 text-slate-500" />
      </CardContent>
    </Card>
  );
}