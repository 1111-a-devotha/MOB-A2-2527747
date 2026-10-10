import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, font, radius, spacing } from '../theme/theme';

interface Props {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  onBlur?: () => void;
  error?: string;
  helper?: string;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
}

/** Controlled text field with a label, helper text, character counter and field-level error. */
export default function FormField({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  helper,
  multiline,
  maxLength,
  placeholder,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        textAlignVertical={multiline ? 'top' : 'center'}
        accessibilityLabel={label}
        accessibilityHint={helper}
        style={[
          styles.input,
          multiline && styles.multiline,
          error ? styles.inputError : null,
        ]}
      />
      <View style={styles.metaRow}>
        <Text style={error ? styles.error : styles.helper} accessibilityLiveRegion="polite">
          {error ?? helper ?? ''}
        </Text>
        {maxLength ? (
          <Text style={styles.counter}>
            {value.trim().length}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontSize: font.body, fontWeight: '700', color: colors.text },
  input: {
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: font.body,
    color: colors.text,
  },
  multiline: { minHeight: 120 },
  inputError: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  helper: { flex: 1, fontSize: font.small, color: colors.muted },
  error: { flex: 1, fontSize: font.small, color: colors.danger, fontWeight: '600' },
  counter: { fontSize: font.small, color: colors.muted },
});
