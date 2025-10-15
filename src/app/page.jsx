"use client";


import Home from "./home/home";
import Aboutspace from "./about/aboutspace";
import About from "./about/about";

export default function HomePage() {
  return (
    <main>
      <Home  />
      <Aboutspace/>
      <About/> {/* continues right after hero */}
      
    </main>
  );
}
