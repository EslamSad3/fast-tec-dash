import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { onMessageListener, requestPermission } from "../../firebase";
import messageSound from "../../assets/sounds/notification_sound.mp3";
import { useNavigate } from "react-router-dom";
function Notification() {
  const sound = new Audio(messageSound);

  const navigate = useNavigate();
  const [payloadFromFCM, setPayload] = useState("");
  // Inside your useEffect or wherever you handle the notification click
  const handleNotificationClick = () => {
    if (payloadFromFCM && payloadFromFCM.data && payloadFromFCM.data.orderId) {
      navigate(`/orders/${payloadFromFCM.data.orderId}`);
    }
  };
  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setPayload(payload);
      sound.load();
      sound.play();
      toast.success(
        `${payload?.notification?.title}: ${payload?.notification?.body}`,
        {
          duration: 10,
          position: "top-right",
        }
      );
    });
    return () => {
      unsubscribe.catch((err) => console.log("failed: ", err));
    };
  }, [payloadFromFCM]);
  return (
    <>
      <ToastContainer
        onClick={handleNotificationClick}
        autoClose={
          payloadFromFCM && payloadFromFCM.data && payloadFromFCM.data.orderId
            ? 60000
            : 5000
        }
      />
    </>
  );
}
export default Notification;
