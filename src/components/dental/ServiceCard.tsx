import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  image?: string;
}

const ServiceCard = ({ icon: Icon, title, description, index, image }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer transition-all duration-300 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="glass rounded-2xl overflow-hidden h-full border border-white/30 hover:border-dental-mint/50 transition-colors duration-300">
        {/* Service Image */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <motion.div
              className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-dental-blue to-dental-mint flex items-center justify-center"
              style={{ transform: "translateZ(30px)" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        )}

        <div className="p-8">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-dental-blue/5 to-dental-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Icon - only show if no image */}
          {!image && (
            <motion.div
              className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-dental-blue to-dental-mint flex items-center justify-center mb-6"
              style={{ transform: "translateZ(30px)" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          )}

          {/* Content */}
          <div className="relative" style={{ transform: "translateZ(20px)" }}>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Decorative corner */}
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-dental-mint/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
