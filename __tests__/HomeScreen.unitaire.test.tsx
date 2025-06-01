// __tests__/HomeScreen.unitaire.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../app/screens/HomeScreen';

jest.setTimeout(10000); // timeout + long si besoin

const mockGetDoc = jest.fn();

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'testUID' },
  },
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(() => ({})),
  getDoc: (...args: any[]) => mockGetDoc(...args),
}));

describe('HomeScreen (unit tests)', () => {
  beforeEach(() => {
    mockGetDoc.mockReset();
  });

  it('affiche les infos de l’utilisateur si les données existent', async () => {
    mockGetDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        username: 'JeanTest',
        level: 7,
        exp: 350,
        achievements: 5,
      }),
    });

    const { getByText } = render(<HomeScreen />);
    await waitFor(() => {
      expect(getByText(/Salut, JeanTest/)).toBeTruthy();
      expect(getByText(/Niveau 7/)).toBeTruthy();
      expect(getByText(/EXP: 350/)).toBeTruthy();
      expect(getByText(/5 succès/)).toBeTruthy();
    });
  });

  it("n'écrase pas les valeurs par défaut si des champs sont absents", async () => {
    mockGetDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        username: 'TestMan',
      }),
    });

    const { getByText } = render(<HomeScreen />);
    await waitFor(() => {
      expect(getByText(/Salut, TestMan/)).toBeTruthy();
      expect(getByText(/Niveau 1/)).toBeTruthy(); // default level
      expect(getByText(/EXP: 0/)).toBeTruthy(); // default exp
      expect(getByText(/0 succès/)).toBeTruthy(); // default achievements
    });
  });
});
