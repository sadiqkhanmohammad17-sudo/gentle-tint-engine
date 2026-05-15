import Header from "@/components/dental/Header";
import DoctorSection from "@/components/dental/DoctorSection";
import Footer from "@/components/dental/Footer";

const DoctorPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <DoctorSection />
      </div>
      <Footer />
    </main>
  );
};

export default DoctorPage;
