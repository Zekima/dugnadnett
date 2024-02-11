import Image from "next/image";
import HeroSection from '@/components/landing/hero-section'
import CTASection from '@/components/landing/cta-section'

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <CTASection/>
    </main>
  );
}
