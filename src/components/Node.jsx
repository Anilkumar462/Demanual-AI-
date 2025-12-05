import React from 'react';
import { useDrag } from 'react-draggable';

const Node = ({ id, x, y, label, onUpdatePosition, onPortClick, onDeleteNode, isSelected }) => {
  const [, drag] = useDrag({
    onDrag: (e, data) => {
      onUpdatePosition(id, data.x, data.y);
    }
  });

  return (
    <div
      ref={drag}
      className={`absolute bg-white border border-gray-200 rounded-xl shadow-md p-4 min-w-[160px] cursor-move transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-lg'
      }`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {/* Node header with delete button */}
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-gray-800 truncate">{label}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteNode(id);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Input port (left side) */}
      <div 
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow cursor-pointer hover:bg-blue-600 transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          onPortClick(id, 'input');
        }}
      ></div>
      
      {/* Output port (right side) */}
      <div 
        className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow cursor-pointer hover:bg-green-600 transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          onPortClick(id, 'output');
        }}
      ></div>
      
      {/* Node content */}
      <div className="text-xs text-gray-500 mt-2">ID: {id}</div>
    </div>
  );
};

export default Node;