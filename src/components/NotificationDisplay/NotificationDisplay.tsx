import React from 'react';
import { useNotificationContext } from '@/contexts/NotificationContext/NotificationContext';

interface NotificationProps {
  id: number,
  type: string,
  message: string
}

const NotificationDisplay: React.FC = () => {
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <div className="notification-container">
      {notifications.map((notification: NotificationProps) => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          {notification.message}
          <button onClick={() => removeNotification(notification.id)}>Close</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationDisplay;
