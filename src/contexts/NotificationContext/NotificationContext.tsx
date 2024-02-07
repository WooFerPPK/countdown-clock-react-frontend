import React, { createContext, useState, useContext } from 'react';

interface NotificationProviderType {
  children: React.ReactNode
}

const NotificationContext = createContext(undefined);

export const NotificationProvider: React.FC<NotificationProviderType> = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(0);

  const addNotification = (type: string, message: string) => {
    setNotifications([...notifications, { id: notificationId, type, message }]);
    setNotificationId(notificationId + 1);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
