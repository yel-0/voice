import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyDQUc3FFQb4DRaBn7lDrAV4661HDKhijeA",
  authDomain: "self-care-4cb2c.firebaseapp.com",
  projectId: "self-care-4cb2c",
  storageBucket: "self-care-4cb2c.appspot.com",
  messagingSenderId: "877081576585",
  appId: "1:877081576585:web:f2a6ffd8e03c0424bf7258",
  measurementId: "G-J18H652KFK",
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BGgwGWzbTRnXoM3NjSD6KIpob6Rhnw_ZrIU4zD-NRlKwQRvcYfT4Bv9ZCajrDsA8Ca1q1oePeCj0OQepgwVhKls",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("Current Token:", currentToken);
        } else {
          console.log("Unable to get token");
        }
      });
    } else {
      console.log("Notification permission denied.");
    }
  });
}

requestPermission();
