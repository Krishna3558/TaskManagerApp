import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddTask from '../Components/AddTask'

function AddTaskPage() {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-white dark:bg-slate-800">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-900">
        <h1 className="text-xl font-semibold dark:text-white">Add New Task</h1>
        <button
        onClick={() => {navigate(-1)}}
          className="text-red-500 font-medium bg-gray-100 py-1 px-3 rounded hover:bg-gray-200"
        >
          ✕
        </button>
      </div>
      <div className="p-4">
        <AddTask closeForm={() => navigate(-1)} />
      </div>
    </div>
  )
}

export default AddTaskPage