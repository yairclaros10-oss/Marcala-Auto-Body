import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import EstimateForm from "@/components/EstimateForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0D11] text-slate-100 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <BeforeAfter />
        <About />
        <Gallery />
        <Reviews />
        <EstimateForm />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
