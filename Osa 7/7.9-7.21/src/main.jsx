import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </StrictMode>,
);
