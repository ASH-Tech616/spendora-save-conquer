import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Flame, Swords, Trophy, User, Plus } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card/40 backdrop-blur-xl border-r border-border/50 flex flex-col z-50">
      <div className="p-6">
        <h1 className="text-2xl font-black tracking-tight">
          <span className="text-gradient-primary">SPEND</span>
          <span className="text-gradient-accent">ORA</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Save Smart. Compete Hard.</p>
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
    </aside>
  );
};

export default AppSidebar;
