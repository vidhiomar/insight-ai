import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-foreground" />
          </div>
          <span className="font-bold gradient-text">AI Summarizer</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          <a href="#models" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Models</a>
        </div>

        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gradient flex items-center gap-2 text-sm !px-5 !py-2"
          >
            Try Free <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}
