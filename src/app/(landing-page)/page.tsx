import {
  FAQs,
  Footer,
  Hero,
  Navbar,
  PlatformFeatures,
  PricingPlans,
  SelfServe,
} from "@/components/landing-page";
import ReadySection from "@/components/landing-page/ReadySection";

export default function Home() {
  return (
    <main className="flex-center mx-auto w-full w-screen flex-col bg-bg text-text">
      <Navbar />
      <Hero />
      <SelfServe />
      <PlatformFeatures />
      <PricingPlans />
      <FAQs />
      <ReadySection />
      <Footer />
    </main>
  );
}
