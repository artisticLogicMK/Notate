import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    //...your firebase config
}

const initFirebase = initializeApp(firebaseConfig)
export default initFirebase