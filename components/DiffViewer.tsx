'use client';

import ReactDiffViewer from 'react-diff-viewer-continued';

interface DiffViewerProps {
  oldText: string;
  newText: string;
  splitView: boolean;
}

export default function DiffViewer({ oldText, newText, splitView }: DiffViewerProps) {
  return (
    <div 
      id="diff-container" // ← Add this ID
      className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200"
    >
      <ReactDiffViewer
        oldValue={oldText}
        newValue={newText}
        splitView={splitView}
        useDarkTheme={false}
        leftTitle="Original Policy"
        rightTitle="Updated Policy"
        styles={{
          variables: {
            light: {
              diffViewerBackground: '#ffffff',
              addedBackground: '#e6ffec',
              addedColor: '#24292e',
              removedBackground: '#ffebe9',
              removedColor: '#24292e',
              wordAddedBackground: '#acf2bd',
              wordRemovedBackground: '#fdb8c0',
              addedGutterBackground: '#cdffd8',
              removedGutterBackground: '#ffdce0',
              gutterBackground: '#f6f8fa',
              gutterBackgroundDark: '#f3f4f6',
              highlightBackground: '#fffbdd',
              highlightGutterBackground: '#fff5b1',
            },
          },
          line: {
            padding: '10px 2px',
            fontSize: '14px',
          },
        }}
      />
    </div>
  );
}