import { useState } from "react";
import { motion } from "framer-motion";

interface SpendoraFlameProps {
  size?: number;
  className?: string;
  /** When true, flame only animates on hover. When false (default), always animates. */
  hoverOnly?: boolean;
}

const SpendoraFlame = ({ size = 64, className = "", hoverOnly = false }: SpendoraFlameProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = hoverOnly ? isHovered : true;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.svg
        viewBox="0 0 64 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.25}
        animate={isActive ? { y: [0, -1, 0, -0.5, 0] } : { y: 0 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          {/* Subtle warm halo — reduced opacity */}
          <radialGradient id={`flame-halo-${size}`} cx="50%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#F9DCAD" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#F9DCAD" stopOpacity="0" />
          </radialGradient>

          {/* Outer flame gradient — deep red to orange to yellow tip */}
          <linearGradient id={`flame-outer-${size}`} x1="32" y1="74" x2="30" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4380D" />
            <stop offset="40%" stopColor="#E8611A" />
            <stop offset="75%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#FDD835" />
          </linearGradient>

          {/* Inner flame gradient — bright yellow core */}
          <linearGradient id={`flame-inner-${size}`} x1="33" y1="68" x2="31" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#FFCA28" />
            <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Reduced halo */}
        <ellipse cx="32" cy="58" rx="20" ry="14" fill={`url(#flame-halo-${size})`} />

        {/* Outer flame — asymmetric, organic, with side lick */}
        <motion.path
          d="M 30 4 C 27 14, 10 26, 10 48 C 10 58, 16 66, 22 70 C 26 72, 30 73, 33 73 C 38 73, 44 70, 48 64 C 53 56, 54 46, 50 36 C 47 28, 36 16, 30 4 Z"
          fill={`url(#flame-outer-${size})`}
          animate={isActive ? {
            d: [
              "M 30 4 C 27 14, 10 26, 10 48 C 10 58, 16 66, 22 70 C 26 72, 30 73, 33 73 C 38 73, 44 70, 48 64 C 53 56, 54 46, 50 36 C 47 28, 36 16, 30 4 Z",
              "M 31 5 C 26 15, 9 27, 9.5 47 C 9.5 57, 15 66, 21 70.5 C 25 72.5, 30 73.5, 34 73 C 39 72, 45 69, 49 63 C 54 55, 55 45, 51 35 C 48 27, 37 17, 31 5 Z",
              "M 29 3.5 C 28 13.5, 11 25, 10.5 49 C 10.5 59, 17 67, 23 71 C 27 73, 31 73.5, 33 73.5 C 37 73, 43 70.5, 47 65 C 52 57, 53 47, 49 37 C 46 29, 35 15, 29 3.5 Z",
              "M 30 4 C 27 14, 10 26, 10 48 C 10 58, 16 66, 22 70 C 26 72, 30 73, 33 73 C 38 73, 44 70, 48 64 C 53 56, 54 46, 50 36 C 47 28, 36 16, 30 4 Z",
            ],
          } : {}}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Small flame lick on the left side */}
        <motion.path
          d="M 14 38 C 12 32, 16 26, 20 30 C 18 34, 15 36, 14 38 Z"
          fill="#F5A623"
          animate={isActive ? {
            d: [
              "M 14 38 C 12 32, 16 26, 20 30 C 18 34, 15 36, 14 38 Z",
              "M 13 37 C 11 30, 15 24, 19 28 C 17 33, 14 35, 13 37 Z",
              "M 15 39 C 13 33, 17 27, 21 31 C 19 35, 16 37, 15 39 Z",
              "M 14 38 C 12 32, 16 26, 20 30 C 18 34, 15 36, 14 38 Z",
            ],
            opacity: [0.5, 0.65, 0.4, 0.5],
          } : { opacity: 0.5 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner flame — offset slightly right, asymmetric */}
        <motion.path
          d="M 33 28 C 30 36, 22 42, 22 54 C 22 60, 25 65, 30 67 C 34 68, 38 66, 41 62 C 44 56, 44 46, 40 38 C 38 32, 34 30, 33 28 Z"
          fill={`url(#flame-inner-${size})`}
          animate={isActive ? {
            d: [
              "M 33 28 C 30 36, 22 42, 22 54 C 22 60, 25 65, 30 67 C 34 68, 38 66, 41 62 C 44 56, 44 46, 40 38 C 38 32, 34 30, 33 28 Z",
              "M 33 29.5 C 29.5 37, 21 43, 21.5 53.5 C 21.5 59.5, 25 65.5, 31 67.5 C 35 68.5, 39 66, 42 61 C 45 55, 45 45, 41 37 C 39 31, 34 31, 33 29.5 Z",
              "M 32 27 C 30.5 35, 23 41, 22.5 55 C 22.5 61, 26 66, 30 67.5 C 33 68, 37 66.5, 40 63 C 43 57, 43 47, 39 39 C 37 33, 33 29, 32 27 Z",
              "M 33 28 C 30 36, 22 42, 22 54 C 22 60, 25 65, 30 67 C 34 68, 38 66, 41 62 C 44 56, 44 46, 40 38 C 38 32, 34 30, 33 28 Z",
            ],
            opacity: [0.9, 1, 0.85, 0.9],
          } : { opacity: 0.9 }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Flame tip flicker */}
        <motion.ellipse
          cx="30"
          cy="10"
          rx="2"
          ry="5"
          fill="#FDD835"
          animate={isActive ? {
            cy: [10, 7, 11, 8, 10],
            cx: [30, 31, 29, 30.5, 30],
            opacity: [0.6, 0.85, 0.45, 0.7, 0.6],
            ry: [5, 6, 4, 5.5, 5],
          } : { opacity: 0.6 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default SpendoraFlame;
