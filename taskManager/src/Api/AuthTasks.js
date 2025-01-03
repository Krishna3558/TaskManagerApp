export const fetchTask = async(UserId) => {
    const response = await fetch(`http://localhost:5000/api/tasks/gettask/${UserId}` , {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"   
        }
    });
    if(!UserId){
        throw new Error("No user id is present");
    }
    if(!response.ok){
        throw new Error("Failed to fetch the task");
    }
    return await response.json();
}

export const addTask = async(task) => {
    const userId = localStorage.getItem("userId");
    if(!userId){
        throw new Error("No userid");
    }
    const taskWithUserId = { ...task, UserId: userId };
    const response = await fetch("http://localhost:5000/api/tasks/addtask" , {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(taskWithUserId)
    })
    if(!response.ok){
        console.log(await response.json());
        throw new Error("failed to add task");
    }
    const data =  await response.json();
    console.log(data);
    return data;
}

export const updateTask = async (id, updatedTask) => {
    if (!id) {
        throw new Error("Task ID is required for updating");
    }

    console.log("Updating Task ID:", id);

    const response = await fetch(`http://localhost:5000/api/tasks/updatetask/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    const data = await response.json();
    return data;
};


export const deleteTask = async(id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/removetask/${id}` , {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    if(!response.ok){
        throw new Error("failed to delete task");
    }
    return await response.json();
}