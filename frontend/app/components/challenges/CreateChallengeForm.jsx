'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateChallengeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    image: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/challenges`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Challenge created!');
      onClose();
      window.location.reload()
    } catch (err) {
      toast.error('Error creating challenge');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
        placeholder="Description"
        required
      />
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <input
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        className="file-input file-input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary w-full">
        Create Challenge
      </button>
    </form>
  );
};

export default CreateChallengeForm;
