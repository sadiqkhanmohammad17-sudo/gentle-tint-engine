import Header from "@/components/dental/Header";
import Hero from "@/components/dental/Hero";
import DoctorSection from "@/components/dental/DoctorSection";
import Services from "@/components/dental/Services";
import Testimonials from "@/components/dental/Testimonials";
import WhyChooseUs from "@/components/dental/WhyChooseUs";
import BookingForm from "@/components/dental/BookingForm";
import Footer from "@/components/dental/Footer";

const HomePage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <DoctorSection />
      <Services />
      <Testimonials />
      <WhyChooseUs />
      <BookingForm />
      <Footer />
    </main>
  );
};

export default HomePage;
