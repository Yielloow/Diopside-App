// ✅ BON
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


export const auth = {
    currentUser: {
      uid: 'mockUserId',
      email: 'mock@email.com',
    },
  };
  
  export const db = {
    collection: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    onSnapshot: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
  };
  