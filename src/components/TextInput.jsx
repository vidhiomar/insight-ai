import { useState } from "react";
import { Upload, FileText } from "lucide-react";

export function TextInput({ value, onChange, onSubmit, isLoading }) {
  const [isDragging, setIsDragging] = useState(false);
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (ev) => onChange(ev.target?.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4 text-foreground" />
          Input Text
        </h3>
        <span className="text-xs text-muted-foreground">
          {wordCount} words · {charCount} chars
        </span>
      </div>

      <div
        className={`flex-1 relative rounded-xl border transition-colors ${
          isDragging ? "border-foreground bg-foreground/5" : "border-border bg-secondary/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your text here, or drag & drop a .txt file..."
          className="w-full h-full resize-none bg-transparent p-4 text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
        />
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 rounded-xl border-2 border-dashed border-foreground/30">
            <div className="flex flex-col items-center gap-2 text-foreground">
              <Upload className="w-8 h-8" />
              <span className="text-sm font-medium">Drop file here</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="btn-mono mt-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? "Summarizing..." : "Generate Summary"}
      </button>
    </div>
  );
}
