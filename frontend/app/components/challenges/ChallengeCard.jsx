import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import Modal from '../Modal';
import UpdateChallengeForm from './UpdateChallengeForm';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ChallengeCard = ({ challenge, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete this challenge?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(result => {
      if (result.isConfirmed) deleteChallenge();
    });
  };

  const deleteChallenge = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${challenge.id}`);
      toast.success('Challenge deleted');
      onDelete(challenge.id);
    } catch (err) {
      toast.error('Failed to delete challenge');
    }
  };


  const getImageUrl = () => {
    if (!challenge.image) return '';
    if (challenge.image.startsWith('http')) return challenge.image;
    return `${process.env.NEXT_PUBLIC_API_URL}storage/${challenge.image}`;
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm hover:shadow-[0_10px_15px_rgba(139,92,246,0.4)] transition-shadow duration-300 max-w-2xl p-4">
      <figure className="w-1/3">
        <img
          src={getImageUrl()}
          alt={challenge.title}
          className="object-contain h-40 w-full rounded"
        />
      </figure>
      <div className="card-body w-2/3">
        <h2 className="card-title text-lg">{challenge.title}</h2>
        <p className="text-sm text-gray-600">{challenge.description}</p>
        <span className="text-sm">
          <strong>Difficulty</strong> {challenge.difficulty} <br />
        </span>
        <div className="card-actions justify-end space-x-2">
             <Link
              href={`/admin/dashboard/challenges/${challenge.id}`}
              className="btn btn-sm btn-outline btn-primary"
            >
              View Subproblems
            </Link>

          <button 
            className="btn btn-sm btn-outline btn-warning flex items-center gap-1"
            onClick={openModal}
            aria-label="Edit challenge"
            type="button"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Edit
          </button>
          
          <button 
            className="btn btn-sm btn-outline btn-error flex items-center gap-1"
            onClick={handleDelete}
            aria-label="Delete challenge"
            type="button"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UpdateChallengeForm 
          challenge={challenge} 
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default ChallengeCard;
