const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const authenticate = require('./middleware/middleware');
const cors = require('cors');
const taskRoutes = require('./routes/addTask');

const app = express();
app.use(express.json());

dotenv.config();

app.use(cors());

mongoose.connect(process.env.MONGO_URI , { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log("connected"))
.catch((err) => console.error("error" , err));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API!');
});

app.use('/api/auth' , authRoutes);
app.use('/api/tasks' , taskRoutes);

app.listen(PORT , () => {
    console.log(`Live on the port ${PORT}`)
})