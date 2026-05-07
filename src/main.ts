// This file serves as the main entry point for the TypeScript application, handling the rendering of components and managing the application lifecycle.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        rootElement
    );
} else {
    console.error('Root element not found');
}