'use client';

import { useState, useEffect } from 'react';
import { parseDocument, formatFileSize } from '@/lib/documentParser';

interface PolicyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function PolicyInput({ label, value, onChange, placeholder }: PolicyInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setUploadedFileName(null);

    try {
      const text = await parseDocument(file);
      onChange(text);
      setUploadedFileName(`${file.name} (${formatFileSize(file.size)})`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse document');
      onChange(''); 
    } finally {
      setIsLoading(false);
      e.target.value = '';
    }
  };

  const handleClear = () => {
    onChange('');
    setUploadedFileName(null);
    setError(null);
  };

  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-slate-800 mb-2">
        {label}
      </label>
      
      {/* File Upload Button */}
      <div className="mb-3 flex items-center gap-3">
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isLoading}
          />
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                        transition-colors border font-medium text-sm
                        ${isLoading 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' 
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200'
                        }`}>
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Document
              </>
            )}
          </div>
        </label>
        <span className="text-xs text-slate-500">
          PDF, DOCX, or TXT (max 5MB)
        </span>
      </div>

      {/* Uploaded File Name */}
      {uploadedFileName && (
        <div className="mb-2 flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-green-700 font-medium">
              {uploadedFileName}
            </span>
          </div>
          <button
            onClick={handleClear}
            className="text-green-600 cursor-pointer hover:text-green-800 text-sm underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      <div className="text-sm text-slate-600 mb-2 font-medium">
        Or paste text below:
      </div>

      {/* Text Area */}
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setUploadedFileName(null);
        }}
        placeholder={placeholder}
        disabled={isLoading}
        className={`w-full h-80 p-4 border-2 rounded-lg resize-none
                 font-mono text-sm text-slate-800 bg-white shadow-sm transition-colors
                 ${isLoading 
                   ? 'border-slate-200 bg-slate-50 cursor-not-allowed' 
                   : 'border-slate-300 focus:border-blue-500 focus:outline-none'
                 }`}
      />
      
      {/* Character Count */}
      <div className="flex justify-between items-center mt-1">
        <div className="text-xs text-slate-500">
          {value.length.toLocaleString()} characters
        </div>
        {value.length > 0 && !uploadedFileName && (
          <button
            onClick={handleClear}
            className="text-xs text-slate-500 cursor-pointer hover:text-slate-700 underline"
          >
            Clear text
          </button>
        )}
      </div>
    </div>
  );
}