// __tests__/SignInScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInScreen from '../app/screens/SignInScreen';
import { signIn, signUp } from '../authService';
import { Alert } from 'react-native';



// 🔧 Mock de la navigation
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

// 🔧 Mock des fonctions auth
jest.mock('../authService', () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
}));

describe('SignInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rend les champs et boutons de base', () => {
    const { getByPlaceholderText, getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
    expect(getByPlaceholderText("Nom d'utilisateur")).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
    expect(getByText('Se connecter')).toBeTruthy();
    expect(getByText("S'inscrire")).toBeTruthy();
  });

  it("affiche une alerte si l'email ou le mot de passe est vide", async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {}); // ✅ FIX
    const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
    fireEvent.press(getByText('Se connecter'));
    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('appelle signIn si les champs sont remplis', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce(true);
    const { getByPlaceholderText, getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password123');
    fireEvent.press(getByText('Se connecter'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('test@email.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });

  it("appelle signUp avec nom d'utilisateur", async () => {
    (signUp as jest.Mock).mockResolvedValueOnce({ username: 'testuser', userTag: '#1234' });
    const { getByPlaceholderText, getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText("Nom d'utilisateur"), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password123');
    fireEvent.press(getByText("S'inscrire"));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith('test@email.com', 'password123', 'testuser');
    });
  });
});
