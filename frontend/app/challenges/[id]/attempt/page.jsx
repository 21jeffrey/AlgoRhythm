'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import MonacoEditor from '@/app/components/challenges/MonacoEditor';
import { ChatBubbleLeftRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const AttemptPage = () => {
  const { id } = useParams(); // Challenge ID
  const [challenge, setChallenge] = useState(null);
  const [subproblems, setSubproblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedTab, setSelectedTab] = useState('description');
  const [showHint, setShowHint] = useState(false);
  const [userCode, setUserCode] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const challengeRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${id}`);
        const subproblemsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${id}/subproblems`);
        setChallenge(challengeRes.data);
        setSubproblems(subproblemsRes.data);
      } catch (err) {
        toast.error('Failed to load challenge data');
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setShowHint(false);
  }, [currentIndex]);

  useEffect(() => {
    setUserCode(currentSub?.starter_code || '');
  }, [currentSub]);

  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, subproblems.length - 1));

  if (!challenge) return <p className="p-6">Loading challenge...</p>;
  if (subproblems.length === 0) return <p className="p-6">No subproblems found.</p>;

  const currentSub = subproblems[currentIndex];

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Left Sidebar */}
      <div className="w-full lg:w-[40%] p-4 bg-base-200 border-r overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
        <p className="text-gray-600 mb-4">{challenge.description}</p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Subproblem {currentIndex + 1} of {subproblems.length}
          </span>
          <div className="space-x-2">
            <button className="btn btn-sm btn-outline" onClick={handlePrev} disabled={currentIndex === 0}>
              Previous
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={handleNext}
              disabled={currentIndex === subproblems.length - 1}
            >
              Next
            </button>
          </div>
        </div>

{/* Tabs */}
<div className="tabs tabs-boxed text-violet-700 mb-4">
  {[
    { key: 'description', label: 'Description', icon: <DocumentTextIcon className="w-4 h-4 mr-1" /> },
    { key: 'feedback', label: 'Feedback', icon: <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" /> },
  ].map((tab) => (
    <a
      key={tab.key}
      className={`tab flex items-center ${selectedTab === tab.key ? 'tab-active' : ''}`}
      onClick={() => setSelectedTab(tab.key)}
    >
      {tab.icon}
      {tab.label}
    </a>
  ))}
</div>

        <div className="mt-3">
          {selectedTab === 'description' && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">{currentSub.title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{currentSub.description}</p>

              <div>
                <h3 className="font-semibold mt-3">Expected Output:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{currentSub.expected_output}</p>
              </div>

              <div>
                <h3 className="font-semibold mt-3">Test Cases:</h3>
                <ul className="list-disc pl-5 text-sm">
                  {Array.isArray(currentSub.test_cases)
                    ? currentSub.test_cases.map((test, index) => (
                        <li key={index} className="text-gray-700 whitespace-pre-wrap mb-1">
                          <strong>Input:</strong> {test.input} <br />
                          <strong>Output:</strong> {test.output}
                        </li>
                      ))
                    : JSON.parse(currentSub.test_cases || '[]').map((test, index) => (
                        <li key={index} className="text-gray-700 whitespace-pre-wrap mb-1">
                          <strong>Input:</strong> {test.input} <br />
                          <strong>Output:</strong> {test.output}
                        </li>
                      ))}
                </ul>
              </div>

              {currentSub.hint && (
                <div className="mt-4">
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => setShowHint((prev) => !prev)}
                  >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  {showHint && (
                    <p className="mt-2 text-sm italic text-purple-700">
                      Hint: {currentSub.hint}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {selectedTab === 'feedback' && (
            <p className="text-gray-500 italic mt-2">Feedback and tips will be available here.</p>
          )}
        </div>
      </div>

      {/* Right Editor */}
      <div className="w-full lg:w-[60%] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <label className="font-semibold mr-2">Language:</label>
            <select
              className="select select-sm select-bordered"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <MonacoEditor 
            language={selectedLanguage} 
            initialCode={userCode}
            onChange={setUserCode}
          />
        </div>
      </div>
    </div>
  );
};

export default AttemptPage;
