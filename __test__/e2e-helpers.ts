export const getSiteUrl = () => 'https://localhost';

export const waiter = (delay = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));
