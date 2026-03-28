import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, TrendingUp } from "lucide-react";

interface AddSavingModalProps {
  open: boolean;
  onClose: () => void;
}

const AddSavingModal = ({ open, onClose }: AddSavingModalProps) => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!amount) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAmount("");
      setReason("");
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative glass-card p-8 w-full max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {!submitted ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Add Saving</h2>
                    <p className="text-sm text-muted-foreground mt-1">Keep your streak alive 🔥</p>
                  </div>
                  <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-semibold text-lg">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-4 bg-secondary/50 border border-border rounded-xl text-2xl font-bold text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Reason (optional)</label>
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="e.g., Skipped coffee today ☕"
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    {["5", "10", "20", "50"].map((v) => (
                      <motion.button
                        key={v}
                        onClick={() => setAmount(v)}
                        className="flex-1 py-2 rounded-lg bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
                        whileTap={{ scale: 0.95 }}
                      >
                        ${v}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base glow-primary mt-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Now
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", damping: 15 }}
                >
                  <Check size={36} className="text-success" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Saved ${amount}!</h3>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <motion.div
                    className="flex items-center gap-1.5 text-accent"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Sparkles size={16} />
                    <span className="text-sm font-semibold">+15 pts</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1.5 text-success"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <TrendingUp size={16} />
                    <span className="text-sm font-semibold">Streak +1</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddSavingModal;
