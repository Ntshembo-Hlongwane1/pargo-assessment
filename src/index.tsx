import React from 'react';
import { createRoot } from 'react-dom/client';
import { Navigation } from '@src/Navigation/Navigation.navigation';
import { registerServiceWorker } from './sw-register';
registerServiceWorker();
const app = <Navigation />;

// Render application in DOM
createRoot(document.getElementById('app')).render(app);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register(__dirname + 'sw.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }
