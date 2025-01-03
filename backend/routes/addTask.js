const express = require('express');
const Task = require('../models/Task');
router = express.Router();

router.post('/addtask' , async( req , res) => {
    const {msg , desc , date , time , complete , priority } = req.body;
    const {UserId} = req.body;

    if (!UserId) {
        return res.status(400).json({ error: 'UserId is required' });
    }

    try{
        const task = new Task({UserId , msg , desc , date , time , complete , priority});
        await task.save();
        res.status(201).json(task);
    }
    catch(err){
        res.status(500).json({error: err});
    }
});

router.get('/gettask/:UserId' , async(req , res) => {
    const {UserId} = req.params;
    try{
        const task = await Task.find({UserId});
        if(task){
            res.json(task);
        }
        else{
            res.status(400).json({message: "no task is there"});
        }
    }
    catch(err){
        res.status(500).json({error: err});
    }
});

router.put('/updatetask/:id' , async(req , res) => {
    const {id} = req.params;
    const UserId = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate({_id : id , UserId} , req.body , {new: true});
        if(!updatedTask){
            return res.status(404).json({error: "the task not find"});
        }
        res.json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});
    }
});

router.delete('/removetask/:id' , async(req , res) => {
    try{
        const {id} = req.params;
        const UserId = req.body;
        const deletedTask = await Task.findByIdAndDelete({_id : id , UserId});
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found or not authorized to delete.' });
        }
        res.json({message: "task delete successfully" , taskId: id});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: error});
    }
});

module.exports = router;