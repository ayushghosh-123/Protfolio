import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Projects from "@/components/projects";
import BlogSection from "@/components/blog";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <BlogSection />
      <Contact />
    </>
  );
}
