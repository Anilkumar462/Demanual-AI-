import React from 'react';

const ConnectionLine = ({ fromX, fromY, toX, toY, isSelected }) => {
  // Calculate control points for bezier curve
  const centerX = (fromX + toX) / 2;
  
  // Create bezier path
  const pathData = `M ${fromX} ${fromY} C ${centerX} ${fromY} ${centerX} ${toY} ${toX} ${toY}`;
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <path
        d={pathData}
        fill="none"
        stroke={isSelected ? "#3b82f6" : "#93c5fd"} // Light blue color
        strokeWidth={isSelected ? "2" : "1.5"}
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={isSelected ? "#3b82f6" : "#93c5fd"} />
        </marker>
      </defs>
    </svg>
  );
};

export default ConnectionLine;