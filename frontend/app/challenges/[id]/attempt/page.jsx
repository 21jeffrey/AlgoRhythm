'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

import SubproblemInfo from '@/app/components/challenges/SubproblemInfo';
import MonacoEditor from '@/app/components/challenges/MonacoEditor';

export default function AttemptPage() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [subproblems, setSubproblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedTab, setSelectedTab] = useState('description');
  const [showHint, setShowHint] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

  const currentSub = subproblems[currentIndex] || {};

  // Toggle hint visibility
  const toggleHint = () => setShowHint(!showHint);

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
        if (!token) {
          toast.error('Not authenticated');
          return;
        }
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        toast.error('Not authenticated');
      }
    };

    fetchChallengeData();
    fetchUser();
  }, [id]);

  const fetchSubmissionHistory = async () => {
    if (!currentSub?.id || !user?.id) return;
    
    setIsLoadingHistory(true);
    try {
      const token = Cookies.get('token');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/submissions/mine`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { subproblem_id: currentSub.id }
        }
      );
      setSubmissionHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      toast.error('Failed to load submission history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    setShowHint(false);
    setFeedback(null);
    fetchSubmissionHistory();
  }, [currentIndex, currentSub?.id, user?.id]);

  useEffect(() => {
    setUserCode(currentSub?.starter_code || '');
  }, [currentSub]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please log in to submit.');
      return;
    }
    if (!currentSub?.id) {
      toast.error('No subproblem selected');
      return;
    }

    setIsProcessing(true);
    try {
      const token = Cookies.get('token');
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/submissions`,
        {
          subproblem_id: currentSub.id,
          code: userCode,
          language: selectedLanguage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const submission = res.data;
      setCurrentSubmissionId(submission.id);

      // Refetch the updated submission with output
      const latest = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/submissions/${submission.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Handle different output formats
      let output = [];
      if (typeof latest.data.output === 'string') {
        try {
          output = JSON.parse(latest.data.output);
        } catch {
          output = [{ result: latest.data.output }];
        }
      } else if (Array.isArray(latest.data.output)) {
        output = latest.data.output;
      }
      
      setFeedback(output);
      setSelectedTab('feedback');
      fetchSubmissionHistory();
      toast.success('Submission complete!');
    } catch (err) {
      console.error('Submission error:', err);
      const errorMsg = err.response?.data?.message || 'Submission failed';
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!challenge) return <p className="p-6">Loading challenge...</p>;
  if (!subproblems.length) return <p className="p-6">No subproblems found.</p>;

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
        onPrev={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
        onNext={() => currentIndex < subproblems.length - 1 && setCurrentIndex(currentIndex + 1)}
        disablePrev={currentIndex === 0}
        disableNext={currentIndex === subproblems.length - 1}
        onRunCode={handleSubmit}  // Passed as run handler
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
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="btn btn-primary btn-sm"
          >
            {isProcessing ? 'Running...' : 'Run Code'}
          </button>
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