import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BillTrackerContextProvider } from './components/BillTrackerContextProvider.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from './components/UserContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <BillTrackerContextProvider>
          <App />
        </BillTrackerContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
)
