import { useLocation } from 'react-router-dom';

export interface RoleBasedLayoutReturn {
  showSidebar: boolean;
  layoutType: 'dashboard' | 'auth' | 'simple';
}

export const useRoleBasedLayout = (): RoleBasedLayoutReturn => {
  const location = useLocation();
  
  // Pages that should show sidebar
  const sidebarPages = ['/', '/dashboard', '/create', '/research', '/optimize', '/coach', '/learn'];
  
  // Auth pages that should use simple layout
  const authPages = ['/login', '/signup', '/forgot-password'];
  
  const showSidebar = sidebarPages.includes(location.pathname);
  
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