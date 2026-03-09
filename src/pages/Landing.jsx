import { motion, AnimatePresence } from "framer-motion";
// react-parallax-mouse exports MouseParallaxContainer/Child
// Landing used to import `Parallax` which was undefined causing render errors.
// we alias the container to Parallax for backwards compatibility.
import { MouseParallaxContainer as Parallax } from "react-parallax-mouse";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Zap,
  Brain,
  Shield,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Get summaries in seconds with our optimized AI pipeline." },
  { icon: Brain, title: "Context-Aware", desc: "Understands nuance, tone, and key arguments in your text." },
  { icon: Shield, title: "Private & Secure", desc: "Your data is encrypted and never stored without permission." },
  { icon: Cpu, title: "Multi-Model", desc: "Compare results from GPT, LLaMA, Gemini, and Mistral." },
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
    desc: "Compare outputs from GPT-4, LLaMA, Gemini, and Mistral side by side.",
    preview: "GPT-4 vs LLaMA vs Gemini vs Mistral",
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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      {/* alias Parallax now refers to MouseParallaxContainer */}
      <Parallax strength={0.05}>
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Floating elements */}
          <motion.div
            className="absolute top-40 left-[10%] w-1 h-1 rounded-full bg-foreground/20"
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-60 right-[15%] w-1.5 h-1.5 rounded-full bg-foreground/15"
            animate={{ y: [0, -15, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-80 left-[25%] w-px h-px bg-foreground/30"
            animate={{ y: [0, -25, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
              Powered by advanced AI models
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
              AI Text Summarizer
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Transform long content into intelligent summaries. Compare results across multiple AI models.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-mono flex items-center gap-2 text-base"
                >
                  Try Summarizing <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                See how it works <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Demo card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-16 glass-card p-6 max-w-3xl mx-auto text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-foreground/60" />
              <span className="text-xs font-medium text-muted-foreground">Live Demo</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-background/50 p-4 border border-border">
                <p className="text-xs text-muted-foreground/60 mb-2">Input</p>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  Artificial intelligence has transformed industries from healthcare to finance. Machine learning models can now process vast datasets to identify patterns that humans might miss...
                </p>
              </div>
              <div className="rounded-lg bg-foreground/5 p-4 border border-border">
                <p className="text-xs text-foreground/60 mb-2">Summary</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AI is revolutionizing multiple industries through ML pattern recognition and NLP capabilities, enabling automated text understanding and generation at scale.
                </p>
              </div>
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
            {["GPT-4", "LLaMA 3", "Gemini Pro", "Mistral"].map((model, i) => (
              <motion.div
                key={model}
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
                <h4 className="font-semibold mb-1 text-foreground">{model}</h4>
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
