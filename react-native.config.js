const isDetox = process.env.DETOX === 'true';

module.exports = {
  dependencies: isDetox ? {
    'react-native-vision-camera': {
      platforms: {
        android: null, // 👈 Ignore le module sur Android
      },
    },
  } : {},
};
