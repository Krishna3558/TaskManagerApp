import React , { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useAuthContext } from "./authentication";
import { fetchTask , addTask as apiAddTask , updateTask as apiUpdateTask , deleteTask } from "../Api/AuthTasks";

const TaskContext = createContext();

export const useTask = () =>  useContext(TaskContext);

export const TaskProvider = ({children}) => {
    const[task , setTask] = useState([]);
    const user = localStorage.getItem("userId");
    const {isLogin} = useAuthContext();
    console.log("context user",user);

    useEffect(() => {
        if(user){
            const getTask = async() => {
                const userTask = await fetchTask(user);
                setTask(userTask);
            }
            getTask();
        }
        else{
            const localTask = JSON.parse(localStorage.getItem("tasks")) || [];
            setTask(localTask);
        }
    } , [user , isLogin]);

    const updateLocalStorage = (updatedTask) => {
        localStorage.setItem("tasks" , JSON.stringify(updatedTask));
    }

    const addTask = async(newTask) => {
        try{
            if(user){
                const addedTask = await apiAddTask(newTask);
                setTask((prev) => [addedTask , ...prev]);
                console.log(addedTask);
            }
            else{
                const updatedTask = [newTask , ...task];
                setTask(updatedTask);
                updateLocalStorage(updatedTask);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const removeTask = async (id) => {
        try {
            if (user) {
                await deleteTask(id);
                setTask((prev) => prev.filter((t) => t._id !== id)); // Update state only on success
            } else {
                const updatedTasks = task.filter((t) => t._id !== id);
                setTask(updatedTasks);
                updateLocalStorage(updatedTasks);
            }
        } catch (error) {
            console.error("Error removing task:", error.message);
            alert("Some issue in deleting , try again");
        }
    }

    const updateTask = async (id , upTask) => {
        if( user){
            const updatedTask = await apiUpdateTask(id , upTask);
            setTask((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
        }
        else{
            const updatedTask = task.map((t) => t._id === id ? upTask : t);
            setTask(updatedTask);
            updateLocalStorage(updatedTask);
        }
    }

    const completeTask = async(id) => {
        if(user){
            const taskToToggle = task.find((t) => t._id === id );
            if(taskToToggle){
                const updatedTask = {...taskToToggle , complete: !taskToToggle.complete};
                await apiUpdateTask(id , updatedTask);
                setTask((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
            }
        }
        else{
            const updatedTask = task.map((t) => (t._id === id ? 
                {...t , complete: !t.complete} : t
            ));
            setTask(updatedTask);
            updateLocalStorage(updatedTask);
        }
    }

    return (
        <TaskContext.Provider value={ {task , addTask , updateTask , completeTask , removeTask }}>
            {children}
        </TaskContext.Provider>
    )
}