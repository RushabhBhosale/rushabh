import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Preloader from "@/components/site/Preloader";
import SmoothScroll from "@/components/site/SmoothScroll";
import RouteTransition from "@/components/site/RouteTransition";
import ScrollFx from "@/components/site/ScrollFx";
import Cursor from "@/components/site/Cursor";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <RouteTransition />
      <ScrollFx />
      <Cursor />
    </>
  );
}
