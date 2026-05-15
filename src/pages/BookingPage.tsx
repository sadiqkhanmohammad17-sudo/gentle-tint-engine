import Header from "@/components/dental/Header";
import BookingForm from "@/components/dental/BookingForm";
import Footer from "@/components/dental/Footer";

const BookingPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <BookingForm />
      </div>
      <Footer />
    </main>
  );
};

export default BookingPage;
