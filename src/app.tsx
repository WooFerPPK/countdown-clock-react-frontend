import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { NotificationProvider } from '@/contexts/NotificationContext/NotificationContext';
import NotificationDisplay from '@/components/NotificationDisplay/NotificationDisplay';
import '@/assets/styles/global.scss';

// Create the root for concurrent mode.
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Define the app structure.
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AppRoutes />
        <NotificationDisplay />
      </NotificationProvider>
    </BrowserRouter>
  );
};

if (module.hot) {
  module.hot.accept();
}

root.render(<App />);
