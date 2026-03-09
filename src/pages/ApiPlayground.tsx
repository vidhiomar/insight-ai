import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Play, Copy } from "lucide-react";
import { toast } from "sonner";

const defaultRequest = `{
  "text": "Artificial intelligence has transformed industries from healthcare to finance. Machine learning models can now process vast datasets to identify patterns that humans might miss.",
  "type": "short",
  "model": "gpt-4"
}`;

const mockResponse = `{
  "summary": "AI is transforming healthcare and finance through ML-powered pattern recognition in large datasets.",
  "model": "gpt-4",
  "tokens_used": 142,
  "processing_time": "1.8s"
}`;

export default function ApiPlayground() {
  const [request, setRequest] = useState(defaultRequest);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = () => {
    setIsLoading(true);
    setResponse("");
    setTimeout(() => {
      setResponse(mockResponse);
      setIsLoading(false);
    }, 1500);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <DashboardLayout>
      <div className="p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">API Playground</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded bg-foreground/10 text-foreground/70 font-mono">POST</span>
            <span className="font-mono">/api/summarize</span>
          </div>
        </div>

        <div className="flex-1 grid md:grid-cols-2 gap-6 min-h-0">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Request</h3>
              <div className="flex gap-1">
                <button onClick={() => copyCode(request)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRun}
                  disabled={isLoading}
                  className="btn-mono !px-3 !py-1.5 text-xs flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Play className="w-3 h-3" /> {isLoading ? "Running..." : "Run"}
                </motion.button>
              </div>
            </div>
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="flex-1 bg-secondary/50 border border-border rounded-xl p-4 font-mono text-xs text-muted-foreground resize-none focus:outline-none focus:border-foreground/20"
              spellCheck={false}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Response</h3>
              {response && (
                <button onClick={() => copyCode(response)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
            <div className="flex-1 bg-secondary/50 border border-border rounded-xl p-4 font-mono text-xs overflow-auto">
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 border border-foreground/50 border-t-transparent rounded-full" />
                  Executing...
                </div>
              ) : response ? (
                <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-foreground/70 whitespace-pre-wrap">
                  {response}
                </motion.pre>
              ) : (
                <span className="text-muted-foreground/40">Response will appear here</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
