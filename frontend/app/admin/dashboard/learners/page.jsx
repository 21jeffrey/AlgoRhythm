import React from 'react'
import LearnerTable from '@/components/learners/LearnerTable'

function page() {
  return (
<div>
    <div className="max-w-4xl mx-auto bg-violet-800 shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Learners</h1>
      <p className="text-gray-400 mb-6">
        Here you can view or delete the learners of the platform.
      </p>
      <hr className="my-6 border-gray-600" />
      <LearnerTable />
    </div>
</div>
  )
}

export default page