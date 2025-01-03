import React , {useEffect, useState} from 'react'
import { useTask } from '../context/task'

function AddTask({closeForm}) {
    const [errors, setErrors] = useState({});

    const token = localStorage.getItem("token");
    
        const [newTask, setNewTask] = useState(!token ? {_id: Date.now() , msg: "", desc: "", date: "" , time: "" , priority: "" , complete: false } : {msg: "", desc: "", date: "" , time: "" , priority: "" , complete: false});
    
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();

        const currTime = now.toTimeString().split(" ")[0].slice(0 , 5);

        const {addTask , task} = useTask();
    
        const handleSubmit = (e) => {
            e.preventDefault();
        
            // Validation for all fields
            const newErrors = {};
            if (!newTask.msg) newErrors.msg = 'Task heading is required*';
            if (!newTask.desc) newErrors.desc = 'Task description is required*';
            if (newTask.priority === '') newErrors.priority = 'Please select a priority*';
            if (!newTask.date) newErrors.date = 'Please select completion date*';
            if(!newTask.time) newErrors.time = 'Please select completion time*';
            if( newTask.date === today && newTask.time < currTime ){
                newErrors.time = ' Time cannot be earlier'
            }
            setErrors(newErrors);
    
            if (Object.keys(newErrors).length === 0) {
                addTask(newTask); // Add the new task
                setNewTask(!token ? {_id: Date.now() , msg: "", desc: "", date: "" , time: "" , priority: "" , complete: false } : {msg: "", desc: "", date: "" , time: "" , priority: "" , complete: false}); // Reset form
                closeForm();
            }
        
        };
    
  return (
    <div className=' w-full py-4 bg-white rounded-xl dark:bg-slate-800 dark:text-white'>
            <form className=' flex flex-col items-center text-black space-y-6 mt-4'>
                <div className=' w-2/3'>
                <input 
                    type="text"
                    placeholder='Add TaskHeading'
                    value={newTask.msg}
                    onChange={(e) => setNewTask({ ...newTask, msg: e.target.value })}
                    className=' bg-gray-200  text-center py-1 rounded-lg w-full outline-none'
                    required
                />
                {errors.msg && <p className="text-red-500 text-sm mt-1">{errors.msg}</p>}
                </div>
                <div className=' w-2/3'>
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
                <div>
                    <h4 className=' font-medium'>Deadline Date:</h4>
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
                <div>
                    <h4 className=' font-medium'>Deadline Time:</h4>
                    <input
                        type="time"
                        value={newTask.time}
                        onChange={(e) => setNewTask({...newTask , time: e.target.value})}
                        className="bg-gray-100 py-1 px-2 rounded-md"
                        required
                    />
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>
                <div>
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
  )
}

export default AddTask