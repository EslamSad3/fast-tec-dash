import React, { useState, useEffect } from'react';
import { ToastContainer, toast } from "react-toastify";
import { onMessageListener, requestPermission } from '../../firebase';


function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '' });
  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      toast.success(`${payload?.notification?.title}: ${payload?.notification?.body}`, {
        duration: 60000, 
        position: 'top-right',
      });
});
    return() => {
      unsubscribe.catch((err) =>console.log('failed: ', err));
    };
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
export default Notification;