import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TextInput } from "@/components/TextInput";
import { SummaryOutput } from "@/components/SummaryOutput";
import { motion } from "framer-motion";

const summaryTypes = ["Short", "Detailed", "Bullet Points", "Key Insights"];

const loadingSteps = [
  "Analyzing text...",
  "Understanding context...",
  "Generating summary...",
];

const mockSummaries = {
  Short: "AI is rapidly transforming industries through machine learning, enabling pattern recognition in large datasets and natural language understanding at unprecedented scale.",
  Detailed: "Artificial intelligence has become a cornerstone of modern technology, driving innovation across healthcare, finance, and education. Machine learning algorithms process vast datasets to identify patterns that would be impossible for humans to detect manually. Natural language processing has advanced to the point where computers can understand context, generate human-like text, and translate between languages with high accuracy. These developments are creating new opportunities while also raising important ethical questions about privacy, bias, and the future of work.",
  "Bullet Points": "• AI is transforming healthcare, finance, and education\n• ML algorithms identify patterns in large datasets\n• NLP enables human-like text understanding and generation\n• Raises ethical questions about privacy and bias\n• Creating new job opportunities while disrupting existing ones",
  "Key Insights": "Key Insight 1: AI adoption is accelerating across all major industries\nKey Insight 2: Pattern recognition at scale is the primary value driver\nKey Insight 3: NLP has reached near-human performance levels\nKey Insight 4: Ethical considerations remain the biggest challenge",
};

export default function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [activeType, setActiveType] = useState("Short");

  const handleSubmit = useCallback(() => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setSummary("");

    let step = 0;
    setLoadingStep(loadingSteps[0]);
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setLoadingStep(loadingSteps[step]);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      setSummary(mockSummaries[activeType]);
    }, 3000);
  }, [inputText, activeType]);

  return (
    <DashboardLayout>
      <div className="p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            {summaryTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                  activeType === type
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex-1 grid md:grid-cols-2 gap-6 min-h-0">
          <TextInput
            value={inputText}
            onChange={setInputText}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <SummaryOutput
            summary={summary}
            isLoading={isLoading}
            loadingStep={loadingStep}
            onRegenerate={handleSubmit}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
