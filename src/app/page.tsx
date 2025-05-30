import CodeShowcase from "@/components/code-showcase";
import HeroSection from "@/components/hero-section";
import LinkAndInfo from "@/components/link-and-info";
import MCPDemo from "@/components/mcp-demo";
import VideoShowcase from "@/components/video-showcase";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px] opacity-20"></div>
      <div className="hidden md:block absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="hidden md:block absolute top-1/3 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="hidden md:block absolute bottom-1/4 left-1/3 w-48 h-48 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <Navbar />

      <div className="relative z-10">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="features">
          <CodeShowcase />
        </section>
        <section id="demo">
          <MCPDemo />
        </section>
        <section id="docs">
          <VideoShowcase />
          <LinkAndInfo />
        </section>
      </div>
    </div>
  );
}
