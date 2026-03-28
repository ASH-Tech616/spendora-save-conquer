import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { useIsTabletOrBelow } from "@/hooks/use-mobile";

const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen bg-background ${isMobile ? "" : "flex"}`}>
      <AppSidebar />
      <main className={
        isMobile
          ? "pt-16 pb-20 px-4"
          : "flex-1 min-w-0 p-8 max-w-[1200px]"
      }>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
