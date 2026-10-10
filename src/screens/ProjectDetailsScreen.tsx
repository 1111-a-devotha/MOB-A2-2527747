import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton, Card, Chip, EmptyState, Screen, SectionTitle } from '../components/ui';
import { PROJECTS } from '../data/portfolio';
import type { ProjectsStackParamList } from '../navigation/types';
import { colors, font, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectDetails'>;

export default function ProjectDetailsScreen({ route, navigation }: Props) {
  const project = PROJECTS.find((p) => p.id === route.params.projectId);

  if (!project) {
    return (
      <Screen>
        <EmptyState
          icon="alert-circle-outline"
          title="Project not found"
          message="This project does not exist. Go back to the project list."
        >
          <AppButton label="Back to projects" onPress={() => navigation.goBack()} />
        </EmptyState>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {project.title}
        </Text>
        <Text style={styles.tagline}>{project.tagline}</Text>
      </View>

      <Card>
        <SectionTitle icon="help-circle-outline">Problem</SectionTitle>
        <Text style={styles.body}>{project.problem}</Text>
      </Card>

      <Card>
        <SectionTitle icon="hammer-outline">My contribution</SectionTitle>
        <Text style={styles.body}>{project.contribution}</Text>
      </Card>

      <Card>
        <SectionTitle icon="code-slash-outline">Technology used</SectionTitle>
        <View style={styles.chips}>
          {project.technologies.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
      </Card>

      <Card>
        <SectionTitle icon="star-outline">Highlights</SectionTitle>
        {project.highlights.map((h) => (
          <View key={h} style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={[styles.body, styles.bulletText]}>{h}</Text>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle icon="warning-outline">Known limitation</SectionTitle>
        <Text style={styles.body}>{project.limitation}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.xs },
  title: { fontSize: font.title, fontWeight: '800', color: colors.text },
  tagline: { fontSize: font.body, color: colors.muted },
  body: { fontSize: font.body, color: colors.text, lineHeight: 24 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  bulletRow: { flexDirection: 'row', gap: spacing.sm },
  bullet: { fontSize: font.body, color: colors.primary, fontWeight: '800' },
  bulletText: { flex: 1 },
});
