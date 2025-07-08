'use client';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../Loading';

function LearnerTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/users`)
      .then(res => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          setUsers(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch learners');
      });
  }, []);

  const handleDelete = async (userId, refreshCallback) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This learner will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/users/${userId}`);
        toast.success('User deleted successfully');
        refreshCallback(); 
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete user');
      }
    }
  });
};

  if (loading) {
    return <Loading />
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Points</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}storage/${user.avatar_image }`}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.points || 0}</td>
              <th>
                <button className="btn btn-error btn-xs text-white"
                    onClick={() => handleDelete(user.id, () => setUsers(users.filter(u => u.id !== user.id)))}
                >Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Points</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default LearnerTable;
