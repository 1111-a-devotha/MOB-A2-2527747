import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Skill } from '../data/portfolio';
import { colors, font, radius, spacing } from '../theme/theme';
import { Card } from './ui';

export default function SkillCard({ skill, highlight }: { skill: Skill; highlight?: boolean }) {
  return (
    <Card style={highlight ? styles.highlight : undefined}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons name={skill.icon} size={24} color={colors.primary} />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.name}>{skill.name}</Text>
          <Text style={styles.evidence}>{skill.evidence}</Text>
          {highlight ? <Text style={styles.primaryTag}>My primary skill</Text> : null}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: { flex: 1, gap: 4 },
  name: { fontSize: font.h3, fontWeight: '700', color: colors.text },
  evidence: { fontSize: font.small, color: colors.muted },
  primaryTag: { fontSize: font.small, fontWeight: '700', color: '#5C4300' },
  highlight: { borderColor: colors.accent, borderWidth: 2 },
});
