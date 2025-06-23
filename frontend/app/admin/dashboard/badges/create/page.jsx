'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateBadgeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    threshold_type: 'points',
    threshold_value: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/badges`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Badge created!');
      setFormData({ name: '', description: '', threshold_type: 'points', threshold_value: '', image: null });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create badge');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-purple-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Badge</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Badge Name"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Badge Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <div className="flex items-center gap-4">
          <select
            name="threshold_type"
            value={formData.threshold_type}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="points">Points</option>
            <option value="streak">Streak</option>
          </select>

          <input
            type="number"
            name="threshold_value"
            value={formData.threshold_value}
            onChange={handleChange}
            placeholder="Threshold Value"
            className="input input-bordered w-full"
            required
            min="1"
          />
        </div>

        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Create Badge
        </button>
      </form>
    </div>
  );
};

export default CreateBadgeForm;
