
import { useState } from 'react';
import { TextInput } from '../components/TextInput.jsx';
import { SummaryOutput } from '../components/SummaryOutput.jsx';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [summaryType, setSummaryType] = useState('short');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          summary_type: summaryType,
          model: 'facebook/bart-large-cnn'
        }),
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      // Optional: setSummary('Error generating summary');
    } finally {
      setLoading(false);
    }
  };

  const onRegenerate = () => {
    generateSummary();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-6">
            AI Text Summarizer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform long text into concise, actionable insights with AI-powered summarization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <div className="space-y-6">
            <label className="text-lg font-semibold text-white">Paste your text</label>
            <TextInput
              value={inputText}
              onChange={setInputText}
              onSubmit={generateSummary}
              placeholder="Paste your text here, or drag & drop a .txt file..."
            />
          </div>

          {/* Controls & Output */}
          <div className="space-y-6 lg:pl-8">
            {/* Controls - Exactly as requested */}
            <div className="flex gap-4 items-end">
              <select
                value={summaryType}
                onChange={(e) => setSummaryType(e.target.value)}
                className="bg-black border border-gray-700 px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="short">Short</option>
                <option value="detailed">Detailed</option>
                <option value="bullet">Bullet Points</option>
                <option value="insights">Key Insights</option>
              </select>

              <button
                onClick={generateSummary}
                disabled={loading || !inputText.trim()}
                className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>

            {/* Summary Output with Loading - Exactly as requested */}
            {loading ? (
              <SummaryOutput
                summary={null}
                isLoading={true}
                loadingStep="Generating summary..."
                onRegenerate={onRegenerate}
              />
            ) : (
              <SummaryOutput
                summary={summary}
                isLoading={false}
                loadingStep=""
                onRegenerate={onRegenerate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

