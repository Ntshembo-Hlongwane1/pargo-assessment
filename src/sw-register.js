import { Workbox } from 'workbox-window';

export const registerServiceWorker = () => {
  if ('production' !== process.env.NODE_ENV) {
    return;
  }
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw.js');

    wb.register();
  }
};
