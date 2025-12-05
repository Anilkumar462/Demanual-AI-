# Demanual AI - Workflow Builder

A modern, interactive workflow builder application built with React, Vite, and Tailwind CSS. This tool allows users to create, visualize, and manage workflows through a drag-and-drop interface with connectable nodes.

## Features

- **User Authentication**
  - Login/Signup functionality with localStorage persistence
  - Form validation for email and password fields
  
- **Interactive Workflow Canvas**
  - Draggable nodes with smooth movement
  - Connectable input/output ports for creating relationships
  - Visual connection lines with bezier curves and directional arrows
  - Grid-style background for better spatial awareness
  
- **Node Management**
  - Add new nodes to the canvas
  - Delete individual nodes with confirmation
  - Clear entire canvas or reset workflow
  
- **Connection System**
  - Intuitive port-based connection creation
  - Visual feedback for selected ports and connections
  - Automatic line repositioning when nodes are moved
  
- **Responsive UI**
  - Clean, modern interface inspired by n8n/LangFlow
  - Responsive design that works on different screen sizes
  - Visual feedback for all interactions

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Drag & Drop**: React Draggable
- **Deployment**: Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd demanual-ai
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Preview the production build:
   ```bash
   npm run preview
   ```

## Deployment

The application is deployed on Vercel and can be accessed at: [Deployment Link](#)

### Deploy Your Own Version

1. Push the code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

2. Connect your GitHub repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in to your account
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project settings (Vite template)
   - Deploy!

## Project Structure

```
demanual-ai/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (Login, Workflow)
│   ├── store/          # Zustand store for state management
│   ├── utils/          # Utility functions
│   ├── styles/         # Additional styling files
│   └── workflow/       # Workflow-specific components
├── public/             # Static assets
├── dist/               # Production build output
├── index.html          # Main HTML file
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally

## Browser Support

The application works in all modern browsers that support ES6+ JavaScript features.

## License

This project is licensed under the MIT License.