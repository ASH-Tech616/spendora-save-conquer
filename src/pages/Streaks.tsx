import { motion } from "framer-motion";
import { Flame, Shield, Clock, Calendar, TrendingUp, Zap } from "lucide-react";

const streakHistory = [
  { day: "Mon", saved: true, amount: 15 },
  { day: "Tue", saved: true, amount: 8 },
  { day: "Wed", saved: true, amount: 25 },
  { day: "Thu", saved: true, amount: 10 },
  { day: "Fri", saved: true, amount: 42 },
  { day: "Sat", saved: true, amount: 5 },
  { day: "Sun", saved: false, amount: 0 },
];

const milestones = [
  { days: 7, label: "Week Warrior", unlocked: true },
  { days: 14, label: "Fortnight Force", unlocked: false },
  { days: 30, label: "Monthly Master", unlocked: false },
  { days: 100, label: "Century Saver", unlocked: false },
];

const Streaks = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Streak System</h1>
        <p className="text-sm text-muted-foreground mt-1">Don't break the chain. Every day counts.</p>
      </div>

      {/* Main streak display */}
      <motion.div
        className="glass-card p-10 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="relative">
          <motion.div
            className="text-8xl mb-4 inline-block"
            animate={{ scale: [1, 1.1, 1], rotate: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🔥
          </motion.div>
          <motion.p
            className="text-7xl font-black text-accent streak-glow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            12
          </motion.p>
          <p className="text-lg text-muted-foreground mt-2">Day Streak</p>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-success">
              <Shield size={18} />
              <span className="text-sm font-medium">Streak Shield: Active</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Clock size={18} />
              <span className="text-sm font-medium">16h 42m remaining</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {/* Weekly view */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-primary" />
            <p className="text-sm font-semibold text-foreground">This Week</p>
          </div>
          <div className="flex gap-2">
            {streakHistory.map((day, i) => (
              <motion.div
                key={day.day}
                className="flex-1 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div
                  className={`w-full aspect-square rounded-xl flex items-center justify-center mb-2 ${
                    day.saved ? "bg-success/20" : "bg-secondary/50"
                  }`}
                >
                  {day.saved ? (
                    <span className="text-lg">🔥</span>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{day.day}</p>
                {day.saved && <p className="text-xs text-success font-medium">${day.amount}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-primary" />
            <p className="text-sm font-semibold text-foreground">Streak Stats</p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Current Streak", value: "12 days", sub: "🔥 On fire!" },
              { label: "Longest Streak", value: "18 days", sub: "Set 2 weeks ago" },
              { label: "Total Active Days", value: "47", sub: "Out of 60 days" },
              { label: "Streak Shields Used", value: "2 / 3", sub: "1 remaining" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                </div>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Milestones */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-accent" />
          <p className="text-sm font-semibold text-foreground">Streak Milestones</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.days}
              className={`text-center p-4 rounded-xl border ${
                m.unlocked ? "border-accent/30 bg-accent/5 glow-accent" : "border-border bg-secondary/20"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <p className="text-2xl mb-2">{m.unlocked ? "🏆" : "🔒"}</p>
              <p className={`text-lg font-bold ${m.unlocked ? "text-accent" : "text-muted-foreground"}`}>{m.days}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Streaks;
