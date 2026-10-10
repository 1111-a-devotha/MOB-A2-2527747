import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Avatar from '../components/Avatar';
import ProjectCard from '../components/ProjectCard';
import { AppButton, Card, Chip, Screen, SectionTitle } from '../components/ui';
import { PROJECTS, STUDENT } from '../data/portfolio';
import type { TabParamList } from '../navigation/types';
import { useProfile } from '../storage/ProfileContext';
import { colors, font, radius, spacing } from '../theme/theme';

export default function HomeScreen() {
  const { profile } = useProfile();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  return (
    <Screen>
      <View style={styles.hero}>
        {/* The first sentence on the Home screen is the required identity sentence. */}
        <Text style={styles.name} accessibilityRole="header">
          My name is {STUDENT.fullName}.
        </Text>
        <View style={styles.heroRow}>
          <Avatar uri={profile.imageUri} size={92} />
          <View style={styles.heroText}>
            <Text style={styles.headline}>{profile.headline}</Text>
            <Chip label={profile.availability} tone="amber" />
          </View>
        </View>
      </View>

      <Card>
        <SectionTitle icon="person-circle-outline">About me</SectionTitle>
        <Text style={styles.body}>{profile.bio}</Text>
        <Text style={styles.body}>
          <Text style={styles.bold}>Primary skill: </Text>
          {profile.primarySkill}
        </Text>
      </Card>

      <Card style={styles.codeCard}>
        <View style={styles.codeRow}>
          <Ionicons name="shield-checkmark" size={22} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.codeLabel}>Verification code</Text>
            <Text style={styles.code} selectable>
              {STUDENT.verificationCode}
            </Text>
          </View>
        </View>
        <Chip label="Works offline. No internet needed." tone="blue" />
      </Card>

      <SectionTitle icon="folder-open-outline">Featured projects</SectionTitle>
      {PROJECTS.map((p) => (
        <ProjectCard
          key={p.id}
          project={p}
          onPress={() =>
            navigation.navigate('ProjectsTab', {
              screen: 'ProjectDetails',
              params: { projectId: p.id },
            })
          }
        />
      ))}

      <AppButton
        label="See my skills and education"
        icon="ribbon-outline"
        variant="secondary"
        onPress={() => navigation.navigate('Skills')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  name: { fontSize: font.title, fontWeight: '800', color: colors.white },
  heroRow: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center' },
  heroText: { flex: 1, gap: spacing.sm },
  headline: { fontSize: font.body, color: '#EAF3EE', fontWeight: '600' },
  body: { fontSize: font.body, color: colors.text, lineHeight: 24 },
  bold: { fontWeight: '700' },
  codeCard: { borderColor: colors.accent, borderWidth: 2 },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  codeLabel: { fontSize: font.small, color: colors.muted, fontWeight: '600' },
  code: { fontSize: font.h2, fontWeight: '800', color: colors.primaryDark, letterSpacing: 1 },
});
