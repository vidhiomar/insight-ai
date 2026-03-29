import { motion, AnimatePresence } from "framer-motion";
import Particles from "./Particles";
import { MouseParallaxContainer as Parallax } from "react-parallax-mouse";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, FileText, Zap,Brain, Shield,Cpu,CheckCircle2,} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { supportedModels } from "@/lib/models";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Get summaries in seconds with our optimized AI pipeline." },
  { icon: Brain, title: "Context-Aware", desc: "Understands nuance, tone, and key arguments in your text." },
  { icon: Shield, title: "Private & Secure", desc: "Your data is encrypted and never stored without permission." },
  { icon: Cpu, title: "Multi-Model", desc: "Compare results from BART, Mistral, T5, and Pegasus." },
];

const steps = [
  { num: "01", title: "Paste Your Text", desc: "Drop in any article, document, or long-form content." },
  { num: "02", title: "Choose Your Style", desc: "Pick short summary, bullet points, or detailed analysis." },
  { num: "03", title: "Get Results", desc: "Receive an intelligent summary in seconds." },
];

const carouselSlides = [
  {
    title: "AI Summarization",
    desc: "Transform lengthy articles into concise, intelligent summaries with a single click.",
    preview: "Input → AI Processing → Clean Summary",
  },
  {
    title: "Bullet Point Extraction",
    desc: "Automatically extract key points and organize them into structured bullet lists.",
    preview: "• Key insight 1\n• Key insight 2\n• Key insight 3",
  },
  {
    title: "Model Comparison",
    desc: "Compare outputs from BART, Mistral, T5, and Pegasus side by side.",
    preview: "BART vs Mistral vs T5 vs Pegasus",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track your usage, compression ratios, and time saved with detailed analytics.",
    preview: "1,284 summaries · 78% compression · 42h saved",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

    
     
<Parallax strength={0.005}>
  <section className="relative h-screen w-full flex items-center justify-center px-6 overflow-hidden">

  {/* Pixel Snow Background */}
  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
    <Particles
      color="#ffffff"
      flakeSize={0.0006}              // visible size
      minFlakeSize={0.006}
      speed={0.5}
      density={0.6}             // max density
    />
  </div>


  
  {/* Hero Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
        Powered by advanced AI models
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
        AI Text Summarizer
      </h1>

      <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
        Transform long content into intelligent summaries.
        Compare results across multiple AI models.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-base px-6 py-3 rounded-xl bg-white text-black font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Try Summarizing
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>

        <a
          href="#how-it-works"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          See how it works
          <ArrowRight className="w-4 h-4" />
        </a>

      </div>
    </motion.div>

  </div>

</section>
</Parallax>

      {/* Feature Carousel */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What You Can Do
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
              Explore the powerful features of AI Summarizer.
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="p-10 md:p-16"
                >
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <span className="text-xs text-muted-foreground mb-2 block">
                        {String(currentSlide + 1).padStart(2, "0")} / {String(carouselSlides.length).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">{carouselSlides[currentSlide].title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{carouselSlides[currentSlide].desc}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background p-6">
                      <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                        {carouselSlides[currentSlide].preview}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow nav */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {carouselSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlide ? "bg-foreground w-6" : "bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose AI Summarizer
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
              Built for researchers, writers, and professionals who value their time.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 group"
              >
                <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center mb-4 group-hover:bg-foreground/15 transition-colors">
                  <f.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How It Works
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-5xl font-black text-foreground/20">{s.num}</span>
                <h3 className="font-semibold mt-4 mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Compare AI Models
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {supportedModels.map((model, i) => (
              <motion.div
                key={model.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-5 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-6 h-6 text-foreground/70" />
                </div>
                <h4 className="font-semibold mb-1 text-foreground break-all">{model.displayName}</h4>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3 h-3 text-foreground/50" />
                  Available
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-[10px]">AI</span>
            </div>
            <span className="text-sm font-semibold text-foreground">AI Summarizer</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AI Summarizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

