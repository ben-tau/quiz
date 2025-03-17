import { useCallback } from 'react';
import toast from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const useToast = () => {
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast(message, {
          icon: '⚠️',
          style: {
            background: '#fef3c7',
            color: '#92400e'
          }
        });
        break;
      default:
        toast(message, {
          icon: 'ℹ️',
          style: {
            background: '#e0f2fe',
            color: '#075985'
          }
        });
    }
  }, []);

  return { showToast };
}; 