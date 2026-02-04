import { useContext } from 'react';
import ToastContextValue from '@/contexts/toastContextValue';

const useToast = () => {
  const context = useContext(ToastContextValue);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;
