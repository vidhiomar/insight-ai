import { motion } from "framer-motion";
import { Clock, Trash2, ExternalLink } from "lucide-react";

interface SummaryCardProps {
  title: string;
  preview: string;
  date: string;
  wordCount: number;
  onDelete?: () => void;
  onOpen?: () => void;
}

export function SummaryCard({ title, preview, date, wordCount, onDelete, onOpen }: SummaryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-card p-5 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-sm truncate flex-1 mr-2">{title}</h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onOpen && (
            <button onClick={onOpen} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-destructive/20 transition-colors">
              <Trash2 className="w-3.5 h-3.5 text-destructive" />
            </button>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed">{preview}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{date}</span>
        <span>{wordCount} words</span>
      </div>
    </motion.div>
  );
}
