import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toggle from './Toggle';
import { useAuthContext } from '../context/authentication';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const {logOut} = useAuthContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    setUser(storedUser);
    setToken(storedToken);
  }, []);

  let initials = ""; // Declare initials with a default value

  if (user) {
    const [firstName, lastName] = user.split(" ");
    initials = firstName[0] + (lastName ? lastName[0] : ""); // Update initials if user exists
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    setToken(null);
    logOut();
  };

  return (
    <div className="w-full flex flex-wrap bg-gradient-to-b from-blue-500 to-blue-700 dark:from-gray-800 dark:to-black dark:text-white text-white justify-between px-6 py-4 items-center">
      {/* Logo */}
      <h1 className="text-2xl sm:text-3xl font-bold">Task Manager</h1>

      {/* Menu Toggle Button (Visible on Mobile Only) */}
      <div className=' flex gap-6 items-center'>
      <div className="flex gap-10 max-md:gap-2 items-center">
        {/* Login or Initials Button (Outside Menu) */}
        {token ? (
          <li className="list-none">
            <button className="font-semibold bg-blue-900 dark:bg-slate-600 rounded-full text-center h-12 max-md:h-8 max-md:w-8 w-12 text-lg hover:underline">
              {initials}
            </button>
          </li>
        ) : (
          <li className="list-none">
            <Link to="/login" className="font-semibold text-lg hover:underline">
              Login
            </Link>
          </li>
        )}

        <button
          className="text-xl font-bold md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '⁝'}
        </button>
      </div>

      {/* Links Section */}
      <ul
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex z-20 flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 md:items-center text-lg font-semibold md:relative absolute md:top-auto md:right-auto top-14 right-6 bg-blue-600 dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent rounded-lg p-4 md:p-0`}
      >
        <li>
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
        </li>

        {/* LogOut Button Inside Menu (Only visible when logged in) */}
        {token && (
          <li>
            <button onClick={handleLogout} className="hover:underline">
              LogOut
            </button>
          </li>
        )}

        <li>
          <Toggle />
        </li>
      </ul>
    </div>
    </div>
  );
}

export default Navbar;
