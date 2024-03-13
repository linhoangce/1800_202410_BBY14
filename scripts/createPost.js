const firebaseConfig = {
    apiKey: "AIzaSyB6wrvxkmLpKwnNDPDQYjH2ERndXENJbds",
    authDomain: "comp1800-bby14-bf613.firebaseapp.com",
    projectId: "comp1800-bby14-bf613",
    storageBucket: "comp1800-bby14-bf613.appspot.com",
    messagingSenderId: "915413841680",
    appId: "1:915413841680:web:293d32a172052be3101795",
    measurementId: "G-HPBVPFH8SW"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();

const titleInput = document.querySelector("")
