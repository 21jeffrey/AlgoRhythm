// app/components/challenges/MonacoEditor.jsx
'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function MonacoEditor({ language, initialCode = '', onChange, onSubmit }) {
  const [code, setCode] = useState(initialCode);
  

  const handleEditorChange = (value) => {
    setCode(value);
    onChange && onChange(value);
  };


  const handleSubmit = () => {
    if (onSubmit) onSubmit(code);
  };

  useEffect(() => setCode(initialCode), [initialCode]);

  return (
    <div className="space-y-4 flex flex-col h-full">
      <Editor
        height="450px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false }}
      />
      <div className="flex justify-end gap-4">
        <button className="btn bg-violet-700 hover:bg-violet-600 text-white" onClick={handleSubmit}>
          Submit Code
        </button>
      </div>

    </div>
  );
}
