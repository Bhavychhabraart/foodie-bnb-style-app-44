
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a root for the app
const root = createRoot(document.getElementById("root")!);

// Render the app
root.render(<App />);
