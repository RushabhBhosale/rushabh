import type { Metadata } from "next";
import "./home.css";
import HeroSection from "./_components/HeroSection";
import FeaturedProjects from "./_components/FeaturedProjects";
import SwitchyardBanner from "./_components/SwitchyardBanner";
import CapabilitiesAndRoute from "./_components/CapabilitiesAndRoute";
import SelectedWriting from "./_components/SelectedWriting";

export const metadata: Metadata = {
  title: "Rushabh Bhosale — Software Developer | Portfolio",
  description:
    "Portfolio of Rushabh Bhosale. Full-stack software developer building web, mobile, and developer tools with React, Next.js, React Native, TypeScript, and Node.js.",
};

export default function HomePage() {
  return (
    <div className="switchyard home-page w-full flex flex-col items-center justify-start pt-[68px] min-[801px]:pt-[74px]">
      <HeroSection />

      <FeaturedProjects />

      <SwitchyardBanner />

      <CapabilitiesAndRoute />

      <SelectedWriting />
    </div>
  );
}
