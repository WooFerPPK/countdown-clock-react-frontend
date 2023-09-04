import { useNotificationContext } from '@/contexts/NotificationContext/NotificationContext'

const useNotification = () => {
  const { addNotification, removeNotification } = useNotificationContext();

  const showSuccess = (message: string, timeout = 3000) => {
    const id = addNotification('success', message);
    setTimeout(() => removeNotification(id), timeout);
  };

  const showError = (message: string, timeout = 3000) => {
    const id = addNotification('error', message);
    setTimeout(() => removeNotification(id), timeout);
  };

  return {
    showSuccess,
    showError
  };
};

export default useNotification;
