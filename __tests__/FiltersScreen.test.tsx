// 📁 __tests__/FiltersScreen.test.tsx
jest.mock('expo-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
  }));
  
  jest.mock('react-native-vision-camera', () => {
    return {
      __esModule: true,
      Camera: jest.fn(() => null),
      useCameraDevices: () => [
        { id: '1', position: 'back' },
        { id: '2', position: 'front' },
      ],
      CameraDevice: {},
    };
  });
  
  // Mock de la méthode static requestCameraPermission
  import { Camera } from 'react-native-vision-camera';
  (Camera as any).requestCameraPermission = jest.fn(() => Promise.resolve('granted'));
  
  import React from 'react';
  import { render, waitFor } from '@testing-library/react-native';
  import FilterScreen from '../app/screens/FiltersScreen';
  
  describe('FilterScreen', () => {
    it('render le titre de la caméra', async () => {
      const { getByText } = render(<FilterScreen />);
      await waitFor(() => expect(getByText('Sois magnifique')).toBeTruthy());
    });
  });
  