import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProfileProvider, useProfile } from './src/storage/ProfileContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/theme';

function Gate() {
  const { ready } = useProfile();
  if (!ready) {
    return (
      <View style={styles.loading} accessibilityLabel="Loading your saved profile">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return <RootNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <StatusBar style="light" backgroundColor={colors.primaryDark} />
        <Gate />
      </ProfileProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
