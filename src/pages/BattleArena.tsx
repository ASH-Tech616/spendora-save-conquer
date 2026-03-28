import { motion } from "framer-motion";
import { Swords, Users, Clock, Trophy, Zap } from "lucide-react";

const activeBattle = {
  name: "Weekend Saver Showdown",
  timeLeft: "2d 14h",
  players: [
    { name: "Alex K.", avatar: "AK", savings: 142, target: 200, rank: 1 },
    { name: "Sarah M.", avatar: "SM", savings: 128, target: 200, rank: 2 },
    { name: "James L.", avatar: "JL", savings: 95, target: 200, rank: 3 },
    { name: "Maya P.", avatar: "MP", savings: 67, target: 200, rank: 4 },
  ],
  prize: "500 pts + Gold Badge",
};

const availableBattles = [
  { name: "Daily Sprint", players: "3/4", duration: "24h", prize: "100 pts", difficulty: "Easy" },
  { name: "Monthly Marathon", players: "12/20", duration: "30d", prize: "2,000 pts", difficulty: "Hard" },
  { name: "Coffee Challenge", players: "6/8", duration: "7d", prize: "300 pts", difficulty: "Medium" },
];

const BattleArena = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Battle Arena ⚔️</h1>
          <p className="text-sm text-muted-foreground mt-1">Compete with friends. Save more. Win rewards.</p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Swords size={16} />
          Create Battle
        </motion.button>
      </div>

      {/* Active Battle */}
      <motion.div
        className="glass-card p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Swords size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">{activeBattle.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users size={12} /> {activeBattle.players.length} players
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-accent text-sm font-medium">
                <Clock size={14} />
                {activeBattle.timeLeft} left
              </div>
              <p className="text-xs text-muted-foreground mt-1">Prize: {activeBattle.prize}</p>
            </div>
          </div>

          <div className="space-y-3">
            {activeBattle.players.map((player, i) => {
              const progress = (player.savings / player.target) * 100;
              const isUser = player.name === "Alex K.";
              return (
                <motion.div
                  key={player.name}
                  className={`flex items-center gap-4 p-3 rounded-xl ${isUser ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <span className={`text-sm font-bold w-6 ${player.rank === 1 ? "text-accent" : "text-muted-foreground"}`}>
                    #{player.rank}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {player.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm font-medium ${isUser ? "text-primary" : "text-foreground"}`}>
                        {player.name} {isUser && "⭐"}
                      </p>
                      <p className="text-sm font-bold text-success">${player.savings}</p>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${player.rank === 1 ? "bg-accent" : "bg-primary"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Available Battles */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-4">Available Battles</p>
        <div className="grid grid-cols-3 gap-4">
          {availableBattles.map((battle, i) => (
            <motion.div
              key={battle.name}
              className="glass-card-hover p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-accent" />
                <p className="font-semibold text-foreground text-sm">{battle.name}</p>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Players</span>
                  <span className="text-foreground">{battle.players}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="text-foreground">{battle.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prize</span>
                  <span className="text-accent font-medium">{battle.prize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty</span>
                  <span className="text-foreground">{battle.difficulty}</span>
                </div>
              </div>
              <motion.button
                className="w-full mt-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                Join Battle
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
