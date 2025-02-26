import React from 'react';
import { createRoot } from 'react-dom/client';
import NoteApp from '../src/components/NoteApp';
import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NoteApp />
  </BrowserRouter>
);
