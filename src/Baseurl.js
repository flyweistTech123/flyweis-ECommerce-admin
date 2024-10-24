/** @format */

import { Store } from "react-notifications-component";

// export const Baseurl = "https://t9vc9vued3.execute-api.ap-south-1.amazonaws.com/dev/";
export const Baseurl =
  // "https://tsl3pcpym2.execute-api.ap-south-1.amazonaws.com/dev/";
  "https://pawan-sharma-backend.vercel.app/";
export const Auth = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export const showMsg = (title, message, type) =>
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
