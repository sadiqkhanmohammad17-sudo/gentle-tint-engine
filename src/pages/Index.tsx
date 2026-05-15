import Header from "@/components/dental/Header";
import Hero from "@/components/dental/Hero";
import Services from "@/components/dental/Services";
import WhyChooseUs from "@/components/dental/WhyChooseUs";
import DoctorSection from "@/components/dental/DoctorSection";
import BookingForm from "@/components/dental/BookingForm";
import Footer from "@/components/dental/Footer";
import Testimonials from "@/components/dental/Testimonials";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="doctor">
        <DoctorSection />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="why-choose-us">
        <WhyChooseUs />
      </div>
      <div id="booking">
        <BookingForm />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
