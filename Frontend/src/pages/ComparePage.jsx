import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Cpu, Clock, Star } from "lucide-react";
import { summaryTypeMap, supportedModels } from "@/lib/models";

export default function ComparePage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResults({});
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          summary_type: summaryTypeMap.Short,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail?.message || data.detail || "Request failed");
      }
      setResults(data);
    } catch (error) {
      console.error('Compare error:', error);
    } finally {
      setIsLoading(false);
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {supportedModels.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-foreground" />
                </div>
                <h3 className="font-semibold text-sm text-foreground break-all">{model.displayName}</h3>
              </div>

              <div className="flex-1 rounded-lg bg-background/50 border border-border p-3 mb-4 min-h-[100px]">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 border border-foreground/50 border-t-transparent rounded-full" />
                    Processing...
                  </div>
                ) : results[model.id]?.text ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground leading-relaxed">{results[model.id].text}</motion.p>
                ) : (
                  <p className="text-xs text-muted-foreground/40">Results will appear here</p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{results[model.id]?.time ? `${results[model.id].time}s` : 'N/A'}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3" />N/A</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
