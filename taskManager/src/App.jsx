import { useState , useEffect } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Dashboard from './screen/Dashboard'
import Search from './screen/Search'
import { TaskProvider } from './context/task'
import { ThemeProvider, useTheme } from './context/theme'
import AddTaskPage from './screen/AddTaskPage'
import Login from './screen/Login'
import Signup from './screen/Signup'
import { AuthProvider } from './context/authentication'

function App() {
  console.log("app rendering");

  return (
    <AuthProvider>
    <ThemeProvider>
    <TaskProvider>
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/add_task' element={<AddTaskPage/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </div>
    </Router>
    </TaskProvider>
    </ThemeProvider>
    </AuthProvider>
  )
}

export default App
