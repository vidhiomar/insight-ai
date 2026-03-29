import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { defaultModelId, supportedModels } from "@/lib/models";

export default function SettingsPage() {
  const [summaryType, setSummaryType] = useState("short");
  const [language, setLanguage] = useState("en");
  const [model, setModel] = useState(defaultModelId);

  const handleSave = () => toast.success("Settings saved!");

  const selectClass = "w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-foreground/20 transition-colors";

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Settings</h1>

        <div className="space-y-6">
          <div className="glass-card p-6 space-y-5">
            <h3 className="font-semibold text-sm text-foreground">Preferences</h3>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Default Summary Type</label>
              <select value={summaryType} onChange={(e) => setSummaryType(e.target.value)} className={selectClass}>
                <option value="short">Short</option>
                <option value="detailed">Detailed</option>
                <option value="bullets">Bullet Points</option>
                <option value="insights">Key Insights</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={selectClass}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Default Model</label>
              <select value={model} onChange={(e) => setModel(e.target.value)} className={selectClass}>
                {supportedModels.map((supportedModel) => (
                  <option key={supportedModel.id} value={supportedModel.id}>
                    {supportedModel.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="btn-mono text-sm"
          >
            Save Settings
          </motion.button>
        </div>
      </div>
    </DashboardLayout>
  );
}
