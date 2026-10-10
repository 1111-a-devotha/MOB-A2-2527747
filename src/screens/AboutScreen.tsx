import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import { AppButton, Banner, Card, Chip, Screen, SectionTitle } from '../components/ui';
import { OPTIONAL_LINK, STUDENT } from '../data/portfolio';
import { colors, font, spacing } from '../theme/theme';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} selectable>
        {value}
      </Text>
    </View>
  );
}

export default function AboutScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Screen>
      <Card>
        <SectionTitle icon="information-circle-outline">About this app</SectionTitle>
        <Row label="App name" value={STUDENT.appName} />
        <Row label="Student name" value={STUDENT.fullName} />
        <Row label="Registration number" value={STUDENT.registrationNumber} />
        <Row label="Verification code" value={STUDENT.verificationCode} />
        <Row label="Version" value={version} />
        <Row label="Course" value={`${STUDENT.course}, ${STUDENT.institution}`} />
      </Card>

      <Card>
        <SectionTitle icon="lock-closed-outline">Data use</SectionTitle>
        <Text style={styles.body}>
          This app stores your profile text and one profile photo only on this phone, using local
          storage. Nothing is sent to a server. It stores no passwords, tokens or sensitive
          records, and you can delete everything with the Reset button on the Edit tab.
        </Text>
      </Card>

      <Card>
        <SectionTitle icon="cloud-offline-outline">Offline use</SectionTitle>
        <Text style={styles.body}>
          Every screen works in Airplane Mode. Optional online links are clearly marked.
        </Text>
        {OPTIONAL_LINK.url ? (
          <View style={{ gap: spacing.sm }}>
            <Chip label="Needs internet" tone="amber" />
            <AppButton
              label={OPTIONAL_LINK.label}
              icon="open-outline"
              variant="secondary"
              onPress={() => Linking.openURL(OPTIONAL_LINK.url)}
            />
          </View>
        ) : (
          <Banner tone="info" text="No online links are used in this version." />
        )}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { gap: 2, paddingVertical: 4 },
  label: { fontSize: font.small, color: colors.muted, fontWeight: '600' },
  value: { fontSize: font.body, color: colors.text, fontWeight: '700' },
  body: { fontSize: font.body, color: colors.text, lineHeight: 24 },
});
