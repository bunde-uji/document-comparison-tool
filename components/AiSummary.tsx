'use client';

import { SummaryResult } from '@/lib/aiSummary';

interface AISummaryProps {
  summary: SummaryResult;
}

export default function AISummary({ summary }: AISummaryProps) {
  const riskColors = {
    low: 'bg-green-50 border-green-200 text-green-800',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    high: 'bg-red-50 border-red-200 text-red-800',
  };

  const riskLabels = {
    low: '✓ Low Impact',
    medium: '⚠ Medium Impact',
    high: '⚠ High Impact',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-900">Summary</h3>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${riskColors[summary.riskLevel]}`}>
          {riskLabels[summary.riskLevel]}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-slate-700 leading-relaxed">
          {summary.summary}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Changes:</h4>
        <ul className="space-y-2">
          {summary.keyChanges.map((change, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-slate-700 text-sm">{change}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 italic">
          AI-generated summary. Always review the full comparison for accuracy.
        </p>
      </div>
    </div>
  );
}