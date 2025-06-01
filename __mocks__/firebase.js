export const auth = {
    currentUser: {
      uid: '123',
      displayName: 'TestUser',
      photoURL: 'https://example.com/avatar.png',
    },
  };
  
  export const db = {
    // ajoute ici des mocks Firestore si nécessaire
  };
  
  export const doc = jest.fn();
  export const getDoc = jest.fn();
  export const where = jest.fn();
  export const collection = jest.fn();
  export const onSnapshot = jest.fn();
  export const addDoc = jest.fn();
  export const query = jest.fn();
  export const orderBy = jest.fn();
  export const serverTimestamp = jest.fn();
  export const deleteDoc = jest.fn();
  