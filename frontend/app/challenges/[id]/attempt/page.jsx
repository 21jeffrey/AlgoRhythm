// app/challenges/[id]/attempt/page.jsx
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SubproblemInfo from '@/app/components/challenges/SubproblemInfo';
import MonacoEditor from '@/app/components/challenges/MonacoEditor';
import Cookies from 'js-cookie';

const LANGUAGE_OPTIONS = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  // Add more languages as needed
];

export default function AttemptPage() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [subproblems, setSubproblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedTab, setSelectedTab] = useState('description');
  const [showHint, setShowHint] = useState(false);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

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

  const fetchSubmissionHistory = useCallback(async () => {
    if (!user || !subproblems.length) return;
    setIsLoadingHistory(true);
    try {
      const token = Cookies.get('token');
      const currentSub = subproblems[currentIndex];
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/submissions/mine?subproblem_id=${currentSub.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmissionHistory(res.data);
    } catch (err) {
      toast.error('Failed to load submission history');
      console.error(err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user, subproblems, currentIndex]);

  useEffect(() => {
    fetchSubmissionHistory();
  }, [fetchSubmissionHistory]);

  const handleSubmit = async (code) => {
    if (!user) {
      toast.error('Please log in to submit.');
      return;
    }

    try {
      setIsProcessing(true);
      setFeedback(null);
      const token = Cookies.get('token');
      const currentSub = subproblems[currentIndex];

      if (!code || code.trim() === '') {
        toast.error('Please enter  code before submitting.');
        setIsProcessing(false);
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/submissions`,
        {
          subproblem_id: currentSub.id,
          code,
          language: selectedLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const submission = res.data;
      setCurrentSubmissionId(submission.id);
      setSelectedTab('feedback');
      toast.success('Submission received! Evaluating...');

      setTimeout(async () => {
        try {
          const feedbackRes = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/submissions/${submission.submission_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const fullSubmission = feedbackRes.data;
          const outputs = fullSubmission.output ? JSON.parse(fullSubmission.output) : [];
          setFeedback({
            passed: fullSubmission.passed,
            score: fullSubmission.score,
            time: fullSubmission.execution_time,
            memory: fullSubmission.memory,
            outputs: fullSubmission.output
          });
          fetchSubmissionHistory();
          toast.success('Submission evaluated!');
        } catch (err) {
          toast.error('Failed to get submission results');
          console.error(err);
        } finally {
          setIsProcessing(false);
        }
      }, 7000);
    } catch (err) {
      setIsProcessing(false);
      if (err.response) {
        console.error('Response error:', err.response.data);
        console.error('Status code:', err.response.status);
        toast.error(`Submission failed: ${err.response.data.message || 'Validation error'}`);
      } else {
        toast.error('Submission failed!');
        console.error(err);
      }
    }
  };

  const toggleHint = () => setShowHint((v) => !v);

  if (!challenge) return <p className="p-6">Loading challenge...</p>;
  if (!subproblems.length) return <p className="p-6">No subproblems found.</p>;

  const currentSub = subproblems[currentIndex];

  return (
    <div className="flex h-screen bg-gray-800 text-white">
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
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        setCurrentIndex={setCurrentIndex}
        subproblemsLength={subproblems.length}
        onNext={() => {
          if (currentIndex < subproblems.length - 1) {}
          setCurrentIndex((prev) => Math.min(prev + 1, subproblems.length - 1));
        }}
        onPrev={() => {
          if (currentIndex > 0) {
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
          }
        }}
      />

      <div className="w-full lg:w-[60%] flex flex-col">
        {/* Language selection dropdown */}
        <div className="p-4 bg-gray-700 flex items-center">
          <label htmlFor="language-select" className="mr-2 font-semibold">
            Language:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
          >
            {LANGUAGE_OPTIONS.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-hidden">
          <MonacoEditor
            language={selectedLanguage}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}