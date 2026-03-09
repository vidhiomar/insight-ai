import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Clock, Hash } from "lucide-react";

const stats = [
  { label: "Total Summaries", value: "1,284", change: "+12%", icon: BarChart3 },
  { label: "Avg Compression", value: "78%", change: "+3%", icon: TrendingUp },
  { label: "Time Saved", value: "42h", change: "+8h", icon: Clock },
  { label: "Top Keywords", value: "AI, ML", change: "", icon: Hash },
];

const barData = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 72 },
  { label: "Wed", value: 58 },
  { label: "Thu", value: 91 },
  { label: "Fri", value: 67 },
  { label: "Sat", value: 34 },
  { label: "Sun", value: 28 },
];

const keywords = [
  { word: "Artificial Intelligence", count: 156 },
  { word: "Machine Learning", count: 134 },
  { word: "Deep Learning", count: 98 },
  { word: "Neural Networks", count: 87 },
  { word: "NLP", count: 76 },
  { word: "Computer Vision", count: 64 },
];

export default function AnalyticsPage() {
  const maxBar = Math.max(...barData.map((d) => d.value));

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
                {stat.change && (
                  <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                )}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="text-sm font-semibold mb-6">Summaries This Week</h3>
            <div className="flex items-end gap-3 h-48">
              {barData.map((d, i) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / maxBar) * 100}%` }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="w-full rounded-t-md bg-gradient-to-t from-violet-500/80 to-cyan-400/60"
                  />
                  <span className="text-xs text-muted-foreground">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold mb-4">Top Keywords</h3>
            <div className="space-y-3">
              {keywords.map((kw, i) => (
                <div key={kw.word} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{kw.word}</span>
                  <span className="text-xs font-medium">{kw.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
