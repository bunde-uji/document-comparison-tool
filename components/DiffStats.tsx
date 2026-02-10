'use client';

import { useMemo } from 'react';
import { diffLines } from 'diff';

interface DiffStatsProps {
  oldText: string;
  newText: string;
}

export default function DiffStats({ oldText, newText }: DiffStatsProps) {
  const stats = useMemo(() => {
    const diff = diffLines(oldText, newText);
    
    let additions = 0;
    let deletions = 0;
    let changes = 0;

    diff.forEach((part) => {
      if (part.added) {
        additions++;
      } else if (part.removed) {
        deletions++;
      }
    });

    changes = additions + deletions;

    return { additions, deletions, changes };
  }, [oldText, newText]);

  return (
    <div className="flex gap-4 text-sm">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-slate-700">Changes:</span>
        <span className="text-slate-600">{stats.changes}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-green-200 rounded-full"></span>
        <span className="text-green-700 font-medium">{stats.additions} added</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-red-200 rounded-full"></span>
        <span className="text-red-700 font-medium">{stats.deletions} removed</span>
      </div>
    </div>
  );
}