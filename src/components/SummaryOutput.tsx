import { Copy, Download, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface SummaryOutputProps {
  summary: string;
  isLoading: boolean;
  loadingStep: string;
  onRegenerate: () => void;
}

export function SummaryOutput({ summary, isLoading, loadingStep, onRegenerate }: SummaryOutputProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Summary Output</h3>
        {summary && (
          <div className="flex items-center gap-1">
            <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Copy">
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={handleDownload} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Download">
              <Download className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={onRegenerate} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Regenerate">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 rounded-xl border border-border bg-secondary/50 p-4 overflow-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-foreground"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            <motion.p
              key={loadingStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-foreground"
            >
              {loadingStep}
            </motion.p>
          </div>
        ) : summary ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap"
          >
            {summary}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-3">
              <span className="text-muted-foreground/30 text-lg">✦</span>
            </div>
            <p className="text-sm text-muted-foreground/50">
              Your AI-generated summary will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
