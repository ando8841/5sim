import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './theme.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.jsx';

const config = {
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 60_000 * 3,
      staleTime: 60_000 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
};

const queryClient = new QueryClient(config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
    ,
  </React.StrictMode>
);
