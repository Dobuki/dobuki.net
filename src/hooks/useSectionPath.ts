import { useLocation } from 'react-router-dom';

export const useSectionPath = (): string => {
  const location = useLocation();
  return location.pathname;
}; 
