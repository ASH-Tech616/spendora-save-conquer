import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Coins, Target, Plus, Swords, Sparkles, ArrowUpRight } from "lucide-react";
import AddSavingModal from "@/components/AddSavingModal";

const statCards = [
  { label: "Total Savings", value: "$1,247.50", icon: TrendingUp, change: "+$42 today", color: "success" as const },
  { label: "Active Streak", value: "12 Days", icon: Flame, change: "Personal best!", color: "accent" as const },
  { label: "Points", value: "1,240", icon: Coins, change: "+15 today", color: "primary" as const },
  { label: "Monthly Goal", value: "67%", icon: Target, change: "$200 / $300", color: "primary" as const },
];

const recentSavings = [
  { amount: 15, reason: "Skipped Uber, walked instead 🚶", time: "2h ago", points: 15 },
  { amount: 8, reason: "Made coffee at home ☕", time: "Yesterday", points: 10 },
  { amount: 25, reason: "Cooked dinner instead of ordering 🍳", time: "2 days ago", points: 20 },
  { amount: 42, reason: "Found cheaper textbook 📚", time: "3 days ago", points: 30 },
];

const motivationalMessages = [
  "You're in the top 15% of savers this week! 🏆",
  "12 days strong — don't break the chain! 🔥",
  "You've saved more than 78% of students this month.",
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (searchParams.get("addSaving") === "true") {
      setShowModal(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const interval = setInterval(() => setMsgIndex((i) => (i + 1) % motivationalMessages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const colorMap = {
    success: "text-success",
    accent: "text-accent",
    primary: "text-primary",
  };

  const bgMap = {
    success: "bg-success/10",
    accent: "bg-accent/10",
    primary: "bg-primary/10",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, Alex 👋</h1>
          <motion.p
            key={msgIndex}
            className="text-sm text-muted-foreground mt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {motivationalMessages[msgIndex]}
          </motion.p>
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
            Add Saving
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl bg-secondary text-foreground font-semibold text-sm border border-border"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Swords size={16} />
            Join Battle
          </motion.button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            className="glass-card-hover p-4 md:p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.label}</span>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg ${bgMap[card.color]} flex items-center justify-center`}>
                <card.icon size={14} className={colorMap[card.color]} />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{card.value}</p>
            <p className={`text-xs mt-1 ${colorMap[card.color]} font-medium`}>{card.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Streak highlight */}
        <motion.div
          className="lg:col-span-1 glass-card p-6 relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Current Streak</p>
          <div className="flex items-center gap-3">
            <motion.span
              className="text-5xl"
              animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥
            </motion.span>
            <div>
              <p className="text-4xl font-black text-accent streak-glow">12</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-success">
            <ArrowUpRight size={14} />
            <span>Best: 18 days</span>
          </div>
        </motion.div>

        {/* Recent Savings */}
        <motion.div
          className="lg:col-span-2 glass-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">Recent Savings</p>
            <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
          </div>
          <div className="space-y-3">
            {recentSavings.map((saving, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                    <TrendingUp size={14} className="text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{saving.reason}</p>
                    <p className="text-xs text-muted-foreground">{saving.time}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-sm font-bold text-success">+${saving.amount}</p>
                  <p className="text-xs text-accent flex items-center gap-1">
                    <Sparkles size={10} />
                    +{saving.points} pts
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AddSavingModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Dashboard;
