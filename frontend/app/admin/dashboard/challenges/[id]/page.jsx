'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import SubproblemForm from '@/components/challenges/SubproblemForm';
import toast from 'react-hot-toast';

const SubproblemListPage = () => {
    const { id } = useParams(); // challenge ID
    const [subproblems, setSubproblems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubproblem, setSelectedSubproblem] = useState(null);

    const fetchSubproblems = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${id}/subproblems`);
            setSubproblems(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load subproblems');
        }
    };

    useEffect(() => {
        if (id) fetchSubproblems();
    }, [id]);

    const openModal = (subproblem = null) => {
        setSelectedSubproblem(subproblem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedSubproblem(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (subId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${id}/subproblems/${subId}`);
            toast.success('Subproblem deleted');
            setSubproblems(prev => prev.filter(sp => sp.id !== subId));
        } catch (err) {
            toast.error('Delete failed: ' + (err.response?.data?.message || 'Server error'));
        }
    };

    const handleFormSuccess = () => {
        fetchSubproblems(); // Refresh the list
        closeModal(); // Close the modal
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Subproblems</h1>
                <button
                    className="btn btn-outline btn-primary flex items-center gap-2"
                    onClick={() => openModal()}
                    aria-label="Add new subproblem"
                >
                    <PlusCircleIcon className="w-4 h-4" />
                    Add New Subproblem
                </button>
            </div>

            {subproblems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No subproblems found</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => openModal()}
                    >
                        Create First Subproblem
                    </button>
                </div>
            ) : (
                <ul className="space-y-4">
                    {subproblems.map((sp) => (
                        <li key={sp.id} className="p-4 bg-base-200 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-semibold text-lg truncate">{sp.title}</h2>
                                    <p className="text-gray-600 mt-2 whitespace-pre-wrap">{sp.description}</p>

                                    {sp.hint && (
                                        <p className="mt-2 text-sm text-violet-500">
                                            <strong>Hint:</strong> {sp.hint}
                                        </p>
                                    )}

                                    <p className="mt-2 text-sm text-green-600">
                                        <strong>Expected Output:</strong> {sp.expected_output}
                                    </p>

                                    {Array.isArray(sp.test_cases) && sp.test_cases.length > 0 && (
                                        <div className="mt-2 text-sm">
                                            <strong>Test Cases:</strong>
                                            <ul className="list-disc list-inside text-gray-500 mt-1">
                                                {sp.test_cases.map((test, index) => (
                                                    <li key={index}>{JSON.stringify(test)}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                    <button
                                        className="btn btn-sm btn-outline btn-warning flex items-center gap-1"
                                        onClick={() => openModal(sp)}
                                        aria-label={`Edit subproblem ${sp.title}`}
                                    >
                                        <PencilSquareIcon className="h-4 w-4" />
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                                        onClick={() => handleDelete(sp.id)}
                                        aria-label={`Delete subproblem ${sp.title}`}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedSubproblem ? "Edit Subproblem" : "Create Subproblem"}>
                <SubproblemForm
                    challengeId={id}
                    subproblem={selectedSubproblem}
                    onClose={closeModal}
                    onSuccess={handleFormSuccess}
                />
            </Modal>
        </div>
    );
};

export default SubproblemListPage;
