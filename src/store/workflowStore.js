import { create } from 'zustand';

const useWorkflowStore = create((set, get) => ({
  nodes: [],
  connections: [],
  selectedNode: null,
  selectedPort: null,
  
  // Add a new node to the canvas
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  // Update a node's position
  updateNodePosition: (id, x, y) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, x, y } : node
    )
  })),
  
  // Remove a node from the canvas
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== id),
    connections: state.connections.filter(
      conn => conn.fromNode !== id && conn.toNode !== id
    )
  })),
  
  // Add a connection between nodes
  addConnection: (connection) => set((state) => ({
    connections: [...state.connections, connection]
  })),
  
  // Remove a connection
  removeConnection: (connectionId) => set((state) => ({
    connections: state.connections.filter(conn => conn.id !== connectionId)
  })),
  
  // Clear all nodes and connections
  clearCanvas: () => set({
    nodes: [],
    connections: [],
    selectedNode: null,
    selectedPort: null
  }),
  
  // Set selected port for connection
  setSelectedPort: (nodeId, portType) => set((state) => {
    // If clicking the same port, deselect it
    if (state.selectedNode === nodeId && state.selectedPort === portType) {
      return { selectedNode: null, selectedPort: null };
    }
    
    // If we have a selected output port and clicking an input port, create connection
    if (state.selectedNode && state.selectedPort === 'output' && portType === 'input' && state.selectedNode !== nodeId) {
      const newConnection = {
        id: Date.now().toString(),
        fromNode: state.selectedNode,
        fromPort: state.selectedPort,
        toNode: nodeId,
        toPort: portType
      };
      
      return { 
        connections: [...state.connections, newConnection],
        selectedNode: null,
        selectedPort: null
      };
    }
    
    // If clicking an output port, select it
    if (portType === 'output') {
      return { selectedNode: nodeId, selectedPort: portType };
    }
    
    // For other cases, just update selection
    return { selectedNode: nodeId, selectedPort: portType };
  }),
  
  // Get port position for connection calculations
  getPortPosition: (nodeId, portType) => {
    const node = get().nodes.find(n => n.id === nodeId);
    if (!node) return null;
    
    // Base node position
    const nodeX = node.x;
    const nodeY = node.y;
    
    // Node dimensions (approximate)
    const nodeWidth = 160;
    const nodeHeight = 80;
    
    // Port positions
    if (portType === 'input') {
      // Left side, middle
      return {
        x: nodeX - 2,
        y: nodeY + nodeHeight / 2
      };
    } else if (portType === 'output') {
      // Right side, middle
      return {
        x: nodeX + nodeWidth + 2,
        y: nodeY + nodeHeight / 2
      };
    }
    
    return null;
  }
}));

export default useWorkflowStore;