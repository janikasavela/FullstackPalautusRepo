import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { state } = useNotification();

  if (!state.message) return null;

  return <div className={state.className}>{state.message}</div>;
};

export default Notification;
