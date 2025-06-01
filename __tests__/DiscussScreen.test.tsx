// 📁 __tests__/DiscussScreen.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import DiscussScreen from '../app/screens/DiscussScreen';

jest.mock('../firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: '123',
      displayName: 'TestUser',
      photoURL: 'https://example.com/avatar.png',
    },
  },
  db: {},
}));

describe('DiscussScreen', () => {
  it('affiche le champ de message', () => {
    const { getByPlaceholderText } = render(<DiscussScreen />);
    expect(getByPlaceholderText('Écrivez un message...')).toBeTruthy();
  });
});