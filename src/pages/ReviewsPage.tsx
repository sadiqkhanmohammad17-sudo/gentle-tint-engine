import Header from "@/components/dental/Header";
import Testimonials from "@/components/dental/Testimonials";
import Footer from "@/components/dental/Footer";

const ReviewsPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
};

export default ReviewsPage;
