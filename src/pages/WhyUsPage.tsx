import Header from "@/components/dental/Header";
import WhyChooseUs from "@/components/dental/WhyChooseUs";
import Footer from "@/components/dental/Footer";

const WhyUsPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <WhyChooseUs />
      </div>
      <Footer />
    </main>
  );
};

export default WhyUsPage;
