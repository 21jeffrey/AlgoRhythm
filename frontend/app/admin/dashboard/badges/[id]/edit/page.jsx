'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { use } from 'react';
import toast from 'react-hot-toast';

export default function EditBadge(props) {
    const { id } = use(props.params);
    const router = useRouter();

    const [badge, setBadge] = useState(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        threshold_type: 'points',
        threshold_value: '',
        image: null
    });

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}api/badges/${id}`)
            .then(res => {
                setBadge(res.data);
                setForm({
                    name: res.data.name,
                    description: res.data.description,
                    threshold_type: res.data.threshold_type,
                    threshold_value: res.data.threshold_value,
                    image: res.data.image ? null : ''
                });
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to load badge');
            });
    }, [id]);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) {
            if (form[key]) formData.append(key, form[key]);
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}api/badges/${id}?_method=PUT`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            toast.success('Badge updated');
            router.push('/admin/dashboard/badges');
        } catch (error) {
            console.error(error);
            toast.error('Error updating badge');
        }
    };

    if (!badge) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-violet-700 rounded shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <PencilSquareIcon className="h-5 w-5" /> Edit Badge
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-white">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1 font-medium text-white">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                <div>
                    <label htmlFor="threshold_type" className="block mb-1 font-medium text-white">
                        Threshold Type
                    </label>
                    <select
                        id="threshold_type"
                        name="threshold_type"
                        value={form.threshold_type}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="points">Points</option>
                        <option value="streak">Streak</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="threshold_value" className="block mb-1 font-medium text-white">
                        Threshold Value
                    </label>
                    <input
                        id="threshold_value"
                        type="number"
                        name="threshold_value"
                        placeholder="Threshold Value"
                        value={form.threshold_value}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                {badge.image && (
                    <div className="mb-4">
                        <span className="label-text">Current Badge Image:</span>
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}storage/${badge.image}`}
                            alt="Current Badge"
                            className="w-32 h-32 object-cover rounded border mt-2"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="image" className="block mb-1 font-medium text-white">
                        New Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Update Badge
                </button>
            </form>
        </div>
    );
}
