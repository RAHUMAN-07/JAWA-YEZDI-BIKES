// Firebase and LocalStorage Fallback Helper Client
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Standard Firebase config template.
// These can be replaced with real configuration or set via Vite env variables.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Check if credentials are valid. If not, run in local-storage mock mode.
const isFirebaseEnabled = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID"
);

let app;
let db: any = null;

if (isFirebaseEnabled) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log("Firebase successfully initialized.");
  } catch (error) {
    console.error("Firebase initialization failed, falling back to mock mode:", error);
  }
} else {
  console.log("No active Firebase credentials. Running in LocalStorage Mock Mode.");
}

// Interface definitions
export interface Booking {
  id?: string;
  bikeId: string;
  bikeName: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  dealership: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

export interface CustomBike {
  id?: string;
  modelId: string;
  modelName: string;
  price: number;
  colorName: string;
  colorHex: string;
  exhaust: string;
  mirrors: string;
  seat: string;
  luggage: string;
  createdAt: string;
}

// ----------------------------------------------------
// DB ACCESS METHODS (Gracefully fallbacks to LocalStorage)
// ----------------------------------------------------

export async function saveBooking(booking: Booking): Promise<Booking> {
  const finalBooking = { ...booking, createdAt: new Date().toISOString() };
  
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "bookings"), finalBooking);
      return { ...finalBooking, id: docRef.id };
    } catch (error) {
      console.warn("Failed to write booking to Firebase. Falling back to LocalStorage:", error);
    }
  }

  // Local Storage Fallback
  const existingStr = localStorage.getItem("jawa_bookings") || "[]";
  const existing: Booking[] = JSON.parse(existingStr);
  const newBooking = { ...finalBooking, id: `mock-book-${Date.now()}` };
  existing.push(newBooking);
  localStorage.setItem("jawa_bookings", JSON.stringify(existing));
  return newBooking;
}

export async function getBookings(): Promise<Booking[]> {
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const bookings: Booking[] = [];
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
      });
      return bookings;
    } catch (error) {
      console.warn("Failed to fetch bookings from Firebase. Falling back to LocalStorage:", error);
    }
  }

  const existingStr = localStorage.getItem("jawa_bookings") || "[]";
  return JSON.parse(existingStr);
}

export async function cancelBooking(id: string): Promise<boolean> {
  if (db && !id.startsWith("mock-")) {
    try {
      await deleteDoc(doc(db, "bookings", id));
      return true;
    } catch (error) {
      console.warn("Failed to delete booking from Firebase. Falling back to LocalStorage:", error);
    }
  }

  const existingStr = localStorage.getItem("jawa_bookings") || "[]";
  const existing: Booking[] = JSON.parse(existingStr);
  const updated = existing.filter(b => b.id !== id);
  localStorage.setItem("jawa_bookings", JSON.stringify(updated));
  return true;
}

export async function saveCustomBike(bike: CustomBike): Promise<CustomBike> {
  const finalBike = { ...bike, createdAt: new Date().toISOString() };

  if (db) {
    try {
      const docRef = await addDoc(collection(db, "garage"), finalBike);
      return { ...finalBike, id: docRef.id };
    } catch (error) {
      console.warn("Failed to write custom bike to Firebase. Falling back to LocalStorage:", error);
    }
  }

  const existingStr = localStorage.getItem("jawa_garage") || "[]";
  const existing: CustomBike[] = JSON.parse(existingStr);
  const newBike = { ...finalBike, id: `mock-bike-${Date.now()}` };
  existing.push(newBike);
  localStorage.setItem("jawa_garage", JSON.stringify(existing));
  return newBike;
}

export async function getGarageBikes(): Promise<CustomBike[]> {
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, "garage"));
      const bikes: CustomBike[] = [];
      querySnapshot.forEach((doc) => {
        bikes.push({ id: doc.id, ...doc.data() } as CustomBike);
      });
      return bikes;
    } catch (error) {
      console.warn("Failed to fetch garage from Firebase. Falling back to LocalStorage:", error);
    }
  }

  const existingStr = localStorage.getItem("jawa_garage") || "[]";
  return JSON.parse(existingStr);
}

export async function deleteGarageBike(id: string): Promise<boolean> {
  if (db && !id.startsWith("mock-")) {
    try {
      await deleteDoc(doc(db, "garage", id));
      return true;
    } catch (error) {
      console.warn("Failed to delete bike from Firebase. Falling back to LocalStorage:", error);
    }
  }

  const existingStr = localStorage.getItem("jawa_garage") || "[]";
  const existing: CustomBike[] = JSON.parse(existingStr);
  const updated = existing.filter(b => b.id !== id);
  localStorage.setItem("jawa_garage", JSON.stringify(updated));
  return true;
}
