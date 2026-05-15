import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";

interface StatCounterProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
  index: number;
}

const StatCounter = ({ icon: Icon, value, suffix = "", label, index }: StatCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (val) => Math.round(val));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-dental-mint/50 transition-all duration-300 hover:shadow-lg">
        {/* Animated Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-dental-blue/10 to-dental-mint/10 mb-6"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-8 h-8 text-dental-blue" />
        </motion.div>

        {/* Counter */}
        <div className="flex items-baseline justify-center gap-1">
          <motion.span className="text-5xl md:text-6xl font-bold gradient-text">
            {display}
          </motion.span>
          <span className="text-3xl font-bold text-dental-mint">{suffix}</span>
        </div>

        {/* Label */}
        <p className="mt-4 text-lg text-muted-foreground font-medium">{label}</p>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-dental-blue to-dental-mint rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default StatCounter;
