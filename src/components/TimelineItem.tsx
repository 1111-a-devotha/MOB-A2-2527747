import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TimelineEntry } from '../data/portfolio';
import { colors, font, spacing } from '../theme/theme';

export default function TimelineItem({
  entry,
  last,
}: {
  entry: TimelineEntry;
  last?: boolean;
}) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${entry.period}. ${entry.title}. ${entry.place}. ${entry.detail}`}>
      <View style={styles.rail}>
        <View style={styles.dot} />
        {!last ? <View style={styles.line} /> : null}
      </View>
      <View style={[styles.body, !last && { paddingBottom: spacing.lg }]}>
        <Text style={styles.period}>{entry.period}</Text>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.place}>{entry.place}</Text>
        <Text style={styles.detail}>{entry.detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  rail: { width: 16, alignItems: 'center' },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
    borderWidth: 3,
    borderColor: colors.primary,
    marginTop: 4,
  },
  line: { flex: 1, width: 2, backgroundColor: colors.border, marginTop: 2 },
  body: { flex: 1, gap: 2 },
  period: { fontSize: font.small, fontWeight: '700', color: colors.primary },
  title: { fontSize: font.h3, fontWeight: '700', color: colors.text },
  place: { fontSize: font.small, color: colors.muted, fontWeight: '600' },
  detail: { fontSize: font.small, color: colors.text },
});
