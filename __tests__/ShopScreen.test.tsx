import React from 'react';
import { render } from '@testing-library/react-native';
import ShopScreen from '../app/screens/ShopScreen';

// ✅ mock Ionicons pour éviter l'erreur de police
jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => null,
  };
});

// ✅ mock expo-router Link
jest.mock('expo-router', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('ShopScreen', () => {
  it('affiche le composant sans crasher', () => {
    const { getByTestId } = render(<ShopScreen />);
    expect(getByTestId('shop-screen')).toBeTruthy();
  });
});
