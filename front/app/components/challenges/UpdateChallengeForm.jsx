'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateChallengeForm = ({ challenge, onClose }) => {
  const [form, setForm] = useState({
    title: challenge.title,
    description: challenge.description,
    difficulty: challenge.difficulty,
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });
    payload.append('_method', 'PUT'); // for Laravel support

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/challenges/${challenge.id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Challenge updated!');
      onClose();
      window.location.reload()
    } catch (err) {
      toast.error('Failed to update challenge');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-purple-800 rounded text-white max-w-xl">
      <h2 className="text-xl font-bold">Update Challenge</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
        placeholder="Description"
        required
      />
      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advance</option>
      </select>
      {challenge.image && (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}storage/${challenge.image}`}
          alt="Current Image"
          className="w-32 h-32 object-cover rounded border"
        />
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="file-input file-input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary w-full">Update</button>
    </form>
  );
};

export default UpdateChallengeForm;
