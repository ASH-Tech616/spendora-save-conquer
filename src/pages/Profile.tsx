import { motion } from "framer-motion";
import { User, TrendingUp, Flame, Coins, Award, Target, Calendar, Shield } from "lucide-react";
import SpendoraFlame from "@/components/SpendoraFlame";

const stats = [
  { label: "Total Savings", value: "$1,247.50", icon: TrendingUp, color: "text-success" },
  { label: "Longest Streak", value: "18 Days", icon: Flame, color: "text-accent" },
  { label: "Total Points", value: "1,240", icon: Coins, color: "text-primary" },
  { label: "Battles Won", value: "4", icon: Award, color: "text-accent" },
  { label: "Goals Hit", value: "7 / 12", icon: Target, color: "text-success" },
  { label: "Days Active", value: "47", icon: Calendar, color: "text-primary" },
];

const badges = [
  { name: "First Save", icon: "💰", earned: true },
  { name: "Week Warrior", icon: "flame", earned: true },
  { name: "Battle Victor", icon: "⚔️", earned: true },
  { name: "Top 10", icon: "🏆", earned: true },
  { name: "Century Saver", icon: "💎", earned: false },
  { name: "Streak King", icon: "👑", earned: false },
  { name: "Social Saver", icon: "🤝", earned: false },
  { name: "Money Master", icon: "🎯", earned: false },
];

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Your savings journey at a glance.</p>
      </div>

      {/* Profile card */}
      <motion.div
        className="glass-card p-5 md:p-8 flex flex-col sm:flex-row items-center gap-4 md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow-primary shrink-0">
          <User size={30} className="text-primary" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Alex Kumar</h2>
          <p className="text-sm text-muted-foreground">CS Student · Joined 2 months ago</p>
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 flex-wrap">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Rank #2</span>
            <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <Shield size={12} /> Streak Shield Active
            </span>
          </div>
        </div>
        <div className="text-center sm:text-right shrink-0">
          <p className="text-3xl font-black text-accent streak-glow">1,240</p>
          <p className="text-xs text-muted-foreground">Total Points</p>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card-hover p-4 md:p-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <s.icon size={20} className={`${s.color} mx-auto mb-2`} />
            <p className="text-lg md:text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <motion.div
        className="glass-card p-5 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Award size={18} className="text-accent" />
          <p className="text-sm font-semibold text-foreground">Achievements & Badges</p>
          <span className="text-xs text-muted-foreground ml-auto">4 / 8 unlocked</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.name}
              className={`text-center p-3 md:p-4 rounded-xl border transition-all ${
                b.earned
                  ? "border-accent/30 bg-accent/5 glow-accent"
                  : "border-border/50 bg-secondary/20 opacity-50"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: b.earned ? 1 : 0.5, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={b.earned ? { scale: 1.05 } : {}}
            >
              <span className="text-2xl md:text-3xl block mb-2">
                {b.earned
                  ? b.icon === "flame"
                    ? <SpendoraFlame size={28} hoverOnly />
                    : b.icon
                  : "🔒"}
              </span>
              <p className={`text-xs font-medium ${b.earned ? "text-accent" : "text-muted-foreground"}`}>{b.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Savings progress */}
      <motion.div
        className="glass-card p-5 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm font-semibold text-foreground mb-4">Monthly Savings Goal</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">$200 / $300</span>
          <span className="text-xs text-primary font-medium">67%</span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-success"
            initial={{ width: 0 }}
            animate={{ width: "67%" }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
