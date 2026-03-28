import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

const leaders = [
  { rank: 1, name: "Sarah M.", avatar: "SM", points: 3420, savings: 2150, change: "up" },
  { rank: 2, name: "Alex K.", avatar: "AK", points: 1240, savings: 1247, change: "up", isUser: true },
  { rank: 3, name: "James L.", avatar: "JL", points: 1180, savings: 1100, change: "same" },
  { rank: 4, name: "Maya P.", avatar: "MP", points: 980, savings: 890, change: "down" },
  { rank: 5, name: "Chris D.", avatar: "CD", points: 870, savings: 780, change: "up" },
  { rank: 6, name: "Emma W.", avatar: "EW", points: 740, savings: 620, change: "down" },
  { rank: 7, name: "Liam R.", avatar: "LR", points: 680, savings: 540, change: "same" },
  { rank: 8, name: "Olivia T.", avatar: "OT", points: 590, savings: 480, change: "up" },
];

const changeIcon = (c: string) => {
  if (c === "up") return <TrendingUp size={14} className="text-success" />;
  if (c === "down") return <TrendingDown size={14} className="text-destructive" />;
  return <Minus size={14} className="text-muted-foreground" />;
};

const rankColors = ["text-accent", "text-muted-foreground", "text-amber-700"];

const Leaderboard = () => {
  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Leaderboard 🏆</h1>
        <p className="text-sm text-muted-foreground mt-1">See where you stand among fellow savers.</p>
      </div>

      {/* Top 3 podium */}
      <div className="flex items-end justify-center gap-3 md:gap-4 pt-8">
        {[top3[1], top3[0], top3[2]].map((p, i) => {
          const heights = ["h-28 md:h-32", "h-36 md:h-44", "h-20 md:h-24"];
          const medals = ["🥈", "🥇", "🥉"];
          return (
            <motion.div
              key={p.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.15, type: "spring" }}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary mb-2 ${i === 1 ? "md:w-16 md:h-16 text-lg glow-primary" : ""}`}>
                {p.avatar}
              </div>
              <p className="text-xs md:text-sm font-semibold text-foreground">{p.name}</p>
              <p className="text-xs text-accent font-medium">{p.points} pts</p>
              <div className={`${heights[i]} w-16 md:w-24 mt-3 rounded-t-xl bg-gradient-to-t from-primary/20 to-primary/5 flex items-start justify-center pt-3`}>
                <span className="text-xl md:text-2xl">{medals[i]}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full list */}
      <motion.div
        className="glass-card p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Header - hidden on mobile */}
        <div className="hidden md:grid grid-cols-[3rem_1fr_6rem_6rem_2rem] gap-4 px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider border-b border-border mb-2">
          <span>Rank</span>
          <span>Player</span>
          <span className="text-right">Points</span>
          <span className="text-right">Saved</span>
          <span />
        </div>
        {leaders.map((p, i) => (
          <motion.div
            key={p.name}
            className={`flex items-center gap-3 md:grid md:grid-cols-[3rem_1fr_6rem_6rem_2rem] md:gap-4 px-3 py-3 rounded-xl ${p.isUser ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/30"} transition-colors`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          >
            <span className={`font-bold text-sm shrink-0 ${p.rank <= 3 ? rankColors[p.rank - 1] : "text-muted-foreground"}`}>
              #{p.rank}
            </span>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${p.isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {p.avatar}
              </div>
              <span className={`text-sm font-medium truncate ${p.isUser ? "text-primary" : "text-foreground"}`}>
                {p.name} {p.isUser && "⭐"}
              </span>
            </div>
            <span className="text-right text-sm font-semibold text-accent shrink-0">{p.points}</span>
            <span className="text-right text-sm text-success shrink-0 hidden md:block">${p.savings}</span>
            <span className="shrink-0">{changeIcon(p.change)}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Leaderboard;
