import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { onMessageListener, requestPermission } from "../../firebase";
import messageSound from "../../assets/sounds/notification_sound.mp3";
function Notification() {
  const sound = new Audio(messageSound);
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      const link = payload?.notification?.body;
      if (link) {
        // Open the link in a new tab when the notification is received
        window.open(link, "_blank");
      }
      console.log(link);
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
      } else {
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
