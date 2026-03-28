import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Flame, Swords, Trophy, User, Plus, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/streaks", icon: Flame, label: "Streaks" },
  { path: "/battle", icon: Swords, label: "Battle Arena" },
  { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { path: "/profile", icon: User, label: "Profile" },
];

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  // Mobile bottom nav
  if (isMobile) {
    return (
      <>
        {/* Mobile top header */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 z-50">
          <h1 className="text-lg font-black tracking-tight">
            <span className="text-gradient-primary">SPEND</span>
            <span className="text-gradient-accent">ORA</span>
          </h1>
          <motion.button
            onClick={() => navigate("/?addSaving=true")}
            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={18} />
          </motion.button>
        </header>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-t border-border/50 flex items-center justify-around px-2 z-50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute top-0 w-8 h-0.5 rounded-full bg-primary"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </>
    );
  }

  // Desktop sidebar
  return (
    <>
      {/* Toggle button - always visible */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-[60] w-10 h-10 rounded-xl bg-card/20 backdrop-blur-xl border border-border/20 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card/80 hover:border-border/50 transition-all duration-200"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={18} className="opacity-50 group-hover:opacity-100" style={{ opacity: 0.5 }} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed left-0 top-0 h-screen w-64 bg-card/40 backdrop-blur-xl border-r border-border/50 flex flex-col z-50"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  <span className="text-gradient-primary">SPEND</span>
                  <span className="text-gradient-accent">ORA</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">Save Smart. Compete Hard.</p>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            <nav className="flex-1 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`nav-item w-full ${isActive ? "active" : ""}`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            <div className="p-4">
              <motion.button
                onClick={() => navigate("/?addSaving=true")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} />
                Add Saving
              </motion.button>
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
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
