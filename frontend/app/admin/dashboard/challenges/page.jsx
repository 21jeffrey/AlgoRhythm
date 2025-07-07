'use client';
import React, { useState } from 'react';
import { PlusCircleIcon, ArrowPathIcon} from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import ChallengeList from '@/components/challenges/ChallengeList';
import CreateChallengeForm from '@/components/challenges/CreateChallengeForm';
import { useRouter } from 'next/navigation';

export default function ChallengesPage() {
    const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Challenges</h1>
        <button
          className="btn btn-outline btn-primary flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-4 h-4" />
          Add New Challenge
        </button>
      </div>

      <ChallengeList />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateChallengeForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
