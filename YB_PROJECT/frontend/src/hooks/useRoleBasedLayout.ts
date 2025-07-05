import { useLocation } from 'react-router-dom';

export interface RoleBasedLayoutReturn {
  showSidebar: boolean;
  layoutType: 'dashboard' | 'auth' | 'simple';
}

export const useRoleBasedLayout = (): RoleBasedLayoutReturn => {
  const location = useLocation();
  
  // Pages that should show sidebar - using base paths for matching
  const sidebarBasePaths = [
    '/', 
    '/dashboard', 
    '/create', 
    '/research', 
    '/optimize', 
    '/coach', 
    '/learn',
    '/ai-chat',
    '/test'
  ];
  
  // Auth pages that should use simple layout
  const authPages = ['/login', '/signup', '/forgot-password'];
  
  // Check if current path starts with any of the sidebar base paths
  // Special handling for root path to avoid matching all paths
  const showSidebar = sidebarBasePaths.some(basePath => {
    if (basePath === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(basePath);
  });
  
  let layoutType: 'dashboard' | 'auth' | 'simple' = 'simple';
  
  if (showSidebar) {
    layoutType = 'dashboard';
  } else if (authPages.includes(location.pathname)) {
    layoutType = 'auth';
  }
  
  return {
    showSidebar,
    layoutType
  };
};