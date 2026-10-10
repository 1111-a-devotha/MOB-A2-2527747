import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, font, radius, spacing } from '../theme/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

/** Scrollable page wrapper with consistent padding. Works with large system text. */
export function Screen({
  children,
  keyboard = false,
}: {
  children: React.ReactNode;
  keyboard?: boolean;
}) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps={keyboard ? 'handled' : 'never'}
    >
      {children}
    </ScrollView>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children, icon }: { children: string; icon?: IconName }) {
  return (
    <View style={styles.sectionRow} accessible accessibilityRole="header">
      {icon ? <Ionicons name={icon} size={20} color={colors.primary} /> : null}
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

export function Chip({
  label,
  tone = 'green',
}: {
  label: string;
  tone?: 'green' | 'amber' | 'blue';
}) {
  const bg =
    tone === 'amber' ? colors.accentSoft : tone === 'blue' ? colors.infoSoft : colors.primarySoft;
  const fg = tone === 'amber' ? '#5C4300' : tone === 'blue' ? colors.info : colors.primaryDark;
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Text style={[styles.chipText, { color: fg }]}>{label}</Text>
    </View>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  hint,
}: {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  disabled?: boolean;
  hint?: string;
}) {
  const palette = {
    primary: { bg: colors.primary, fg: colors.white, border: colors.primary },
    secondary: { bg: colors.surface, fg: colors.primaryDark, border: colors.primary },
    danger: { bg: colors.surface, fg: colors.danger, border: colors.danger },
    ghost: { bg: 'transparent', fg: colors.primaryDark, border: 'transparent' },
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.45 },
      ]}
    >
      {icon ? <Ionicons name={icon} size={20} color={palette.fg} /> : null}
      <Text style={[styles.buttonText, { color: palette.fg }]}>{label}</Text>
    </Pressable>
  );
}

/** Banner for success, error and info messages. */
export function Banner({
  tone,
  text,
  children,
}: {
  tone: 'success' | 'error' | 'info';
  text: string;
  children?: React.ReactNode;
}) {
  const map = {
    success: { bg: colors.successSoft, fg: colors.success, icon: 'checkmark-circle' as IconName },
    error: { bg: colors.dangerSoft, fg: colors.danger, icon: 'alert-circle' as IconName },
    info: { bg: colors.infoSoft, fg: colors.info, icon: 'information-circle' as IconName },
  }[tone];
  return (
    <View
      style={[styles.banner, { backgroundColor: map.bg }]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View style={styles.bannerRow}>
        <Ionicons name={map.icon} size={20} color={map.fg} />
        <Text style={[styles.bannerText, { color: map.fg }]}>{text}</Text>
      </View>
      {children}
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  message,
  children,
}: {
  icon: IconName;
  title: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon} size={40} color={colors.muted} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  screenContent: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  sectionTitle: { fontSize: font.h2, fontWeight: '700', color: colors.text, flexShrink: 1 },
  chip: {
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  chipText: { fontSize: font.small, fontWeight: '600' },
  button: {
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: { fontSize: font.body, fontWeight: '700', flexShrink: 1, textAlign: 'center' },
  banner: { borderRadius: radius.md, padding: spacing.md, gap: spacing.sm },
  bannerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  bannerText: { fontSize: font.small, fontWeight: '600', flex: 1 },
  empty: { alignItems: 'center', padding: spacing.xl, gap: spacing.sm },
  emptyTitle: { fontSize: font.h3, fontWeight: '700', color: colors.text, textAlign: 'center' },
  emptyMessage: { fontSize: font.body, color: colors.muted, textAlign: 'center' },
});
