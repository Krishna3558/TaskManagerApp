import { useState , useEffect } from 'react';
import React from 'react'
import { useTask } from '../context/task'

function LastTaks({searched}) {
    const {task , updateTask , completeTask , removeTask} = useTask();
    const month = {
        "01" : "Jan" , "02" : "Feb" , "03" : "Mar" , "04" : "Apr" , "05" : "May" ,
        "06" : "June" , "07" : "Jul" , "08" : "Aug" , "09" : "Sep" , "10" : "Oct" , 
        "11" : "Nov" , "12" : "Dec"
    };
    const color = {
        "Least Important" : "text-green-500" , 
        "Medium Important" : "text-yellow-500" ,
        "Most Important" : "text-red-500"
    };
    const [editId , setEditId] = useState(null);
    const [updatedTask , setUpdatedTask] = useState({});
    const [errors, setErrors] = useState({});
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currTime = now.toTimeString().split(" ")[0].slice(0 , 5);

    const handleEdit = (task) => {
        if( !task.complete ){
            setEditId(task._id);
            setUpdatedTask({...task });
        }
    }

    const handleOnChange = (e) => {
        const {name , value} = e.target;
        setUpdatedTask((prev) => ({
            ...prev,
            [name] : value
        }));
    }

    const handleUpdateSubmit = (id) => {
        const newErrors = {};
        if (!updatedTask.msg) newErrors.msg = 'Task heading is required*';
        if (!updatedTask.desc) newErrors.desc = 'Task description is required*';
        if (updatedTask.priority === '') newErrors.priority = 'Please select a priority*';
        if (!updatedTask.date) newErrors.date = 'Please select completion date*';
        if(!updatedTask.time) newErrors.time = 'Please select completion time*';
            if( updatedTask.date === today && updatedTask.time < currTime ){
                newErrors.time = ' Time cannot be earlier'
            }
        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0 ){
            updateTask(id , updatedTask);
            setEditId(null);
        }
    }


  return (
    <>
        <div className=" w-full flex flex-wrap justify-evenly items-center">
                {searched.map((task) => (
                    <li
                        key={task._id}
                        className={` p-4 m-2 max-[340px]:px-0 max-sm:w-80 w-96 relative bg-gray-200 rounded shadow list-none ${task.complete ? "opacity-85" : ""}`}
                    >
                        <div className={'w-full'}>
                            {task.complete ? <div className=' border-4 border-red-700 text-red-700 uppercase px-1 py-1 -rotate-45 w-3/5 font-extrabold text-2xl text-center absolute left-9 top-20 opacity-100'>
                                completed
                            </div> : null}
                            { editId === task._id ?
                            
                            (<div className="space-y-2">
                                    <input
                                        type="text"
                                        name="msg"
                                        value={updatedTask.msg}
                                        onChange={handleOnChange}
                                        placeholder="Task Heading"
                                        className="w-full rounded-lg p-2 border bg-gray-100"
                                    />
                                    {errors.msg && <p className="text-red-500 text-xs ">{errors.msg}</p>}
                                    <textarea
                                        type="text"
                                        max={100}
                                        name="desc"
                                        value={updatedTask.desc}
                                        onChange={handleOnChange}
                                        placeholder="Task Description"
                                        className="outline-none rounded-t-lg py-1 w-full resize-none bg-gray-100"
                                        style={{marginBottom: 0}}
                                    />
                                    <div className=' bg-gray-100 text-right outline-none text-sm rounded-b-lg py-1 w-full' style={{marginTop: -6}}>
                                    {updatedTask.desc ? updatedTask.desc.length : 0}/100
                                    </div>
                                    {errors.desc && <p className="text-red-500 text-xs">{errors.desc}</p>}
                                    <input
                                        type="date"
                                        name="date"
                                        value={updatedTask.date}
                                        min={today}
                                        onChange={handleOnChange}
                                        className="w-full rounded-lg p-2 border bg-gray-100"
                                    />
                                    {errors.date && <p className="text-red-500 text-xs ">{errors.date}</p>}
                                    <div>
                                        <input
                                            type="time"
                                            name = "time"
                                            value={updatedTask.time}
                                            onChange={handleOnChange}
                                            className="bg-gray-100 py-1 px-2 rounded-md"
                                            required
                                        />
                                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                                    </div>
                                    <select
                                        name="priority"
                                        value={updatedTask.priority}
                                        onChange={handleOnChange}
                                        className="w-full rounded-lg p-2 border bg-gray-100"
                                    >
                                        <option value="Least Important">Least Important</option>
                                        <option value="Medium Important">Medium Important</option>
                                        <option value="Most Important">Most Important</option>
                                    </select>
                                    <button
                                        onClick={() => handleUpdateSubmit(task._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )
                            :(<div>

                            <div className=' w-full flex justify-between '>
                                <h1 className= "font-bold text-xl capitalize" >{task.msg}</h1>
                                <button onClick={() => {removeTask(task._id)}} className=' text-lg hover:opacity-90'>
                                    ❌
                                </button>
                            </div>
                            <h1 className=' font-semibold text-lg mt-2 '>Task Description: </h1>
                            <p className=' whitespace-nowrap overflow-auto'>{task.desc}</p>
                            <p className=' inline font-semibold text-lg mt-1 mr-1'>Deadline Date: </p>
                            <p className=' inline font-medium'>{task.date.slice(8 , 10)} / {month[task.date.slice(5 , 7)]} / {task.date.slice(0 , 4)}</p>
                            <br/>
                            <h1 className='inline font-semibold text-lg mt-1'>Deadline Time: </h1>
                            <p className=' inline font-medium'>{task.time}</p>
                            <p className={` font-medium ${color[task.priority]}`}>{task.priority}</p>
                            <div className=' h-8'>
                            </div>
                            <div className=' absolute bottom-0 w-full '>
                            <div className=' w-full flex justify-around '>
                                <button onClick={() => {completeTask(task._id)}} className=' bg-green-500 text-white px-1 py-1 rounded-lg font-medium hover:bg-green-600 active:bg-green-700'>
                                    Task Complete
                                </button>
                                <button onClick={() => handleEdit(task)} className=' bg-blue-500 text-white px-1 py-1 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700'>
                                    Update Task
                                </button>
                            </div>
                            </div>
                            </div>)}
                        </div>
                    </li>
                ))}
        </div>
    </>
  )
}

export default LastTaks