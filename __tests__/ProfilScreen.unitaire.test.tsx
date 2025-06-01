import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfilScreen from '../app/screens/ProfilScreen';
import { Alert } from 'react-native';

// 🔧 Mock firebaseConfig (auth + db)
jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'mockUserId', email: 'mock@email.com' },
  },
  db: {},
}));

// 🔧 Mock Firestore methods utilisés
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => ({
    empty: false,
    docs: [{ id: 'mockDocId', data: () => ({ item: '9638803570952' }) }],
  })),
  getDoc: jest.fn(() => ({
    exists: () => true,
    data: () => ({ unlocked_items: ['9638803570952'] }),
  })),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('ProfilScreen (unit tests)', () => {
  it('affiche le champ et le bouton de validation', () => {
    const { getByPlaceholderText, getByText } = render(<ProfilScreen />);
    expect(getByPlaceholderText('Entrer votre code ici')).toBeTruthy();
    expect(getByText('Valider le code')).toBeTruthy();
  });

  it('affiche une alerte si aucun code n’est entré', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByText } = render(<ProfilScreen />);
    fireEvent.press(getByText('Valider le code'));
    expect(alertSpy).toHaveBeenCalledWith('Erreur', 'Veuillez entrer un code.');
    alertSpy.mockRestore();
  });

  it('valide un code et débloque un vêtement', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const { getByPlaceholderText, getByText } = render(<ProfilScreen />);

    fireEvent.changeText(getByPlaceholderText('Entrer votre code ici'), 'VALIDCODE123');
    fireEvent.press(getByText('Valider le code'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Succès', 'Vêtement débloqué !');
    });

    alertSpy.mockRestore();
  });
});
