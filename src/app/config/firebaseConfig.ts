import messaging from "@react-native-firebase/messaging";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyB0t1in8KYGx06B9ggtvrnMoygl6zTFGBU",
//   authDomain: "mmrms-43519.firebaseapp.com",
//   projectId: "mmrms-43519",
//   storageBucket: "mmrms-43519.appspot.com",
//   messagingSenderId: "926751407066",
//   appId: "1:926751407066:web:5ec19f0b2849e7001cdee3",
// };

// const app = initializeApp(firebaseConfig);

export const getToken = async () => {
  const token = await messaging().getToken();
  console.log(token);
  return token;
};
