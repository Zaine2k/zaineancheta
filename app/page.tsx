import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import Work from "@/components/Work";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <MusicPlayer />
      <Hero />
      <About />
      <Interests />
      <Projects />
      <Work />
      <Awards />
      <Contact />
    </main>
  );
}