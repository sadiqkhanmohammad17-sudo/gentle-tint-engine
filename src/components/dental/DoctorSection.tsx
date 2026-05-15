import { motion } from "framer-motion";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import doctorImage from "@/assets/doctor.avif";

const degrees = [
  { icon: GraduationCap, title: "BDS", description: "Bachelor of Dental Surgery" },
  { icon: Award, title: "MDS", description: "Master of Dental Surgery" },
  { icon: Stethoscope, title: "Specialist", description: "Oral & Maxillofacial Surgery" },
];

const DoctorSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dental-blue/5 via-transparent to-dental-mint/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Doctor Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative frame */}
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-dental-blue/20 to-dental-mint/20 blur-xl"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src={doctorImage}
                  alt="Our Lead Dentist"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dental-blue/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass px-6 py-3 rounded-2xl shadow-xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <span className="text-lg font-bold gradient-text">15+ Years Experience</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Doctor Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-dental-blue/10 text-dental-blue text-sm font-medium mb-4"
            >
              Meet Our Expert
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Dr. <span className="gradient-text">Expert Dentist</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              Leading dental specialist with extensive experience in advanced dental procedures, 
              committed to providing the highest quality care with a gentle touch.
            </p>

            {/* Degrees */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Qualifications & Degrees</h3>
              
              {degrees.map((degree, index) => (
                <motion.div
                  key={degree.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass hover:border-dental-mint/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-dental-blue/10 to-dental-mint/10 flex items-center justify-center">
                    <degree.icon className="w-6 h-6 text-dental-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{degree.title}</h4>
                    <p className="text-sm text-muted-foreground">{degree.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
