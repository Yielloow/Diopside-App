// app/screens/AvatarUnityScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function AvatarUnityScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://diopside-app.web.app' }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});
