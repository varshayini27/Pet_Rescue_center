import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'
import App from './App.tsx'
import store, { persistor } from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import 'leaflet/dist/leaflet.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
         <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    </BrowserRouter>
  );
} else {
  console.error('Failed to find the root element');
}