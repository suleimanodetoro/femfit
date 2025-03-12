import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import your navigation
import RootNavigator from './src/navigation';

// Ignore specific warnings if needed
LogBox.ignoreLogs([
  'Reanimated 2',
  // Add any other warnings you want to suppress
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <RootNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}