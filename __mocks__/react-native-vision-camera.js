jest.mock('react-native-vision-camera', () => ({
    Camera: {
      requestCameraPermission: jest.fn(() => Promise.resolve('granted')),
    },
    useCameraDevices: () => [
      {
        id: '1',
        name: 'Back Camera',
        position: 'back',
      },
      {
        id: '2',
        name: 'Front Camera',
        position: 'front',
      },
    ],
  }));
  