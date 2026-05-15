import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    review: "Excellent dental care! Dr. provided painless treatment and the staff was very friendly. Highly recommend for anyone looking for quality dental services.",
    date: "2 weeks ago",
  },
  {
    name: "Rajesh Kumar",
    rating: 5,
    review: "Best dental clinic in Pilibhit. Very professional and hygienic environment. Got my root canal done here and it was completely painless.",
    date: "1 month ago",
  },
  {
    name: "Anita Gupta",
    rating: 5,
    review: "Amazing experience! The doctor is very skilled and explains everything clearly. My whole family gets treatment here. Thank you for the wonderful service!",
    date: "3 weeks ago",
  },
  {
    name: "Mohit Verma",
    rating: 5,
    review: "Very satisfied with my teeth cleaning and whitening. The clinic has modern equipment and the treatment was quick and effective.",
    date: "1 week ago",
  },
  {
    name: "Sunita Devi",
    rating: 5,
    review: "Got my dental implant done here. Excellent work by the doctor. Very caring and professional approach. Highly recommended!",
    date: "2 months ago",
  },
  {
    name: "Vikram Singh",
    rating: 5,
    review: "Best experience ever! The clinic is very clean and well-maintained. Doctor is very patient and answers all queries. Will definitely visit again.",
    date: "1 month ago",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-dental-blue/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-dental-mint/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-dental-mint/10 text-dental-mint text-sm font-medium mb-4"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Patient Reviews</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy patients have
            to say about their experience at Smile Dental Care.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full border border-white/20 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                  "{testimonial.review}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dental-blue to-dental-mint flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.date}
                    </p>
                  </div>
                </div>

                {/* Google Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google Review</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-5 h-5 fill-current" />
            <span>View All Reviews on Google</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
