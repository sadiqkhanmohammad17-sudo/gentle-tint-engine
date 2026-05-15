import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Wave Top */}
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

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 left-10 w-64 h-64 rounded-full bg-dental-blue/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-dental-mint/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-dental-blue-light to-dental-mint bg-clip-text text-transparent">
                Smile
              </span>{" "}
              Dental Care
            </h3>
            <p className="text-background/70 leading-relaxed">
              Providing exceptional dental care with cutting-edge technology and
              a compassionate approach since 2009.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-dental-mint">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-background/70 hover:text-background transition-colors">
                <MapPin className="w-5 h-5 mt-0.5 text-dental-mint shrink-0" />
                <span>123 Healthcare Avenue, Medical District, City - 110001</span>
              </li>
              <li className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Phone className="w-5 h-5 text-dental-mint shrink-0" />
                <span>+91 6397050608</span>
              </li>
              <li className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Mail className="w-5 h-5 text-dental-mint shrink-0" />
                <span>info@smiledentalcare.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-dental-mint flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Opening Hours
            </h4>
            <ul className="space-y-2 text-background/70">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-background">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-background">9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-background">10:00 AM - 2:00 PM</span>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dental-mint/20 text-dental-mint text-sm">
                  <span className="w-2 h-2 rounded-full bg-dental-mint animate-pulse" />
                  Emergency: 24/7
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-dental-mint">Follow Us</h4>
            <p className="text-background/70 mb-4">
              Stay connected for tips, updates, and special offers.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-dental-mint hover:text-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-background/20 to-transparent mb-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-background/50 text-sm"
        >
          <p>
            © {currentYear} Smile Dental Care. All rights reserved. Built with{" "}
            <span className="text-dental-mint">♥</span> for healthy smiles.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
