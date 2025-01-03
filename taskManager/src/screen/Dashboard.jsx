import React from 'react'
import Navbar from '../Components/navbar'
import Homepage from '../Components/Homepage'
import { TaskProvider } from '../context/task'

function Dashboard() {
  return (
    <div>
        <Navbar />
        <Homepage/>
    </div>
  )
}

export default Dashboard