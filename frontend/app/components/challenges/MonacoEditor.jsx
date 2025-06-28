'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const MonacoEditor = ({ language = 'python', initialCode = '', onChange }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');

  const handleEditorChange = (value) => {
    setCode(value);
    if (onChange) onChange(value);
  };

  const handleRunCode = () => {
    setOutput(`Running ${language} code...\n\n${code}`);
  };

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  return (
    <div className="space-y-4">
      <Editor
        height="300px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />

      <div className="flex gap-4">
        <button
          className="btn  bg-violet-700 hover:bg-violet-600 text-white"
          onClick={handleRunCode}
        >
          Run Code
        </button>

        <button
          className="btn bg-violet-700 hover:bg-violet-600 text-white"
          onClick={handleRunCode}
        >
          Submit Code
        </button>
      </div>

      <div className="bg-base-200 p-4 rounded whitespace-pre-wrap text-sm">
        <strong>Output Preview:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default MonacoEditor;

