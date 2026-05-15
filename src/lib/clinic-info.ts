// Centralized clinic information sourced from existing website content.
// Used by the rule-based ChatBot widget — no APIs, no AI, no backend.

export const CLINIC = {
  name: "Smile Dental Care",
  shortName: "Smile Clinic",
  tagline: "Where advanced technology meets compassionate care.",
  established: 2009,

  // Doctor
  doctor: "Dr. Expert Dentist",
  doctorQualifications: "BDS, MDS — Specialist in Oral & Maxillofacial Surgery",
  doctorBio:
    "Leading dental specialist with extensive experience in advanced dental procedures, committed to providing the highest quality care with a gentle touch.",
  experience: "15+ Years",

  // Contact
  phone: "+91 6397050608",
  whatsappNumber: "916397050608",
  email: "info@smiledentalcare.com",
  address: "123 Healthcare Avenue, Medical District, City - 110001",

  // Hours
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
  ],
  emergency: "24/7 Emergency Care Available",
  appointmentSlotWindow: "10:00 AM – 8:00 PM (every 30 minutes)",

  // Services with short descriptions (matches Services section)
  services: [
    {
      name: "General Checkup",
      description:
        "Comprehensive oral examinations with state-of-the-art diagnostic tools.",
    },
    {
      name: "Teeth Whitening",
      description:
        "Professional whitening that brightens your smile by several shades in one visit.",
    },
    {
      name: "Dental Implants",
      description:
        "Permanent titanium implants that look and function like natural teeth.",
    },
    {
      name: "Braces & Aligners",
      description:
        "Modern orthodontics including invisible aligners for a confident smile.",
    },
    {
      name: "Root Canal",
      description:
        "Gentle, pain-free root canal therapy to save damaged teeth.",
    },
    {
      name: "Cosmetic Dentistry",
      description:
        "Veneers, bonding, and complete smile makeovers tailored to you.",
    },
  ],

  // Trust signals (from WhyChooseUs)
  trust: [
    "FDA Approved Equipment",
    "ISO Certified Clinic",
    "100% Sterilized Tools",
    "1000+ Happy Patients",
    "24/7 Emergency Care",
  ],

  // FAQ — common patient questions answered from existing site context
  faqs: [
    {
      q: "Is the first consultation safe and hygienic?",
      a: "Absolutely. We use FDA-approved equipment, ISO-certified protocols, and 100% sterilized tools for every patient.",
    },
    {
      q: "Do you treat children?",
      a: "Yes, we welcome patients of all ages — from kids to seniors — with gentle, family-friendly care.",
    },
    {
      q: "Is the root canal painful?",
      a: "Not at all. Our root canal treatments are gentle and pain-free thanks to modern anesthesia and precision tools.",
    },
    {
      q: "How long do dental implants last?",
      a: "With proper care, our titanium implants are designed to last a lifetime and function like natural teeth.",
    },
    {
      q: "Do you handle dental emergencies?",
      a: "Yes — we offer 24/7 emergency dental care. Call or WhatsApp us anytime at " +
        "+91 6397050608.",
    },
    {
      q: "How can I pay?",
      a: "We accept cash, UPI, and all major cards. Payment details are shared at the clinic during your visit.",
    },
  ],
};

export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(message)}`;
