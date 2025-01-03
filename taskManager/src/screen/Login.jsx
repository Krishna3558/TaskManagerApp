import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authentication';

function Login() {
    const [email , setEmail ] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    const [error , setError] = useState('');
    const {loggedIn} = useAuthContext();
    const [messg , setMessg] = useState("Login");
    const handleLogin = async(e) => {
        e.preventDefault();
        setError('');
        setMessg("Logining.......");

        try{
            const response = await fetch('https://taskmanagerappbackend-8tb9.onrender.com/api/auth/login' , {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email , password})
            });
            if(!response.ok){
                setError("Server is not working try after some time");
                setMessg("Login");
            }
            const data = await response.json();
            console.log(data);
            if( data.message ){
                setError(data.message);
                setMessg("Login");
                return;
            }
            if(data.token){
                localStorage.setItem('token' , data.token);
            }
            if(data.name){
                localStorage.setItem("user" , data.name);
            }
            if(data.userId){
                localStorage.setItem("userId" , data.userId);
            }
            loggedIn();
            navigate('/');
        }
        catch(err){
            setError("enter valid email or password");
            setMessg("Login");
        }
    }
  return (
    <div className=' h-screen w-full '>
        <h1 className='bg-gradient-to-b from-blue-500 to-blue-700 dark:from-gray-800 dark:to-black dark:text-white text-white text-left text-3xl font-bold flex items-center fixed top-0 w-full px-6 h-16'>Task Manager</h1>
    <div className=' flex h-screen justify-center items-center dark:bg-black'>
        <form className=' w-3/5 max-sm:w-full h-1/2 flex flex-col justify-around items-center rounded-lg bg-slate-50 dark:bg-gray-800 dark:text-white'>
            <h1 className=' text-3xl font-bold '>Login</h1>
            <div className=''>
                <label className=' block font-medium '>
                    Email
                </label>
                <input
                    type="email"
                    placeholder='Enter your email'
                    className='outline-none text-black w-72 max-sm:w-64 bg-slate-200 px-1 py-1 rounded-md '
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className=' block font-medium'>
                    Password
                </label>
                <input
                    type="password"
                    placeholder='password'
                    className='outline-none w-72 text-black max-sm:w-64 bg-slate-200 px-1 py-1 rounded-md '
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <span className=' font-medium'>New user? </span>
                <Link to='/signup'><span className=' cursor-pointer text-blue-600 '>Click here</span></Link>
            </div>
            <div>
                <button onClick={handleLogin} className=' bg-green-500 text-white font-medium px-4 py-2 rounded-md'>{messg}</button>
            </div>
            <p className=' font-medium '>{error}</p>
        </form>
    </div>
    </div>
  )
}

export default Login
