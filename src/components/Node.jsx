import React, { useState, useRef, useEffect } from 'react';

const Node = ({ id, x, y, label, onUpdatePosition, onPortClick, onDeleteNode, isSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  // Handle mouse down event
  const handleMouseDown = (e) => {
    // Only start dragging if clicking on the node itself, not on buttons or ports
    if (e.target.closest('.no-drag')) return;
    
    setIsDragging(true);
    const rect = nodeRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    // Only start dragging if touching the node itself, not on buttons or ports
    if (e.target.closest('.no-drag')) return;
    
    setIsDragging(true);
    const rect = nodeRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    onUpdatePosition(id, newX, newY);
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;
    
    onUpdatePosition(id, newX, newY);
    
    e.preventDefault(); // Prevent scrolling while dragging
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add event listeners to document when dragging
  useEffect(() => {
    if (isDragging) {
      // Mouse events
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Touch events
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        // Mouse events
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        
        // Touch events
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={nodeRef}
      className={`absolute bg-white border border-gray-200 rounded-xl shadow-md p-4 min-w-[160px] cursor-move transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-lg'
      } ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{ left: `${x}px`, top: `${y}px`, zIndex: isDragging ? 10 : 1 }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Node header with delete button */}
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-gray-800 truncate">{label}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteNode(id);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2 no-drag"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Input port (left side) */}
      <div 
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow cursor-pointer hover:bg-blue-600 transition-colors duration-200 no-drag"
        onClick={(e) => {
          e.stopPropagation();
          onPortClick(id, 'input');
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          onPortClick(id, 'input');
        }}
      ></div>
      
      {/* Output port (right side) */}
      <div 
        className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow cursor-pointer hover:bg-green-600 transition-colors duration-200 no-drag"
        onClick={(e) => {
          e.stopPropagation();
          onPortClick(id, 'output');
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          onPortClick(id, 'output');
        }}
      ></div>
      
      {/* Node content */}
      <div className="text-xs text-gray-500 mt-2 no-drag">ID: {id}</div>
    </div>
  );
};

export default Node;