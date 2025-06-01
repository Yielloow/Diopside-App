import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfilScreen from '../app/screens/ProfilScreen';

// ✅ Mock de Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: () => ({
    currentUser: { uid: 'user123' },
  }),
}));

// ✅ Mock de firebaseConfig
jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'user123' },
  },
  db: {},
}));

// ✅ Mock Firestore
jest.mock('firebase/firestore', () => {
  return {
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(() =>
      Promise.resolve({
        empty: true,
        docs: [],
      })
    ),
    getDoc: jest.fn(() =>
      Promise.resolve({
        exists: () => true,
        data: () => ({
          unlocked_items: ['9638803570952'],
        }),
      })
    ),
    updateDoc: jest.fn(),
    doc: jest.fn(),
    deleteDoc: jest.fn(),
  };
});

describe('ProfilScreen', () => {
  it('affiche le champ de code et le bouton', () => {
    const { getByPlaceholderText, getByText } = render(<ProfilScreen />);
    expect(getByPlaceholderText("Entrer votre code ici")).toBeTruthy();
    expect(getByText("Valider le code")).toBeTruthy();
  });

  it('affiche un vêtement déverrouillé', async () => {
    const { findByText } = render(<ProfilScreen />);
    const item = await findByText('Lapidaire Noir');

    expect(item).toBeTruthy();
  });
});
