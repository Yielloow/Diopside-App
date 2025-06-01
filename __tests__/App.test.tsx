import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../app/screens/TestFirebase';

// 👇 MOCK des dépendances
jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ uid: 'mockUID', email: 'mock@email.com' });
      return () => {};
    }),
  }));
  
  
jest.mock('../firebaseConfig', () => ({
    auth: {
      currentUser: {
        uid: 'mockUID',
        email: 'mock@email.com',
      },
    },
    db: {},
}));
  

describe('App Firebase Screen', () => {
  it("affiche le texte de bienvenue", () => {
    const { getByText } = render(<App />);
    expect(getByText("Bienvenue sur l'App Expo Go avec Firebase !")).toBeTruthy();
  });
});

