import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SummaryCard } from "@/components/SummaryCard";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const mockHistory = [
  { id: 1, title: "AI in Healthcare", preview: "Artificial intelligence is revolutionizing healthcare through improved diagnostics, personalized treatments, and drug discovery acceleration.", date: "Mar 8, 2026", wordCount: 45 },
  { id: 2, title: "Climate Change Report", preview: "Global temperatures continue to rise with significant impacts on ecosystems, weather patterns, and sea levels across all continents.", date: "Mar 7, 2026", wordCount: 62 },
  { id: 3, title: "Quantum Computing", preview: "Quantum computers leverage quantum mechanical phenomena to solve problems that are intractable for classical computers.", date: "Mar 6, 2026", wordCount: 38 },
  { id: 4, title: "Space Exploration", preview: "Recent advances in reusable rocket technology have dramatically reduced the cost of space access, enabling new commercial opportunities.", date: "Mar 5, 2026", wordCount: 51 },
  { id: 5, title: "Blockchain Technology", preview: "Decentralized ledger technology continues to find new applications beyond cryptocurrency in supply chain, identity, and governance.", date: "Mar 4, 2026", wordCount: 44 },
  { id: 6, title: "Neural Networks", preview: "Deep learning architectures have achieved superhuman performance in image recognition, natural language processing, and strategic games.", date: "Mar 3, 2026", wordCount: 55 },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(mockHistory);

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setItems(items.filter((i) => i.id !== id));
    toast.success("Summary deleted");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">History</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search summaries..."
              className="pl-9 pr-4 py-2 text-sm bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-foreground/20 transition-colors"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SummaryCard
                title={item.title}
                preview={item.preview}
                date={item.date}
                wordCount={item.wordCount}
                onDelete={() => handleDelete(item.id)}
                onOpen={() => toast.info("Opening summary...")}
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>No summaries found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
