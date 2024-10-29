import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        className: action.payload.className,
      };
    case 'CLEAR_NOTIFICATION':
      return { message: '', className: 'notification' };
    case 'SET_WITH_TIMEOUT':
      return {
        message: action.payload.message,
        className: action.payload.className,
      };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: '',
    className: 'notification',
  });

  const showNotificationWithTimeout = (message, className, timeout) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, className } });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, timeout);
  };

  return (
    <NotificationContext.Provider
      value={{ state, dispatch, showNotificationWithTimeout }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) throw new Error('Must be used within a NotificationProvider');
  return context;
};
