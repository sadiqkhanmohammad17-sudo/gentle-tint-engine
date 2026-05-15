import { motion } from "framer-motion";
import { User, Phone, Send, Loader2, MessageCircle, CalendarCheck, Clock, Mic, MicOff } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface DateOption {
  date: Date;
  label: string;
  sublabel: string;
  key: string;
}

const CLINIC_OPEN_HOUR = 10; // 10 AM
const CLINIC_CLOSE_HOUR = 20; // 8 PM
const SLOT_INTERVAL_MIN = 30;

const BookingForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t.toISOString().split("T")[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [errors, setErrors] = useState({ name: "", phone: "", date: "", time: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set()); // "YYYY-MM-DD|H:MM AM"
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API (browser-native, no cloud)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    setSpeechSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      // Capitalize each word for a name
      const formatted = transcript
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setName(formatted);
      if (errors.name) setErrors((p) => ({ ...p, name: "" }));
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      try { recognition.stop(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setName("");
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  // Generate next 7 days
  const dateOptions = useMemo<DateOption[]>(() => {
    const opts: DateOption[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const key = d.toISOString().split("T")[0];
      let label = "";
      if (i === 0) label = "Today";
      else if (i === 1) label = "Tomorrow";
      else label = d.toLocaleDateString("en-IN", { weekday: "short" });
      const sublabel = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      opts.push({ date: d, label, sublabel, key });
    }
    return opts;
  }, []);

  // Generate available time slots for selected date
  const timeSlots = useMemo<string[]>(() => {
    if (!selectedDateKey) return [];
    const selected = dateOptions.find((d) => d.key === selectedDateKey);
    if (!selected) return [];

    const now = new Date();
    const isToday = selected.date.toDateString() === now.toDateString();
    const minTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour ahead

    const slots: string[] = [];
    const slotDate = new Date(selected.date);
    for (let h = CLINIC_OPEN_HOUR; h < CLINIC_CLOSE_HOUR; h++) {
      for (let m = 0; m < 60; m += SLOT_INTERVAL_MIN) {
        slotDate.setHours(h, m, 0, 0);
        if (isToday && slotDate < minTime) continue;
        const timeStr = slotDate.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        slots.push(timeStr);
      }
    }
    return slots;
  }, [selectedDateKey, dateOptions]);

  const validateName = (v: string) => (!v.trim() ? "Name is required" : v.trim().length < 2 ? "At least 2 characters" : "");
  const validatePhone = (v: string) => {
    const d = v.replace(/\D/g, "");
    if (!d) return "Phone number is required";
    if (d.length !== 10) return "Phone must be exactly 10 digits";
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(v);
    if (errors.phone) setErrors((p) => ({ ...p, phone: validatePhone(v) }));
  };

  // Booked-slot tracking removed (no backend). All slots shown as available.
  useEffect(() => {
    setLoadingSlots(false);
    setBookedSlots(new Set());
  }, [selectedDateKey]);

  const handleDateSelect = (key: string) => {
    setSelectedDateKey(key);
    setSelectedTime("");
    setErrors((p) => ({ ...p, date: "", time: "" }));
  };

  const handleTimeSelect = (t: string) => {
    if (bookedSlots.has(`${selectedDateKey}|${t}`)) return;
    setSelectedTime(t);
    setErrors((p) => ({ ...p, time: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const dateError = !selectedDateKey ? "Please select a date" : "";
    const timeError = !selectedTime ? "Please select a time" : "";
    setErrors({ name: nameError, phone: phoneError, date: dateError, time: timeError });
    if (nameError || phoneError || dateError || timeError) return;

    setIsLoading(true);

    // Insert into Supabase to BLOCK this slot
    const { error: insertError } = await supabase.from("appointments").insert({
      patient_name: name.trim(),
      phone,
      appointment_date: selectedDateKey,
      appointment_time: selectedTime,
    });

    if (insertError) {
      setIsLoading(false);
      // Unique constraint violation = slot just got booked
      if (insertError.code === "23505") {
        toast({
          title: "Slot just got booked!",
          description: "Sorry, someone booked this slot. Please pick another time.",
          variant: "destructive",
        });
        // Refresh booked slots
        setBookedSlots((prev) => new Set(prev).add(`${selectedDateKey}|${selectedTime}`));
        setSelectedTime("");
      } else {
        toast({
          title: "Booking failed",
          description: insertError.message,
          variant: "destructive",
        });
      }
      return;
    }

    const selected = dateOptions.find((d) => d.key === selectedDateKey)!;
    const dateStr = selected.date.toLocaleDateString("en-IN", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    toast({
      title: "Slot booked! ✅",
      description: "Opening WhatsApp to confirm with the doctor...",
    });

    const text = `Hello Doctor, I would like to book an appointment.\n\nName: ${name.trim()}\nPhone: ${phone}\nAppointment Date: ${dateStr}\nAppointment Time: ${selectedTime}`;
    const encoded = encodeURIComponent(text);
    const phoneNumber = "916397050608";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encoded}`;
      setTimeout(() => {
        window.location.href = `https://wa.me/${phoneNumber}?text=${encoded}`;
      }, 1500);
    } else {
      window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    }

    setTimeout(() => {
      setIsLoading(false);
      setName("");
      setPhone("");
      const t = new Date();
      t.setHours(0, 0, 0, 0);
      setSelectedDateKey(t.toISOString().split("T")[0]);
      setSelectedTime("");
      setBookedSlots(new Set());
    }, 1500);
  };

  const isValid = name.trim().length >= 2 && phone.length === 10 && selectedDateKey && selectedTime;

  return (
    <section id="booking" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-bg-animated opacity-10" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-dental-blue/10 blur-3xl"
          animate={{ y: [0, -50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-dental-mint/10 blur-3xl"
          animate={{ y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-dental-mint/10 text-dental-mint text-sm font-medium mb-4">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Booking</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Book Your <span className="gradient-text">Appointment</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose your preferred date & time — we'll connect you on WhatsApp instantly.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, type: "spring" }}>
            <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-dental-blue/20 to-dental-mint/20 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-dental-mint/20 to-dental-blue/20 blur-2xl" />

              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name */}
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: validateName(e.target.value) })); }}
                      onBlur={() => setErrors((p) => ({ ...p, name: validateName(name) }))}
                      placeholder={isListening ? "Listening... speak your name" : "Your Full Name"}
                      className={`w-full pl-12 ${speechSupported ? "pr-14" : "pr-4"} py-4 rounded-xl border-2 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
                    />
                    {speechSupported && (
                      <motion.button
                        type="button"
                        onClick={toggleListening}
                        whileTap={{ scale: 0.9 }}
                        title={isListening ? "Stop listening" : "Speak your name"}
                        aria-label={isListening ? "Stop voice input" : "Start voice input"}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isListening
                            ? "bg-destructive text-destructive-foreground shadow-lg animate-pulse"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </motion.button>
                    )}
                  </div>
                  {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
                  {speechSupported && !errors.name && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      💡 Tap the mic to speak your name
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={() => setErrors((p) => ({ ...p, phone: validatePhone(phone) }))}
                      placeholder="10-digit Phone Number"
                      className={`w-full pl-12 pr-20 py-4 rounded-xl border-2 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none ${errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{phone.length}/10</span>
                  </div>
                  {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone}</p>}
                </div>

                {/* Date Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                    <CalendarCheck className="w-4 h-4 text-dental-mint" />
                    Select Date
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {dateOptions.map((opt) => (
                      <motion.button
                        key={opt.key}
                        type="button"
                        onClick={() => handleDateSelect(opt.key)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-all duration-200 ${
                          selectedDateKey === opt.key
                            ? "border-primary bg-primary/10 text-primary shadow-md"
                            : "border-border bg-background/50 text-foreground hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xs font-medium">{opt.label}</span>
                        <span className="text-sm font-bold mt-0.5">{opt.sublabel}</span>
                      </motion.button>
                    ))}
                  </div>
                  {errors.date && <p className="mt-2 text-sm text-destructive">{errors.date}</p>}
                </div>

                {/* Time Selection */}
                {selectedDateKey && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <Clock className="w-4 h-4 text-dental-mint" />
                      Select Time <span className="text-xs font-normal text-muted-foreground">(10 AM – 8 PM)</span>
                    </label>
                    {loadingSlots ? (
                      <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Checking availability...
                      </div>
                    ) : timeSlots.length === 0 ? (
                      <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground text-center">
                        No more slots available today. Please choose another day.
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                          {timeSlots.map((t) => {
                            const isBooked = bookedSlots.has(`${selectedDateKey}|${t}`);
                            const isSelected = selectedTime === t;
                            return (
                              <motion.button
                                key={t}
                                type="button"
                                disabled={isBooked}
                                onClick={() => handleTimeSelect(t)}
                                whileHover={!isBooked ? { scale: 1.05 } : {}}
                                whileTap={!isBooked ? { scale: 0.95 } : {}}
                                className={`py-2.5 px-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                                  isBooked
                                    ? "border-border bg-muted/40 text-muted-foreground line-through cursor-not-allowed opacity-60"
                                    : isSelected
                                    ? "border-dental-mint bg-dental-mint/10 text-dental-mint shadow-md"
                                    : "border-border bg-background/50 text-foreground hover:border-dental-mint/50"
                                }`}
                              >
                                {t}
                              </motion.button>
                            );
                          })}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          <span className="line-through">Strikethrough</span> = already booked
                        </p>
                      </>
                    )}
                    {errors.time && <p className="mt-2 text-sm text-destructive">{errors.time}</p>}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${isValid && !isLoading ? "btn-secondary-3d pulse-glow text-secondary-foreground" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                  whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /><span>Opening WhatsApp...</span></>
                  ) : (
                    <><Send className="w-5 h-5" /><span>Book Appointment</span></>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
