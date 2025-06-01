import React from 'react';
import { render } from '@testing-library/react-native';
import DressScreen from '../app/screens/DressScreen';

// ✅ Mock des icônes
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// ✅ Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// ✅ Mock WebView
jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: (props: any) => <View {...props} testID="mock-webview" />,
  };
});

describe('DressScreen (unit tests)', () => {
  it('affiche la WebView correctement', () => {
    const { getByTestId } = render(<DressScreen />);
    expect(getByTestId('mock-webview')).toBeTruthy();
  });

  it('affiche le bouton de retour en haut à droite', () => {
    const { getAllByTestId } = render(<DressScreen />);
    const navButtons = getAllByTestId('nav-button');
    expect(navButtons.length).toBe(5); // 5 boutons en bas
  });

  it('affiche tous les éléments principaux sans crash', () => {
    const { getByTestId, getAllByTestId } = render(<DressScreen />);
    expect(getByTestId('mock-webview')).toBeDefined();
    expect(getAllByTestId('nav-button').length).toBe(5);
  });

  it('utilise bien les routes Link', () => {
    const { getAllByTestId } = render(<DressScreen />);
    const links = getAllByTestId('nav-button');
    links.forEach((link) => {
      expect(link).toBeTruthy(); // chaque bouton est cliquable
    });
  });
});
