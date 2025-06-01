import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../app/screens/HomeScreen';

jest.setTimeout(10000); // timeout étendu si jamais le test prend du temps

const mockGetDoc = jest.fn();

// ✅ mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// ✅ mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// ✅ mock firebaseConfig
jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'testUID' },
  },
  db: {},
}));

// ✅ mock firestore
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(() => ({})),
  getDoc: (...args: any[]) => mockGetDoc(...args),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    mockGetDoc.mockReset();
  });

  it('render sans crasher', async () => {
    mockGetDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        username: 'TestUser',
        level: 5,
        exp: 120,
        achievements: 3,
      }),
    });

    const { getByTestId, getByText } = render(<HomeScreen />);
    await waitFor(() => {
      expect(getByTestId('home-screen')).toBeTruthy();
      expect(getByText(/Salut, TestUser/i)).toBeTruthy();
    });
  });
});
