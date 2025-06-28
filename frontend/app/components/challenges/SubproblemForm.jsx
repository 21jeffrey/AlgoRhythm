'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SubproblemForm = ({ challengeId, subproblem, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hint: '',
    test_cases: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (subproblem) {
      setFormData({
        title: subproblem.title || '',
        description: subproblem.description || '',
        hint: subproblem.hint || '',
        test_cases: JSON.stringify(subproblem.test_cases || [], null, 2)
      });
    } else {
      setFormData({
        title: '',
        description: '',
        hint: '',
        test_cases: ''
      });
    }
    setErrors({});
  }, [subproblem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.test_cases.trim()) newErrors.test_cases = 'Test cases are required';
    else {
      try {
        const parsed = JSON.parse(formData.test_cases);
        if (!Array.isArray(parsed)) throw new Error();
      } catch {
        newErrors.test_cases = 'Test cases must be valid JSON array';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        test_cases: JSON.parse(formData.test_cases)
      };

      if (subproblem) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}api/challenges/${challengeId}/subproblems/${subproblem.id}`,
          payload
        );
        toast.success('Subproblem updated!');
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/challenges/${challengeId}/subproblems`,
          payload
        );
        toast.success('Subproblem created!');
      }

      onSuccess?.();
      onClose?.();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        toast.error('Validation error');
      } else {
        toast.error(err.response?.data?.message || 'Operation failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {subproblem ? 'Edit Subproblem' : 'Create New Subproblem'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'hint', ].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium capitalize">{field.replace('_', ' ')}</label>
            {field === 'description' || field === 'hint' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`textarea textarea-bordered w-full ${errors[field] ? 'textarea-error' : ''}`}
              />
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors[field] ? 'input-error' : ''}`}
              />
            )}
            {errors[field] && (
              <p className="text-sm text-error mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium">Test Cases (JSON array)</label>
          <textarea
            name="test_cases"
            rows={5}
            value={formData.test_cases}
            onChange={handleChange}
            placeholder={`e.g. [\n  {"input": "5 3", "output": "8"},\n  {"input": "1 2", "output": "3"}\n]`}
            className={`textarea textarea-bordered w-full font-mono ${errors.test_cases ? 'textarea-error' : ''}`}
          />
          {errors.test_cases && (
            <p className="text-sm text-error mt-1">{errors.test_cases}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="btn btn-outline" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
            {subproblem ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubproblemForm;
