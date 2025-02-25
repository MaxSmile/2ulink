// src/pages/RootPage.jsx
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroArea from "../components/HeroArea";
import Features from "../components/Features";
import HomeAboutSection from "../components/HomeAboutSection";
import ClarificationSection from "../components/ClarificationSection";

export default function RootPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <HeroArea />
        <Features />
        <HomeAboutSection />
        <ClarificationSection />
      </main>
      <Footer />
    </>
  );
}

