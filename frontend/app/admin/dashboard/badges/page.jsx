'use client';
import React from 'react';
import BadgeList from '@/app/components/badges/BadgeList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Modal from '@/app/components/Modal';
import CreateBadgeForm from '@/app/components/badges/CreateBadgeForm';
import { useState } from 'react';

const BadgesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="p-6 ">
        <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold mb-4">Manage Badges</h1>
    <button
      className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
      onClick={openModal}
    >
      <PlusCircleIcon className="h-4 w-4" />
      Add New Badge
    </button>
        </div>
        <p className="text-gray-400 mb-6">
            Here you can manage the badges awarded to users for completing challenges.
        </p>
      <hr className="my-6 border-gray-600" />
      <BadgeList  />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateBadgeForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default BadgesPage;
