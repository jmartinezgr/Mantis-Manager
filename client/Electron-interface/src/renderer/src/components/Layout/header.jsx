import React from 'react';

const Header = ({ onTabChange }) => {
  return (
    <header className="bg-gray-800 text-white shadow-md p-4">
      <div className="flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="logo w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
              <path
                d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Mantis Manager</h2>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <button onClick={() => onTabChange('board')} className="text-gray-300 hover:text-white transition duration-300">
            Board
          </button>
          <button onClick={() => onTabChange('maquinas')} className="text-gray-300 hover:text-white transition duration-300">
            Máquinas
          </button>
          <button onClick={() => onTabChange('tickets')} className="text-gray-300 hover:text-white transition duration-300">
            Tickets
          </button>
          <button onClick={() => onTabChange('settings')} className="text-gray-300 hover:text-white transition duration-300">
            Settings
          </button>
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-4">
          {/* Icon Buttons */}
          <div className="flex space-x-3">
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256" className="text-white">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </button>
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256" className="text-white">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </button>
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256" className="text-white">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
              </svg>
            </button>
          </div>

          {/* Profile Picture */}
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center"
            style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/5981c65c-0a74-4c3e-9fe9-c35dfc3942a0.png")' }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;


