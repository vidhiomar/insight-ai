import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Cpu, Clock, Star } from "lucide-react";

const models = [
  { name: "GPT-4", speed: "2.1s", quality: 4.8 },
  { name: "LLaMA 3", speed: "1.8s", quality: 4.5 },
  { name: "Gemini Pro", speed: "1.5s", quality: 4.6 },
  { name: "Mistral", speed: "1.3s", quality: 4.3 },
];

const mockResults: Record<string, string> = {
  "GPT-4": "AI is rapidly transforming industries through advanced machine learning, enabling unprecedented pattern recognition and natural language understanding capabilities.",
  "LLaMA 3": "Artificial intelligence leverages ML to transform industries, with NLP reaching near-human performance in text comprehension and generation tasks.",
  "Gemini Pro": "The AI revolution spans healthcare to finance, with deep learning models processing vast datasets for pattern identification and language understanding.",
  "Mistral": "Modern AI systems excel at data-driven pattern recognition and language tasks, driving transformation across healthcare, finance, and technology sectors.",
};

export default function ComparePage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Compare Models</h1>

        <div className="glass-card p-4 mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to compare across models..."
            className="w-full bg-transparent resize-none text-sm p-2 focus:outline-none min-h-[80px]"
          />
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCompare}
              disabled={isLoading || !input.trim()}
              className="btn-mono text-sm !px-5 !py-2 disabled:opacity-40"
            >
              {isLoading ? "Comparing..." : "Compare All"}
            </motion.button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-foreground" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{model.name}</h3>
              </div>

              <div className="flex-1 rounded-lg bg-background/50 border border-border p-3 mb-4 min-h-[100px]">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 border border-foreground/50 border-t-transparent rounded-full" />
                    Processing...
                  </div>
                ) : results[model.name] ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground leading-relaxed">{results[model.name]}</motion.p>
                ) : (
                  <p className="text-xs text-muted-foreground/40">Results will appear here</p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{model.speed}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3" />{model.quality}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
