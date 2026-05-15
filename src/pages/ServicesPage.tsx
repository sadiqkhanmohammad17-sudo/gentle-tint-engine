import Header from "@/components/dental/Header";
import Services from "@/components/dental/Services";
import Footer from "@/components/dental/Footer";

const ServicesPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </main>
  );
};

export default ServicesPage;
