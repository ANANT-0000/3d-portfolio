import { lazy, Suspense } from "react";
import { Navbar } from "./section/Navbar";
import { Hero } from "./section/Hero";

// Lazy load heavy sections for better initial load performance
const About = lazy(() => import("./section/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("./section/Projects").then(m => ({ default: m.Projects })));
const Clients = lazy(() => import("./section/Clients").then(m => ({ default: m.Clients })));
const Experience = lazy(() => import("./section/Experience").then(m => ({ default: m.Experience })));
const Contact = lazy(() => import("./section/Contact"));

// Simple loading fallback
const SectionLoader = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>
);

export default function App ()
{
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Projects />
        {/* <Clients /> */}
        <Experience />
        <Contact />
      </Suspense>
    </main>
  )
}