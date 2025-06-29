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
    <div className="space-y-4 flex flex-col h-full bg-gray">
        <div className="flex justify-between gap-4">
        <h1 className='text-white text-2xl font-bold'>Write Your Code here</h1>  
        <button className="px-4 py-2 rounded bg-violet-700 hover:bg-violet-600 text-white font-semibold transition" onClick={handleSubmit}>
          Submit Code
        </button>
      </div>
      <Editor 
        height="100%"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false }}
      />


    </div>
  );
}
