import { motion } from "framer-motion";

interface FloatingToothProps {
  className?: string;
  size?: number;
  delay?: number;
  duration?: number;
}

const FloatingTooth = ({ className = "", size = 60, delay = 0, duration = 6 }: FloatingToothProps) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        y: [0, -30, 0],
        rotate: [0, 10, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id={`toothGradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(210, 100%, 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(165, 100%, 50%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M50 10C35 10 25 20 25 35C25 50 20 65 25 80C30 95 35 90 40 85C45 80 45 70 50 70C55 70 55 80 60 85C65 90 70 95 75 80C80 65 75 50 75 35C75 20 65 10 50 10Z"
          fill={`url(#toothGradient-${delay})`}
          stroke="hsl(210, 100%, 60%)"
          strokeWidth="2"
          strokeOpacity="0.4"
        />
        <ellipse
          cx="50"
          cy="35"
          rx="15"
          ry="10"
          fill="white"
          fillOpacity="0.4"
        />
      </svg>
    </motion.div>
  );
};

export default FloatingTooth;
