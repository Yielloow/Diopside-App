import React from 'react';
import { render } from '@testing-library/react-native';
import DressScreen from '../app/screens/DressScreen';

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock WebView
jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: (props: any) => <View {...props} testID="mock-webview" />,
  };
});

describe('DressScreen', () => {
  it('affiche la WebView et la navbar', () => {
    const { getByTestId, getAllByTestId } = render(<DressScreen />);
    
    // Vérifie que la WebView est présente
    expect(getByTestId('mock-webview')).toBeTruthy();

    // Vérifie qu'il y a 5 boutons dans la navbar
    const buttons = getAllByTestId(/nav-button/i);
    expect(buttons.length).toBe(5);
  });
});
