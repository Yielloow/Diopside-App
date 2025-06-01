// Ce fichier est importé UNIQUEMENT sur le web
jest.mock('react-native-vision-camera', () => ({
    // Simule des fonctions vides pour éviter les crashes
    Camera: () => null,
    useCameraDevices: () => ({ back: null }),
  }));
  