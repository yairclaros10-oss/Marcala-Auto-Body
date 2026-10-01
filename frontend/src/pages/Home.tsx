import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Social from "@/components/Social";
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
        <section className="bg-[#0B0D11] px-4 pt-14 sm:px-6 lg:px-8" aria-label="Inside the shop">
          <div className="mx-auto max-w-7xl">
            <img
              src="/work/banner-cap.webp"
              alt="A Marcala Auto Body shop cap resting on a freshly painted red fender inside the booth"
              data-testid="shop-banner-image"
              loading="lazy"
              className="aspect-[21/9] w-full rounded-xl border border-white/10 object-cover object-center shadow-[0_0_50px_rgba(220,38,38,0.12)]"
            />
          </div>
        </section>
        <Services />
        <BeforeAfter />
        <About />
        <Gallery />
        <Reviews />
        <Social />
        <EstimateForm />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
