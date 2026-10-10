import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Project } from '../data/portfolio';
import { colors, font, radius, spacing } from '../theme/theme';
import { Chip } from './ui';

export default function ProjectCard({
  project,
  onPress,
}: {
  project: Project;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${project.title}. ${project.tagline}`}
      accessibilityHint="Opens the project details"
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.tagline}>{project.tagline}</Text>
      <View style={styles.chips}>
        {project.technologies.slice(0, 3).map((t) => (
          <Chip key={t} label={t} />
        ))}
      </View>
      <View style={styles.more}>
        <Text style={styles.moreText}>View details</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.primary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 6,
    borderLeftColor: colors.accent,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: { fontSize: font.h3, fontWeight: '700', color: colors.text },
  tagline: { fontSize: font.small, color: colors.muted },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  more: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' },
  moreText: { fontSize: font.small, fontWeight: '700', color: colors.primary },
});
