import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  disabled = false,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-300'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;