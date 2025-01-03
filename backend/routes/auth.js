const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signup' , async (req , res) => {
    const { name , email , password } = req.body;
    try{
        const existingUser = await User.findOne({email});
        if( existingUser ){
            return res.status(400).json({message: "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = new User({
            name ,
            email,
            password: hashedPassword
        })

        await newUser.save();

        const token = jwt.sign(
            {userId: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.status(201).json({token , userId: newUser._id})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"});
    }
});

router.post('/login' , async (req , res) => {
    const {email , password} = req.body;
    try{
        const isUser = await User.findOne({email});
        if( !isUser ){
            return res.status(400).json({message: "No user found"});
        }
        const isPasswordValid = await bcrypt.compare(password , isUser.password);
        if( !isPasswordValid ){
            return res.status(400).json({message: "You enter wrong password "});
        }
        const token = jwt.sign(
            {userId: isUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.json({token , userId: isUser._id  , name: isUser.name});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"})
    }
});

module.exports = router;