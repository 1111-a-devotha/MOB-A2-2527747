import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { STUDENT } from '../data/portfolio';
import { colors } from '../theme/theme';

/** Profile picture, or a student-created initials avatar when no photo is set. */
export default function Avatar({ uri, size = 96 }: { uri: string | null; size?: number }) {
  const radius = size / 2;
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: radius, backgroundColor: colors.border }}
        accessibilityRole="image"
        accessibilityLabel={`Profile photo of ${STUDENT.fullName}`}
      />
    );
  }
  return (
    <View
      style={[styles.avatar, { width: size, height: size, borderRadius: radius }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Initials avatar for ${STUDENT.fullName}`}
    >
      <Text style={[styles.initials, { fontSize: size * 0.36 }]} allowFontScaling={false}>
        {STUDENT.initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  initials: { fontWeight: '800', color: colors.primaryDark },
});
