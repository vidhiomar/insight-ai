import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TextInput } from "@/components/TextInput";
import { SummaryOutput } from "@/components/SummaryOutput";
import { motion } from "framer-motion";
import { defaultModelId, summaryTypeMap, supportedModels } from "@/lib/models";

const summaryTypes = ["Short", "Detailed", "Bullet Points", "Key Insights"];

const loadingSteps = [
  "Analyzing text...",
  "Understanding context...",
  "Generating summary...",
];




export default function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [activeType, setActiveType] = useState("Short");
  const [activeModel, setActiveModel] = useState(defaultModelId);

  const handleSubmit = useCallback(async () => {
  if (!inputText.trim()) return;

  setIsLoading(true);
  setSummary("");
  setLoadingStep(loadingSteps[0]);

  let step = 0;
  const interval = setInterval(() => {
    step++;
    if (step < loadingSteps.length) {
      setLoadingStep(loadingSteps[step]);
    }
  }, 800);

  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        summary_type: summaryTypeMap[activeType],
        model: activeModel,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail?.message || data.detail || "Request failed");
    }

    setSummary(data.summary ?? "Something went wrong. Please try again.");

  } catch (error) {
    console.error(error);
    setSummary("Something went wrong. Please try again.");
  } finally {
    clearInterval(interval);
    setIsLoading(false);
  }
}, [activeModel, activeType, inputText]);

  return (
    <DashboardLayout>
      <div className="p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            <select
              value={activeModel}
              onChange={(e) => setActiveModel(e.target.value)}
              className="bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-foreground/20 transition-colors"
            >
              {supportedModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.displayName}
                </option>
              ))}
            </select>
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
            disabled={isLoading}
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
