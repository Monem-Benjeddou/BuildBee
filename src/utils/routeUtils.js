const LAST_ROUTE_KEY = 'last_route';

export const saveCurrentRoute = (location) => {
  // Don't save login/register routes
  if (location.pathname === '/login' || location.pathname === '/register') {
    return;
  }
  
  localStorage.setItem(LAST_ROUTE_KEY, location.pathname + location.search);
};

export const getLastRoute = () => {
  const lastRoute = localStorage.getItem(LAST_ROUTE_KEY);
  return lastRoute || '/';  // Default to root path instead of /dashboard
};
