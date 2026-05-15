import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowLeft, Send } from "lucide-react";
import { CLINIC, buildWhatsAppLink } from "@/lib/clinic-info";

type Sender = "bot" | "user";

interface ChatMessage {
  id: number;
  sender: Sender;
  /** Plain text or pre-formatted multi-line content */
  content: React.ReactNode;
}

interface MenuOption {
  id: string;
  label: string;
}

const MAIN_MENU: MenuOption[] = [
  { id: "services", label: "🦷 Services we offer" },
  { id: "doctor", label: "👨‍⚕️ About the doctor" },
  { id: "timings", label: "🕒 Clinic timings" },
  { id: "location", label: "📍 Location & address" },
  { id: "contact", label: "📞 Contact number" },
  { id: "book", label: "📅 How to book an appointment" },
  { id: "emergency", label: "🚨 Emergency care" },
  { id: "faqs", label: "❓ FAQs" },
  { id: "trust", label: "✅ Why choose us" },
];

const greeting = `👋 Hi! Welcome to ${CLINIC.name}. I'm here to help — pick a question below:`;

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showMenu, setShowMenu] = useState(true);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextId = () => ++idRef.current;

  // Initialize greeting once when first opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), sender: "bot", content: greeting }]);
      setShowMenu(true);
    }
  }, [open, messages.length]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showMenu]);

  const pushBot = (content: React.ReactNode) =>
    setMessages((prev) => [...prev, { id: nextId(), sender: "bot", content }]);

  const pushUser = (text: string) =>
    setMessages((prev) => [...prev, { id: nextId(), sender: "user", content: text }]);

  const handleSelect = (opt: MenuOption) => {
    pushUser(opt.label);
    setShowMenu(false);

    // Slight delay for natural feel
    setTimeout(() => {
      pushBot(getAnswer(opt.id));
    }, 350);
  };

  const handleBackToMenu = () => {
    setShowMenu(true);
    pushBot("Sure! What else would you like to know?");
  };

  const handleReset = () => {
    setMessages([{ id: nextId(), sender: "bot", content: greeting }]);
    setShowMenu(true);
  };

  const getAnswer = (id: string): React.ReactNode => {
    switch (id) {
      case "services":
        return (
          <div>
            <p className="mb-2 font-semibold">We offer the following dental services:</p>
            <ul className="space-y-2">
              {CLINIC.services.map((s) => (
                <li key={s.name} className="flex items-start gap-2">
                  <span className="text-dental-mint mt-0.5">•</span>
                  <span>
                    <span className="font-medium">{s.name}</span>
                    <span className="block text-xs opacity-80">{s.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      case "doctor":
        return (
          <div>
            <p className="font-semibold">{CLINIC.doctor}</p>
            <p className="mt-1">{CLINIC.doctorQualifications}</p>
            <p className="mt-1 text-sm opacity-80">Experience: {CLINIC.experience}</p>
            <p className="mt-2 text-sm">{CLINIC.doctorBio}</p>
          </div>
        );
      case "timings":
        return (
          <div>
            <p className="mb-2 font-semibold">🕒 Clinic Hours:</p>
            <ul className="space-y-1">
              {CLINIC.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3">
                  <span>{h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-dental-mint">⚡ {CLINIC.emergency}</p>
          </div>
        );
      case "location":
        return (
          <div>
            <p className="font-semibold mb-1">📍 Visit us at:</p>
            <p>{CLINIC.address}</p>
          </div>
        );
      case "contact":
        return (
          <div>
            <p className="font-semibold mb-1">📞 Reach us anytime:</p>
            <p>Phone: {CLINIC.phone}</p>
            <p>Email: {CLINIC.email}</p>
          </div>
        );
      case "book":
        return (
          <div>
            <p className="font-semibold mb-2">📅 Booking is super easy:</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Click the WhatsApp button below</li>
              <li>Share your name, preferred date & time</li>
              <li>We'll confirm your slot instantly</li>
            </ol>
            <p className="mt-2 text-sm opacity-80">
              Or use the "Book Appointment" form on our website.
            </p>
            <p className="mt-1 text-sm opacity-80">
              Available slots: {CLINIC.appointmentSlotWindow}.
            </p>
          </div>
        );
      case "emergency":
        return (
          <div>
            <p className="font-semibold text-dental-mint mb-1">🚨 Emergency? We're here 24/7</p>
            <p>Call us immediately at {CLINIC.phone} or message on WhatsApp.</p>
          </div>
        );
      case "faqs":
        return (
          <div>
            <p className="mb-2 font-semibold">❓ Frequently Asked Questions:</p>
            <ul className="space-y-3">
              {CLINIC.faqs.map((f) => (
                <li key={f.q}>
                  <p className="font-medium">{f.q}</p>
                  <p className="text-sm opacity-85 mt-0.5">{f.a}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case "trust":
        return (
          <div>
            <p className="mb-2 font-semibold">✅ Why patients choose {CLINIC.name}:</p>
            <ul className="space-y-1">
              {CLINIC.trust.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-dental-mint">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm opacity-80">
              Serving smiles since {CLINIC.established}.
            </p>
          </div>
        );
      default:
        return "I didn't catch that. Please pick a question from the menu.";
    }
  };

  return (
    <>
      {/* Floating Bubble Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-dental-blue to-dental-mint text-white shadow-2xl flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-dental-mint/40 animate-ping pointer-events-none" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-[59] bg-background border border-border shadow-2xl flex flex-col overflow-hidden
              inset-x-3 bottom-24 top-20 rounded-2xl
              sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:w-[380px] sm:h-[560px] sm:max-h-[80vh] sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-dental-blue to-dental-mint text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold leading-tight">{CLINIC.name}</p>
                  <p className="text-xs opacity-90 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                    Online — usually replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-xs px-2 py-1 rounded-md bg-white/15 hover:bg-white/25 transition"
                title="Reset chat"
              >
                Reset
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-muted/20"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.sender === "user"
                        ? "bg-gradient-to-br from-dental-blue to-dental-mint text-white rounded-br-sm"
                        : "bg-card text-card-foreground border border-border rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Quick reply menu */}
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {MAIN_MENU.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt)}
                      className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 hover:border-primary transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* After-answer actions */}
              {!showMenu && messages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  <a
                    href={buildWhatsAppLink(
                      `Hello ${CLINIC.name}, I'd like to know more / book an appointment.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm px-3.5 py-2 rounded-full bg-green-500 text-white font-medium shadow hover:bg-green-600 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                  <button
                    onClick={handleBackToMenu}
                    className="inline-flex items-center gap-2 text-sm px-3.5 py-2 rounded-full border border-border bg-background hover:bg-muted transition-colors text-foreground"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Menu
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border bg-background text-center">
              <p className="text-[11px] text-muted-foreground">
                Quick answers · Powered by {CLINIC.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
