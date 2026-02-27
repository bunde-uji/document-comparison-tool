'use client';

import { useMemo } from 'react';
import { diffWords, diffLines, Change } from 'diff';

interface InlineDiffViewerProps {
  oldText: string;
  newText: string;
  viewMode?: 'words' | 'lines';
  showLegend?: boolean;
}

export default function InlineDiffViewer({ 
  oldText, 
  newText, 
  viewMode = 'words',
  showLegend = true 
}: InlineDiffViewerProps) {
  
  const changes = useMemo(() => {
    if (viewMode === 'words') {
      return diffWords(oldText, newText);
    } else {
      return diffLines(oldText, newText);
    }
  }, [oldText, newText, viewMode]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    changes.forEach(change => {
      if (change.added) added++;
      else if (change.removed) removed++;
      else unchanged++;
    });

    return { added, removed, unchanged };
  }, [changes]);

  const renderChange = (change: Change, index: number) => {
    if (change.added) {
      return (
        <span
          key={index}
          className="bg-green-50 text-green-900 border-b-2 border-green-500 px-1 rounded-sm
                     hover:bg-green-100 transition-colors"
          title="Added text"
        >
          {change.value}
        </span>
      );
    }

    if (change.removed) {
      return (
        <span
          key={index}
          className="bg-red-50 text-red-900 line-through decoration-red-600 decoration-2 px-1 rounded-sm
                     hover:bg-red-100 transition-colors"
          title="Removed text"
        >
          {change.value}
        </span>
      );
    }

    return (
      <span key={index} className="text-slate-700">
        {change.value}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
      {/* Header with Legend and Stats */}
      {showLegend && (
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Legend */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-50 border-b-2 border-green-500 rounded flex items-center justify-center">
                  <span className="text-green-700 text-xs font-bold">+</span>
                </div>
                <span className="text-slate-700 font-medium">Added</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-50 rounded flex items-center justify-center relative">
                  <span className="text-red-700 text-xs font-bold line-through decoration-red-600 decoration-2">−</span>
                </div>
                <span className="text-slate-700 font-medium">Removed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-100 border border-slate-300 rounded"></div>
                <span className="text-slate-700 font-medium">Unchanged</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="text-green-700 font-semibold">
                +{stats.added} added
              </div>
              <div className="text-red-700 font-semibold">
                −{stats.removed} removed
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diff Content */}
      <div className="p-8">
        <div className="prose prose-slate max-w-none">
          <div 
            className="whitespace-pre-wrap leading-relaxed text-[15px]"
            style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif' }}
          >
            {changes.map((change, index) => renderChange(change, index))}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-500 text-center">
        Viewing {viewMode === 'words' ? 'word-level' : 'line-level'} changes
      </div>
    </div>
  );
}
