import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3k8nwayDXYs2lWQuvIr09vlDHcS4QKQs",
  authDomain: "futbol-manager-38ab6.firebaseapp.com",
  projectId: "futbol-manager-38ab6",
  storageBucket: "futbol-manager-38ab6.firebasestorage.app",
  messagingSenderId: "724733665340",
  appId: "1:724733665340:web:8dd0ab8843a8cd3187e339",
  measurementId: "G-XR668TD80L"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
