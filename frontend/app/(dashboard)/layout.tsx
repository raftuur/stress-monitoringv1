import AppSidebar from "@/components/dashboard/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AppSidebar />

      <main className="flex flex-1 flex-col">

        <AppHeader />

        <div className="flex-1 p-6">
          {children}
        </div>

      </main>

    </div>
  );
}