import React from 'react';
import { StyleSheet, View } from 'react-native';

import SkillCard from '../components/SkillCard';
import TimelineItem from '../components/TimelineItem';
import { Card, EmptyState, Screen, SectionTitle } from '../components/ui';
import { SKILLS, TIMELINE } from '../data/portfolio';
import { useProfile } from '../storage/ProfileContext';
import { spacing } from '../theme/theme';

export default function SkillsScreen() {
  const { profile } = useProfile();
  const primary = profile.primarySkill.trim().toLowerCase();

  return (
    <Screen>
      <SectionTitle icon="construct-outline">Skills</SectionTitle>
      {SKILLS.length === 0 ? (
        <EmptyState
          icon="construct-outline"
          title="No skills added yet"
          message="Add your skills in src/data/portfolio.ts and they will appear here."
        />
      ) : (
        <View style={styles.list}>
          {SKILLS.map((s) => (
            <SkillCard
              key={s.id}
              skill={s}
              highlight={primary.length > 0 && s.name.toLowerCase() === primary}
            />
          ))}
        </View>
      )}

      <SectionTitle icon="school-outline">Education and training</SectionTitle>
      <Card>
        {TIMELINE.map((t, i) => (
          <TimelineItem key={t.id} entry={t} last={i === TIMELINE.length - 1} />
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
});
