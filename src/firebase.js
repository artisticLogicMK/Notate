import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAz8ZfEJT1ZdyRy7M5LLkSGTLNOWsuZqx4",
    authDomain: "upnote-app.firebaseapp.com",
    projectId: "upnote-app",
    storageBucket: "upnote-app.appspot.com",
    messagingSenderId: "307795543999",
    appId: "1:307795543999:web:9f2b45ab427fd3bc45830a"
}

const initFirebase = initializeApp(firebaseConfig)
export default initFirebase