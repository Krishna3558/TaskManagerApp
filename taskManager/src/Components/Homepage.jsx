import React, { useState } from 'react'
import { TaskProvider, useTask} from '../context/task'
import LastTaks from './LastTaks'

function Homepage(){
    const [Task, setTask] = useState('')
    const [taskDes , setTaskDes] = useState('')
    const [date , setDate] = useState('')
    const [priority , setPriority] = useState('')
    const [errors, setErrors] = useState({});

    const [newTask, setNewTask] = useState({ id: Date.now() , msg: '', desc: '', priority: '', date: '' });

    const today = new Date().toISOString().split('T')[0]
    const {addTask , task} = useTask();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validation for all fields
        const newErrors = {};
        if (!newTask.msg) newErrors.msg = 'Task heading is required*';
        if (!newTask.desc) newErrors.desc = 'Task description is required*';
        if (newTask.priority === '') newErrors.priority = 'Please select a priority*';
        if (!newTask.date) newErrors.date = 'Please select completion date*';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            addTask(newTask); // Add the new task
            console.log(task);
            setNewTask({ msg: "", desc: "", date: "", priority: "" }); // Reset form
        }
    
    };

  return (
    <div className=' flex w-full'>
        <div className=' w-2/3 pt-16'>
            <h1 className=' text-3xl font-bold text-center capitalize'>Your last 5 Taskwill appear here</h1>
            {task.length === 0 ? <p className=' text-center mt-8'>Sorry , you didn't create any Taskplease , firstly create a task....</p> :
            <LastTaks/>}
        </div>
        <div className=' w-1/3 pt-16'>
            <h1 className=' text-3xl font-bold text-center capitalize'>create your daily Taskhere</h1>
            <div className='text-center mt-4'><button className=' bg-green-500 text-white px-2 py-2 rounded-lg font-medium hover:bg-green-600 active:bg-green-700'>Add Task+</button></div>
            <form className=' flex flex-col items-center space-y-6 mt-4'>
                <div className=' w-1/2'>
                <input 
                    type="text"
                    placeholder='Add TaskHeading'
                    value={newTask.msg}
                    onChange={(e) => setNewTask({ ...newTask, msg: e.target.value })}
                    className=' bg-gray-200 text-center py-1 rounded-lg w-full outline-none'
                    required
                />
                {errors.msg && <p className="text-red-500 text-sm mt-1">{errors.msg}</p>}
                </div>
                <div className=' w-1/2'>
                <textarea 
                    type="text"
                    placeholder='Add Task Description'
                    value={newTask.desc}
                    onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
                    maxLength={100}
                    className='bg-gray-200 outline-none rounded-t-lg py-1 w-full resize-none'
                    required
                />
                <div className='bg-gray-200 outline-none text-right text-sm -mt-[6px] rounded-b-lg py-1 w-full'>{newTask.desc.length}/100</div>
                {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc}</p>}
                </div>
                <div className=' flex gap-2 items-center'>
                <label className=' text-lg font-medium'>
                    Enter Task completion date:
                </label>
                <input 
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    min={today}
                    className=" outline-none bg-gray-100 py-2 px-2 rounded-md"
                    required
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div className=' flex gap-2 items-center'>
                <label className='text-lg font-medium'>
                    Set Priority:
                </label>
                    <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        className=" outline-none bg-gray-100 py-2 px-2 rounded-md"
                    >
                        <option value="">Select Priority</option>
                        <option value="Least Important">Least Important</option>
                        <option value="Medium Important">Medium Important</option>
                        <option value="Most Important">Most Important</option>
                    </select>
                    <div>{errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}</div>
                </div>
                <div onClick={handleSubmit} className='text-center mt-4'><button type="submit" className=' bg-green-500 text-white px-2 py-2 rounded-lg font-medium hover:bg-green-600 active:bg-green-700'>Add Task</button></div>
            </form>
        </div>
    </div>
  )
}
export default Homepage