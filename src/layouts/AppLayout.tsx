import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 p-8 max-w-[1200px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
