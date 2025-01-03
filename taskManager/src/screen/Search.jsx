import { useEffect, useRef, useState } from 'react'
import React from 'react'
import Navbar from '../Components/Navbar'
import LastTaks from '../Components/LastTaks';
import AddTask from '../Components/AddTask';
import { useTask } from '../context/task';
import { useNavigate } from 'react-router-dom';


function Search() {
  const navigate = useNavigate();
  const [search , setSearch] = useState('');
  const [add , setAdd ] = useState(false);
  const addTaskRef = useRef();
  const {task} = useTask();
  const [sortType, setSortType] = useState(null);
  const [sortOptions , setSortOptions] = useState(null);
  const handleAddTask = () => {
    if( window.innerWidth <= 640 ){
      navigate("/add_task");
    }
    else{
      setAdd(!add);
    }
  }
  useEffect(() => {
    const handleAnyClick = (event) => {
      if( addTaskRef.current && !addTaskRef.current.contains(event.target)){
        setAdd(false);
      }
    };

    if(add){
      document.addEventListener("mousedown" , handleAnyClick);
    }

    return () => {
      document.removeEventListener("mousedown" , handleAnyClick);
    }
  } , [add]);
  const [filterTask , setFilterTask] = useState(task);
  useEffect(() => {
    const results = task.filter((t) =>
      t.msg.toLowerCase().includes(search.toLowerCase())
    );
    setFilterTask(results);
  }, [search, task]);
  const handleSort = (type) => {
    const sortedTask = [...filterTask];

    if( type === 'dateNF' ){ 
      sortedTask.sort((a , b) => {
        const aDateTime = `${a.date}T${a.time}`;
        const bDateTime = `${b.date}T${b.time}`;
        return new Date(aDateTime) - new Date(bDateTime);
      });
    }
    else if( type === 'dateFN'){
      sortedTask.sort((a , b) => {
        const aDateTime = `${a.date}T${a.time}`;
        const bDateTime = `${b.date}T${b.time}`;
        return new Date(bDateTime) - new Date(aDateTime);
      });
    }
    else if( type === 'priorityHL' ){
      const priorityOrder = {"Most Important" : 1 , "Medium Important" : 2 , "Least Important" : 3};
      sortedTask.sort((a , b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    else if( type === 'priorityLH' ){
      const priorityOrder = {"Most Important" : 1 , "Medium Important" : 2 , "Least Important" : 3};
      sortedTask.sort((a , b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    setFilterTask(sortedTask);
    setSortType(type);
    setSortOptions(null);
  }
  return (
    <div className=' w-full min-h-screen bg-white dark:bg-slate-600'>
        <Navbar />
        <div className=' text-center mt-8 mb-2'>
          <input
            type="text"
            placeholder='Search task by heading'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=' text-black bg-gray-200 w-1/2 max-sm:text-sm rounded-l-lg outline-none py-1 px-2'
          />
          <button className=' bg-blue-200 hover:bg-blue-300 max-sm:text-sm py-1 max-md:px-3 px-6 rounded-r-lg'>
            🔍
          </button>
        </div>
        <div className=' relative text-right max-sm:pr-4 max-md:px-4 max-md:font-normal max-md:text-sm max-lg:pr-10 px-80 max-md:text-center'>
          <button onClick={() => setSortType(sortType === 'open' ? null : 'open')} className=' bg-blue-500 text-white px-2 py-1 font-medium rounded-lg'>Sort By</button>
          {sortType === "open" && <div className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 max-md:text-sm max-md:right-1/3 top-6 max-lg:right-10 right-72 z-10">
            {sortOptions === null && <div>
              <button className="block w-full text-left max-md:py-1 px-4 py-2 hover:bg-gray-100" onClick={() => setSortOptions("date")}>Time :</button>
              <button className="block w-full text-left max-md:py-1 px-4 py-2 hover:bg-gray-100" onClick={() => setSortOptions("priority")}>Priority :</button>
            </div>}
            <div>
              {sortOptions === "date" && <div>
                <button className="block w-full text-left max-md:py-1 px-4 py-2 hover:bg-gray-100" onClick={() => handleSort('dateNF')}>Time: Near to Far</button>
                <button className="block w-full text-left max-md:py-1 px-4 py-2 hover:bg-gray-100" onClick={() => handleSort('dateFN')}>Time: Far to Near</button>
              </div>}
              {sortOptions === "priority" && <div>
                <button className="block w-full text-left max-md:py-1 px-4 py-2 hover:bg-gray-100" onClick={() => handleSort('priorityHL')}>Priority: High to Low</button>
                <button className="block w-full text-left max-md:py-1 px-4 py-2 hover:bg-gray-100" onClick={() => handleSort('priorityLH')}>Priority: Low to High</button>
              </div>}
            </div>
            
          </div>}
        </div>
        {task.length === 0 && <div className=' text-2xl max-md:text-sm font-bold max-md:font-normal mt-2 text-center capitalize'>create task by clicking on add task button below</div>}
        <LastTaks searched = {filterTask}/>
        <button onClick={handleAddTask} className=' fixed bottom-20 right-10 max-md:h-16 max-md:w-16 max-md:text-sm max-md:right-5 rounded-full h-24 w-24 text-center bg-green-600 text-lg font-semibold text-white'>
          Add Task +
        </button>
        {add ? <div ref={addTaskRef} className='absolute border-[1px] border-gray-200 shadow-lg dark:shadow-sm shadow-gray-200 rounded-xl bottom-28 right-20 max-md:w-2/3 w-1/3'>
          <AddTask closeForm = {() => setAdd(false)}/>
        </div> : null }
    </div>
  )
}

export default Search
