module.exports = {
  preset: 'jest-expo',
  transform: {
      '^.+\\.[jt]sx?$': '<rootDir>/jest.transform.js',
    },      
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  moduleNameMapper: {
      '^expo$': '<rootDir>/__mocks__/expo.js',
      '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '^firebase/(.*)$': '<rootDir>/__mocks__/firebase.js',
    },       
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|expo' +
      '|expo-modules-core' +
      '|@expo' +
      '|expo(-.*)?' +
      '|firebase' +
      '|@firebase' +
      '|@firebase/util' +
      '|react-native-reanimated' +
      '|expo-router' +
      ')',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/playwright/"  // ← Ignore tous les fichiers Playwright
  ],
};
