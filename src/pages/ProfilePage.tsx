import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { User, BarChart3, FileText, Code2 } from "lucide-react";

const usageStats = [
  { label: "Summaries Generated", value: "1,284", icon: FileText },
  { label: "API Calls", value: "3,471", icon: Code2 },
  { label: "Compression Ratio", value: "78%", icon: BarChart3 },
];

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="glass-card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center">
              <User className="w-8 h-8 text-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg">John Doe</h2>
              <p className="text-sm text-muted-foreground">john@example.com</p>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Pro Plan</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {usageStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 text-center"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-sm mb-4">Account Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Member since</span>
              <span>January 2026</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Plan</span>
              <span className="text-primary">Pro</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">API Key</span>
              <span className="font-mono text-xs">sk-••••••••••4f2a</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
