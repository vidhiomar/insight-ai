import { AppSidebar } from "./AppSidebar";

export function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
