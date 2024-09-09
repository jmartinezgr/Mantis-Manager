import React from 'react';
import  './login.css';

const Button = ({ icon }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'DotOutline':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256" className='icon'>
            <path d="M128,96a32,32,0,1,0,32,32A32,32,0,0,0,128,96Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,144Z" />
          </svg>
        );
      case 'Info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" color="#1AE56E" height="20px" fill="currentColor" viewBox="0 0 256 256" className="icon">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '9999px',
      height: '40px',
      backgroundColor: '#1AE56E',
      color: '#1C160C',
      padding: '0 10px',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    {renderIcon()}
  </button>
  );
};

export default Button;

