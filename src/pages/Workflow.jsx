import React from 'react';
import { useNavigate } from 'react-router-dom';
import useWorkflowStore from '../store/workflowStore';
import Node from '../components/Node';
import ConnectionLine from '../components/ConnectionLine';

const Workflow = () => {
  const navigate = useNavigate();
  const {
    nodes,
    connections,
    selectedNode,
    selectedPort,
    addNode,
    updateNodePosition,
    removeNode,
    clearCanvas,
    setSelectedPort,
    getPortPosition
  } = useWorkflowStore();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleAddNode = () => {
    const newNode = {
      id: Date.now().toString(),
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 100,
      label: `Node ${nodes.length + 1}`
    };
    addNode(newNode);
  };

  const handleClearCanvas = () => {
    clearCanvas();
  };

  const handleResetWorkflow = () => {
    if (window.confirm('Are you sure you want to reset the entire workflow?')) {
      clearCanvas();
    }
  };

  const handleDeleteNode = (nodeId) => {
    if (window.confirm('Are you sure you want to delete this node?')) {
      removeNode(nodeId);
    }
  };

  const handlePortClick = (nodeId, portType) => {
    setSelectedPort(nodeId, portType);
  };

  // Calculate connection positions
  const getConnectionPositions = (connection) => {
    const fromPos = getPortPosition(connection.fromNode, connection.fromPort);
    const toPos = getPortPosition(connection.toNode, connection.toPort);
    
    return {
      fromX: fromPos ? fromPos.x : 0,
      fromY: fromPos ? fromPos.y : 0,
      toX: toPos ? toPos.x : 0,
      toY: toPos ? toPos.y : 0
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Workflow Canvas</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddNode}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Add Node
            </button>
            <button
              onClick={handleResetWorkflow}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Reset Workflow
            </button>
            <button
              onClick={handleClearCanvas}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear Canvas
            </button>
            {currentUser.email && (
              <span className="text-gray-700">Welcome, {currentUser.email}</span>
            )}
            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div 
          className="h-full bg-[#f7f7f7] relative overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        >
          {/* Canvas area */}
          <div className="absolute inset-0">
            {/* Render connections */}
            {connections.map((connection) => {
              const { fromX, fromY, toX, toY } = getConnectionPositions(connection);
              const isSelected = selectedNode === connection.id;
              
              return (
                <ConnectionLine
                  key={connection.id}
                  fromX={fromX}
                  fromY={fromY}
                  toX={toX}
                  toY={toY}
                  isSelected={isSelected}
                />
              );
            })}
            
            {/* Render nodes */}
            {nodes.map(node => (
              <Node
                key={node.id}
                id={node.id}
                x={node.x}
                y={node.y}
                label={node.label}
                onUpdatePosition={updateNodePosition}
                onPortClick={handlePortClick}
                onDeleteNode={handleDeleteNode}
                isSelected={selectedNode === node.id}
              />
            ))}
            
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-lg mb-4">Click "Add Node" to start building your workflow</p>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
                        <div className="h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="h-1 bg-gray-100 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Connection hint */}
            {selectedNode && selectedPort && (
              <div className="absolute bottom-4 left-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm shadow-sm">
                Selected {selectedPort} port of Node {selectedNode}. Click an {selectedPort === 'output' ? 'input' : 'output'} port to connect.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workflow;