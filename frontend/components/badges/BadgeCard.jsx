'use client';
import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCallback } from 'react';
import Modal from '@/app/components/Modal';
import UpdateBadgeForm from '@/app/components/badges/UpdateBadgeForm';
import { useState } from 'react';

const BadgeCard = ({ badge, onDelete, onSuccess  }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);

  const handleDelete = useCallback((id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/badges/${id}`);
          toast.success('Badge deleted successfully');
          onDelete(id); 
        } catch (error) {
          console.error(error);
          toast.error('Failed to delete badge');
        }
      }
    });
  }, [onDelete]);

    return (  
        <div className="card card-side bg-base-100 shadow-sm hover:shadow-[0_10px_15px_rgba(139,92,246,0.4)] transition-shadow duration-300 max-w-2xl p-4">
            <figure className="w-1/3">
                <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}storage/${badge.image}`}
                    alt={badge.name}
                    className="object-contain h-40 w-full rounded"
                />
            </figure>
            <div className="card-body w-2/3">
                <h2 className="card-title text-lg">{badge.name}</h2>
                <p className="text-sm text-gray-600">{badge.description}</p>
                <span className="text-sm">
                    <strong>Threshold:</strong> {badge.threshold_type} <br />
                    <strong>{badge.threshold_type}</strong>: {badge.threshold_value}
                </span>
                <div className="card-actions justify-end space-x-2">
                    <button className="btn btn-sm btn-outline btn-warning flex items-center gap-1"
                    onClick={openModal}
                    >
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit
                    </button>
                    <button className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                    onClick={() => handleDelete(badge.id)}
                    >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>

<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Badge">
  <UpdateBadgeForm
    badge={badge}
    onClose={() => {
      setIsModalOpen(false);}}
    onSuccess={() =>{
      setIsModalOpen(false);
    }}
  />
</Modal>
        </div>
    );
};

export default BadgeCard;
