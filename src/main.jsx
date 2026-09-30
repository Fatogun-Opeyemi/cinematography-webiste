import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Global layers, in cascade order. Imported before the app so component styles
   (CSS Modules) always win against these base rules. */
import './styles/tokens.css';
import './styles/reset.css';
import './styles/base.css';
import './styles/utilities.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
