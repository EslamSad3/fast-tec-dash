import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { onMessageListener, requestPermission } from "../../firebase";
import messageSound from "../../assets/sounds/notification_sound.mp3";
import { useNavigate } from "react-router-dom";
function Notification() {
  const sound = new Audio(messageSound);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });

      toast.success(
        `${payload?.notification?.title}: ${payload?.notification?.body}`,
        {
          duration: 60000,
          position: "top-right",
        }
      );

      if (!document.hasFocus()) {
        sound.load();
        sound.play();
        // if (payload?.data?.orderId) {
        //   navigate(`/orders/${payload.data.orderId}`);
        // }
      } else {
        // if (payload?.data?.orderId) {
        //   navigate(`/orders/${payload.data.orderId}`);
        // }

        sound.load();
        sound.play();
      }
    });
    return () => {
      unsubscribe.catch((err) => console.log("failed: ", err));
    };
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
export default Notification;
