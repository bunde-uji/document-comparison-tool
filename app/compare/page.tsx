'use client';

import { Jost, Geist_Mono } from "next/font/google";

import { useState } from 'react';
import PolicyInput from '@/components/PolicyInput';
import DiffViewer from '@/components/DiffViewer';
import DiffStats from '@/components/DiffStats';
import AISummary from '@/components/AiSummary';
import { exportDiffToPDF, generatePDFFilename } from '@/lib/pdfExport';
import { generateChangeSummary, SummaryResult } from '@/lib/aiSummary';


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function ComparePage() {
  const [oldPolicy, setOldPolicy] = useState('');
  const [newPolicy, setNewPolicy] = useState('');
  const [showDiff, setShowDiff] = useState(false);
  const [splitView, setSplitView] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  
  const [aiSummary, setAiSummary] = useState<SummaryResult | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const handleCompare = () => {
    if (oldPolicy.trim() && newPolicy.trim()) {
      setShowDiff(true);
      handleGenerateSummary();
    }
  };

  const handleReset = () => {
    setOldPolicy('');
    setNewPolicy('');
    setShowDiff(false);
    setAiSummary(null);
    setSummaryError(null);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const filename = generatePDFFilename(oldPolicy, newPolicy);
      await exportDiffToPDF('diff-container', filename);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    setSummaryError(null);
    try {
      const summary = await generateChangeSummary(oldPolicy, newPolicy);
      setAiSummary(summary);
    } catch (error) {
      setSummaryError('Failed to generate summary. Please try again.');
      console.error(error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const canCompare = oldPolicy.trim().length > 0 && newPolicy.trim().length > 0;

  return (
    <main className={`${jost.className} antialiased min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-20`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Document Comparison Tool
          </h1>
          <p className="text-slate-600">
            Compare two versions of a privacy policy to see what changed
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Upload documents (PDF, DOCX, TXT) or paste text directly
          </p>
        </div>

        {!showDiff ? (
          <>
            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <PolicyInput
                label="Original Policy"
                value={oldPolicy}
                onChange={setOldPolicy}
                placeholder="Paste the original privacy policy here..."
              />
              <PolicyInput
                label="Updated Policy"
                value={newPolicy}
                onChange={setNewPolicy}
                placeholder="Paste the updated privacy policy here..."
              />
            </div>

            {/* Compare Button */}
            <div className="flex justify-center">
              <button
                onClick={handleCompare}
                disabled={!canCompare}
                className={`px-8 py-3 cursor-pointer rounded-lg font-semibold transition-all shadow-lg
                         ${canCompare
                           ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
                           : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                         }`}
              >
                {canCompare ? 'Compare Policies' : 'Upload or paste both policies to compare'}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
              <div className="flex gap-4 items-center flex-wrap">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 cursor-pointer bg-slate-200 text-slate-700 rounded-lg 
                           hover:bg-slate-300 transition-colors font-medium"
                >
                  ← New Comparison
                </button>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">View:</label>
                  <button
                    onClick={() => setSplitView(!splitView)}
                    className="px-3 py-1 cursor-pointer bg-slate-100 text-slate-700 rounded 
                             hover:bg-slate-200 transition-colors text-sm font-medium"
                  >
                    {splitView ? '⬌ Split' : '☰ Unified'}
                  </button>
                </div>

                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className={`inline-flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg font-medium
                           transition-colors text-sm
                           ${isExporting 
                             ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                             : 'bg-green-100 text-green-700 hover:bg-green-200'
                           }`}
                >
                  {isExporting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </>
                  )}
                </button>

                {/* Regenerate Summary Button */}
                {!isGeneratingSummary && aiSummary && (
                  <button
                    onClick={handleGenerateSummary}
                    className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg font-medium
                             transition-colors text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Regenerate Summary
                  </button>
                )}
              </div>

              <DiffStats oldText={oldPolicy} newText={newPolicy} />
            </div>

            {isGeneratingSummary && (
              <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 mb-6 text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-600 font-medium">Generating AI summary...</p>
                <p className="text-sm text-slate-500 mt-1">Analyzing key changes</p>
              </div>
            )}

            {summaryError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-red-800 font-medium">{summaryError}</p>
                  <button
                    onClick={handleGenerateSummary}
                    className="text-sm text-red-700 cursor-pointer underline mt-1 hover:text-red-900"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {aiSummary && !isGeneratingSummary && (
              <AISummary summary={aiSummary} />
            )}

            <DiffViewer
              oldText={oldPolicy}
              newText={newPolicy}
              splitView={splitView}
            />
          </>
        )}

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>Built to help users understand privacy policy changes</p>
          <p className="mt-1 text-xs">All processing happens in your browser - your documents never leave your device</p>
        </footer>
      </div>
    </main>
  );
}