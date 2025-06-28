// app/challenges/[id]/attempt/page.jsx
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SubproblemInfo from '@/app/components/challenges/SubproblemInfo';
import MonacoEditor from '@/app/components/challenges/MonacoEditor';
import Cookies from 'js-cookie';

export default function AttemptPage() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [subproblems, setSubproblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedTab, setSelectedTab] = useState('description');
  const [showHint, setShowHint] = useState(false);
  const [userCode, setUserCode] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchChallengeData = async () => {
      try {
        const [cRes, spRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${id}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${id}/subproblems`)
        ]);
        setChallenge(cRes.data);
        setSubproblems(spRes.data);
      } catch (error) {
        console.error('Failed to load challenge data:', error);
        toast.error('Failed to load challenge data');
      }
    };

    const fetchUser = async () => {
      try {
        const token = Cookies.get('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch {
        toast.error('Not authenticated');
      }
    };

    fetchChallengeData();
    fetchUser();
  }, [id]);

  useEffect(() => {
    setShowHint(false);
    setFeedback(null);
    fetchSubmissionHistory();
  }, [currentIndex]);

  useEffect(() => {
    setUserCode(currentSub?.starter_code || '');
  }, [currentSub]);

  const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, subproblems.length - 1));

  if (!challenge) return <p className="p-6">Loading challenge...</p>;
  if (!subproblems.length) return <p className="p-6">No subproblems found.</p>;

  const currentSub = subproblems[currentIndex];

  return (
    <div className="flex h-screen">
      <SubproblemInfo
        subproblem={currentSub}
        currentIndex={currentIndex}
        total={subproblems.length}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        showHint={showHint}
        toggleHint={toggleHint}
        feedback={feedback}
        submissionHistory={submissionHistory}
        isLoadingHistory={isLoadingHistory}
        isProcessing={isProcessing}
        currentSubmissionId={currentSubmissionId}
        // Pass navigation handlers
        onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
        onNext={() => setCurrentIndex((i) => Math.min(i + 1, subproblems.length - 1))}
        disablePrev={currentIndex === 0}
        disableNext={currentIndex === subproblems.length - 1}
      />

      <div className="w-full lg:w-[60%] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <label className="font-semibold mr-2">Language:</label>
            <select
              className="select select-sm select-bordered"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
            </select>
          </div>
          {/* Removed Previous/Next buttons from here */}
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
}
