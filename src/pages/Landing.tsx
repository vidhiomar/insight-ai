import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Zap,
  Brain,
  Shield,
  ArrowRight,
  FileText,
  Cpu,
  CheckCircle2,
} from "lucide-react";

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-8">
              <Sparkles className="w-3 h-3 text-primary" />
              Powered by advanced AI models
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Turn Long Text Into{" "}
              <span className="gradient-text">Intelligent Summaries</span>{" "}
              with AI
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Paste any article, paper, or document and get precise, context-aware summaries instantly. Compare results across multiple AI models.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-gradient flex items-center gap-2 text-base"
                >
                  Try AI Summarizer <ArrowRight className="w-5 h-5" />
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
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Live Demo</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-background/50 p-4 border border-border">
                <p className="text-xs text-muted-foreground/60 mb-2">Input</p>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  Artificial intelligence has transformed industries from healthcare to finance. Machine learning models can now process vast datasets to identify patterns that humans might miss. Natural language processing enables computers to understand and generate human-like text...
                </p>
              </div>
              <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                <p className="text-xs text-primary mb-2">Summary</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AI is revolutionizing multiple industries through ML pattern recognition and NLP capabilities, enabling automated text understanding and generation at scale.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">AI Summarizer</span>
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
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
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
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
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
                <span className="text-5xl font-black gradient-text">{s.num}</span>
                <h3 className="font-semibold mt-4 mb-2">{s.title}</h3>
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
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
              Compare <span className="gradient-text">AI Models</span>
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
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{model}</h4>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
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
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-foreground" />
            </div>
            <span className="text-sm font-semibold gradient-text">AI Summarizer</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AI Summarizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
