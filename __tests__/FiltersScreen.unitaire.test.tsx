// ✅ Ce mock DOIT être tout en haut, avant tout autre import
jest.mock('react-native-vision-camera', () => {
    const mockRequestCameraPermission = jest.fn(() => Promise.resolve('granted'));
    let mockDevices = [
      { id: '1', name: 'Back Camera', position: 'back' },
      { id: '2', name: 'Front Camera', position: 'front' },
    ];
  
    const MockCamera = () => null;
    (MockCamera as any).requestCameraPermission = mockRequestCameraPermission;
  
    return {
      __esModule: true,
      Camera: MockCamera,
      useCameraDevices: () => mockDevices,
      __mock: {
        mockRequestCameraPermission,
        setDevices: (devices: any[]) => {
          mockDevices = devices;
        },
      },
    };
  });
  
  import React from 'react';
  import { render, waitFor } from '@testing-library/react-native';
  import FilterScreen from '../app/screens/FiltersScreen';
  
  // ✅ Mock expo-router
  jest.mock('expo-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
  }));
  
  // ✅ On récupère __mock via require
  const visionMock = require('react-native-vision-camera').__mock;
  
  describe('FilterScreen (unit tests)', () => {
    beforeEach(() => {
      visionMock.mockRequestCameraPermission.mockClear();
      visionMock.setDevices([
        { id: '1', name: 'Back Camera', position: 'back' },
        { id: '2', name: 'Front Camera', position: 'front' },
      ]);
      visionMock.mockRequestCameraPermission.mockResolvedValue('granted');
    });
  
    it('affiche le titre principal', async () => {
      const { getByText } = render(<FilterScreen />);
      await waitFor(() => {
        expect(getByText('Sois magnifique')).toBeTruthy();
      });
    });
  
    it('affiche message refus si permission refusée', async () => {
      visionMock.mockRequestCameraPermission.mockResolvedValueOnce('denied');
      const { getByText } = render(<FilterScreen />);
      await waitFor(() => {
        expect(getByText(/Accès à la caméra refusé/)).toBeTruthy();
      });
    });
  
    it('affiche message de chargement si aucun device', async () => {
      visionMock.setDevices([]); // simulate no camera
      const { getByText } = render(<FilterScreen />);
      await waitFor(() => {
        expect(getByText(/Chargement de la caméra/)).toBeTruthy();
      });
    });
  });
  