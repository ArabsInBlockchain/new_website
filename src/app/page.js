import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ValuesSection from "@/components/ValuesSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import CTAGreenSection from "@/components/CTAGreenSection";
import Footer from "@/components/Footer";
import ProcessSection from "@/components/ProcessSection";
import ImpactSection from "@/components/ImpactSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import UpcomingEvents from "@/components/UpcomingEvents";
import SectionReveal from "@/components/SectionReveal";
import ImpactMakersSection from "@/components/ImpactMakersSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full" dir="rtl">
      <Navbar />
      <Hero />
      <SectionReveal><AboutSection /></SectionReveal>
      <SectionReveal><ProcessSection /></SectionReveal>
      <SectionReveal><ImpactSection /></SectionReveal>
      <SectionReveal><FeaturedProjects /></SectionReveal>
      <SectionReveal><UpcomingEvents /></SectionReveal>
      <SectionReveal><ValuesSection /></SectionReveal>
      <SectionReveal><ServicesSection /></SectionReveal>
      <SectionReveal><ImpactMakersSection /></SectionReveal>
      <SectionReveal><TestimonialsSection /></SectionReveal>
      <CTASection />
      <CTAGreenSection />
      <Footer />
    </main>
  );
}
