import { motion } from "framer-motion";

interface SpendoraFlameProps {
  size?: number;
  className?: string;
}

const SpendoraFlame = ({ size = 64, className = "" }: SpendoraFlameProps) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 64 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.25}
        initial={{ y: 0 }}
        animate={{ y: [0, -1.5, 0, -0.5, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Soft cream halo / ambient glow */}
        <defs>
          <radialGradient id="flame-halo" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#F9DCAD" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F9DCAD" stopOpacity="0" />
          </radialGradient>

          {/* Outer flame gradient — blue to mint */}
          <linearGradient id="flame-outer" x1="32" y1="72" x2="32" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#097DD0" />
            <stop offset="55%" stopColor="#097DD0" />
            <stop offset="100%" stopColor="#96DDD0" />
          </linearGradient>

          {/* Inner flame gradient — lighter mint to cream */}
          <linearGradient id="flame-inner" x1="32" y1="65" x2="32" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#097DD0" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#96DDD0" />
            <stop offset="100%" stopColor="#F9DCAD" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Halo ellipse */}
        <ellipse cx="32" cy="52" rx="28" ry="22" fill="url(#flame-halo)" />

        {/* Outer flame shape */}
        <motion.path
          d="
            M 32 6
            C 28 18, 12 28, 12 48
            C 12 60, 20 70, 32 72
            C 44 70, 52 60, 52 48
            C 52 28, 36 18, 32 6
            Z
          "
          fill="url(#flame-outer)"
          animate={{
            d: [
              "M 32 6 C 28 18, 12 28, 12 48 C 12 60, 20 70, 32 72 C 44 70, 52 60, 52 48 C 52 28, 36 18, 32 6 Z",
              "M 32 7 C 27 19, 11 29, 11.5 47.5 C 11.5 59.5, 20 70, 32 72 C 44 70, 52.5 59.5, 52.5 47.5 C 52.5 29, 37 19, 32 7 Z",
              "M 32 5.5 C 29 17.5, 12.5 27.5, 12.5 48.5 C 12.5 60.5, 20 70, 32 72 C 44 70, 51.5 60.5, 51.5 48.5 C 51.5 27.5, 35 17.5, 32 5.5 Z",
              "M 32 6 C 28 18, 12 28, 12 48 C 12 60, 20 70, 32 72 C 44 70, 52 60, 52 48 C 52 28, 36 18, 32 6 Z",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner flame shape */}
        <motion.path
          d="
            M 32 26
            C 29 34, 22 40, 22 52
            C 22 60, 26 66, 32 67
            C 38 66, 42 60, 42 52
            C 42 40, 35 34, 32 26
            Z
          "
          fill="url(#flame-inner)"
          animate={{
            d: [
              "M 32 26 C 29 34, 22 40, 22 52 C 22 60, 26 66, 32 67 C 38 66, 42 60, 42 52 C 42 40, 35 34, 32 26 Z",
              "M 32 27.5 C 28.5 35, 21.5 41, 21.5 51.5 C 21.5 59.5, 26 66, 32 67 C 38 66, 42.5 59.5, 42.5 51.5 C 42.5 41, 35.5 35, 32 27.5 Z",
              "M 32 25 C 29.5 33, 22.5 39.5, 22.5 52.5 C 22.5 60.5, 26 66, 32 67 C 38 66, 41.5 60.5, 41.5 52.5 C 41.5 39.5, 34.5 33, 32 25 Z",
              "M 32 26 C 29 34, 22 40, 22 52 C 22 60, 26 66, 32 67 C 38 66, 42 60, 42 52 C 42 40, 35 34, 32 26 Z",
            ],
            opacity: [0.85, 1, 0.9, 0.85],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Flame tip accent — tiny bright point */}
        <motion.ellipse
          cx="32"
          cy="14"
          rx="2.5"
          ry="4"
          fill="#96DDD0"
          opacity={0.5}
          animate={{
            cy: [14, 12.5, 14.5, 14],
            opacity: [0.5, 0.7, 0.4, 0.5],
            ry: [4, 4.5, 3.5, 4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default SpendoraFlame;
