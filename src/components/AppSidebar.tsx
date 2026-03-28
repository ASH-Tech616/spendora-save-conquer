import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Flame, Swords, Trophy, User, Plus, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile, useIsTabletOrBelow } from "@/hooks/use-mobile";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/streaks", icon: Flame, label: "Streaks" },
  { path: "/battle", icon: Swords, label: "Battle Arena" },
  { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { path: "/profile", icon: User, label: "Profile" },
];

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div className="h-full flex flex-col bg-sidebar-background border-r border-sidebar-border">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-gradient-primary">SPEND</span>
            <span className="text-gradient-accent">ORA</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Save Smart. Compete Hard.</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`nav-item w-full ${isActive ? "active" : ""}`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={() => handleNav("/?addSaving=true")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} />
          Add Saving
        </button>
      </div>

      <div className="p-4 mx-3 mb-4 glass-card rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            AK
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Alex K.</p>
            <p className="text-xs text-muted-foreground">1,240 pts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppSidebar = () => {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mobile: bottom nav + overlay drawer
  if (isMobile) {
    return (
      <>
        {/* Mobile top header */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 z-50">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={18} />
          </button>
          <h1 className="text-lg font-black tracking-tight">
            <span className="text-gradient-primary">SPEND</span>
            <span className="text-gradient-accent">ORA</span>
          </h1>
          <button
            onClick={() => navigate("/?addSaving=true")}
            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"
          >
            <Plus size={18} />
          </button>
        </header>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-t border-border/50 flex items-center justify-around px-2 z-50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute top-0 w-8 h-0.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile overlay drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                className="fixed left-0 top-0 h-full w-64 z-[70]"
                initial={{ x: -256 }}
                animate={{ x: 0 }}
                exit={{ x: -256 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
              >
                <SidebarContent onClose={() => setMobileOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop: permanent sidebar in flex layout
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0">
      <SidebarContent />
    </aside>
  );
};

export default AppSidebar;
