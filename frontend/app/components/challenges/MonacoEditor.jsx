// app/components/challenges/MonacoEditor.jsx
'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

<<<<<<< HEAD
export default function MonacoEditor({ language, initialCode = '', onChange, onSubmit }) {
=======
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const MonacoEditor = ({ language = 'python', initialCode = '', onChange }) => {
>>>>>>> 09c79a52065076a8c987f3a38bfdaf56d318077d
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
<<<<<<< HEAD
    <div className="space-y-4 flex flex-col h-full">
      <Editor
        height="450px"
=======
    <div className="space-y-4">
      <Editor
        height="300px"
>>>>>>> 09c79a52065076a8c987f3a38bfdaf56d318077d
        language={language}
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
<<<<<<< HEAD
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
=======
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

>>>>>>> 09c79a52065076a8c987f3a38bfdaf56d318077d
