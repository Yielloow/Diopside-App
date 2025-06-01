const mockRequestCameraPermission = jest.fn(() => Promise.resolve('granted'));
let mockDevices = [
  { id: '1', position: 'back', name: 'Back Camera' },
  { id: '2', position: 'front', name: 'Front Camera' },
];

const CameraMock = Object.assign(
  jest.fn(() => null), // Composant <Camera />
  {
    requestCameraPermission: mockRequestCameraPermission,
  }
);

module.exports = {
  __esModule: true,
  Camera: CameraMock,
  useCameraDevices: () => mockDevices,
  __setMockDevices: (devices: any[]) => {
    mockDevices = devices;
  },
  __getMockRequestCameraPermission: () => mockRequestCameraPermission,
};
