'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function UpdateBadgeForm({ badge, onClose, onSuccess }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: badge.name || '',
    description: badge.description || '',
    threshold_type: badge.threshold_type || 'points',
    threshold_value: badge.threshold_value || '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/badges/${badge.id}?_method=PUT`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      toast.success('Badge updated');
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Error updating badge');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-violet-700 rounded shadow">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
        <PencilSquareIcon className="h-5 w-5" /> Edit Badge
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <div className="flex gap-4">
          <select
            name="threshold_type"
            value={form.threshold_type}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="points">Points</option>
            <option value="streak">Streak</option>
          </select>

          <input
            type="number"
            name="threshold_value"
            value={form.threshold_value}
            onChange={handleChange}
            placeholder="Threshold Value"
            className="input input-bordered w-full"
            min="1"
            required
          />
        </div>

        {badge.image && (
          <div>
            <span className="label-text text-white">Current Image:</span>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}storage/${badge.image}`}
              alt="Current"
              className="w-24 h-24 object-cover rounded mt-2 border"
            />
          </div>
        )}

        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Badge
        </button>
      </form>
    </div>
  );
}
