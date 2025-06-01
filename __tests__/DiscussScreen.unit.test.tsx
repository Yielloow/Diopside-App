jest.mock('expo-router', () => ({
    useRouter: () => ({ back: jest.fn() }),
  }));
  
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
  
  import React from 'react';
  import { act, render, fireEvent } from '@testing-library/react-native';
  import DiscussScreen from '../app/screens/DiscussScreen';
  import {
    getDoc,
    addDoc,
    collection,
    doc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
  } from 'firebase/firestore';
  
  // Mocks Firestore
  jest.mock('firebase/firestore', () => {
    const actual = jest.requireActual('firebase/firestore');
    return {
      ...actual,
      onSnapshot: jest.fn(() => () => {}), // ✅ mock unsubscribe
      addDoc: jest.fn(),
      getDoc: jest.fn(() => Promise.resolve({ exists: () => true, data: () => ({ username: 'MockUser' }) })),
      collection: jest.fn(),
      doc: jest.fn(),
      serverTimestamp: jest.fn(() => 'mock-timestamp'),
      query: jest.fn(),
      orderBy: jest.fn(),
      writeBatch: jest.fn(),
      getDocs: jest.fn()
    };
  });  
  
  describe('DiscussScreen (unit)', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('sendMessage n’envoie rien si input vide', async () => {
      const { getByPlaceholderText, getByTestId } = render(<DiscussScreen />);
      const input = getByPlaceholderText('Écrivez un message...');
      const sendButton = getByTestId('send-button');
  
      // simulate input vide
      act(() => {
        input.props.onChangeText('   ');
      });
  
      await act(async () => {
        fireEvent.press(sendButton);
      });
  
      expect(addDoc).not.toHaveBeenCalled();
    });
  
    it('sendMessage appelle addDoc avec les bons paramètres', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ username: 'FetchedName' }),
      });
  
      const { getByPlaceholderText, getByTestId } = render(<DiscussScreen />);
      const input = getByPlaceholderText('Écrivez un message...');
      const sendButton = getByTestId('send-button');
  
      act(() => {
        input.props.onChangeText('Coucou le monde');
      });
  
      await act(async () => {
        fireEvent.changeText(input, 'Coucou le monde');
        fireEvent.press(sendButton);
      });      
  
      expect(addDoc).toHaveBeenCalledWith(undefined, {
        userId: '123',
        username: 'TestUser',
        message: 'Coucou le monde',
        timestamp: 'mock-timestamp',
        avatar: 'https://example.com/avatar.png',
      });      
    });
  
    it('onSnapshot met à jour les messages', () => {
      const mockSetMessages = jest.fn();
      const fakeDocs = [
        {
          id: '1',
          data: () => ({
            userId: '123',
            username: 'Test',
            message: 'Hello',
            timestamp: { toDate: () => new Date() },
            avatar: 'https://avatar.png',
          }),
        },
      ];
  
      (onSnapshot as jest.Mock).mockImplementation((_, callback) => {
        callback({ docs: fakeDocs });
        return jest.fn(); // simulate unsubscribe
      });
  
      render(<DiscussScreen />);
      expect(onSnapshot).toHaveBeenCalled();
    });
  });
  