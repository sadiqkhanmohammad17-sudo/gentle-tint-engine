import { motion } from "framer-motion";
import { Stethoscope, Sparkles, CircleDot, Smile, HeartPulse, Palette } from "lucide-react";
import ServiceCard from "./ServiceCard";
import serviceCheckup from "@/assets/service-checkup.jpg";
import serviceWhitening from "@/assets/service-whitening.jpg";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceBraces from "@/assets/service-braces.jpg";
import serviceRootcanal from "@/assets/service-rootcanal.jpg";
import serviceCosmetic from "@/assets/service-cosmetic.jpg";

const services = [
  {
    icon: Stethoscope,
    title: "General Checkup",
    description: "Comprehensive oral examinations with state-of-the-art diagnostic tools for complete dental health assessment.",
    image: serviceCheckup,
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description: "Professional whitening treatments that safely brighten your smile by several shades in just one visit.",
    image: serviceWhitening,
  },
  {
    icon: CircleDot,
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions using titanium implants that look and function like natural teeth.",
    image: serviceImplants,
  },
  {
    icon: Smile,
    title: "Braces & Aligners",
    description: "Modern orthodontic solutions including invisible aligners for a perfectly aligned, confident smile.",
    image: serviceBraces,
  },
  {
    icon: HeartPulse,
    title: "Root Canal",
    description: "Gentle, pain-free root canal therapy to save damaged teeth and eliminate infection with precision.",
    image: serviceRootcanal,
  },
  {
    icon: Palette,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, bonding, and complete smile makeovers tailored to your vision.",
    image: serviceCosmetic,
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-24 bg-muted/30">
      {/* Wave Divider Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-dental-mint/10 text-dental-mint text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive{" "}
            <span className="gradient-text">Dental Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From preventive care to advanced cosmetic procedures, we offer a full
            spectrum of dental services tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
              image={service.image}
            />
          ))}
        </div>
      </div>

      {/* Wave Divider Bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Services;
