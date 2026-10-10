import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Avatar from '../components/Avatar';
import FormField from '../components/FormField';
import { AppButton, Banner, Card, Screen, SectionTitle } from '../components/ui';
import { AVAILABILITY_OPTIONS } from '../data/portfolio';
import { EditableFields, LIMITS, ProfileErrors, validateProfile } from '../data/validation';
import { useProfile } from '../storage/ProfileContext';
import { colors, font, radius, spacing } from '../theme/theme';

type Message = { tone: 'success' | 'error' | 'info'; text: string; settings?: boolean };

export default function EditProfileScreen() {
  const { profile, saveFields, setImage, removeImage, resetAll } = useProfile();

  const [draft, setDraft] = useState<EditableFields>({
    headline: profile.headline,
    bio: profile.bio,
    primarySkill: profile.primarySkill,
    availability: profile.availability,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof EditableFields, boolean>>>({});
  const [formMessage, setFormMessage] = useState<Message | null>(null);
  const [mediaMessage, setMediaMessage] = useState<Message | null>(null);
  const [busy, setBusy] = useState(false);

  // Keep the form in sync after a reset or when saved data loads.
  useEffect(() => {
    setDraft({
      headline: profile.headline,
      bio: profile.bio,
      primarySkill: profile.primarySkill,
      availability: profile.availability,
    });
    setTouched({});
  }, [profile.headline, profile.bio, profile.primarySkill, profile.availability]);

  const errors: ProfileErrors = useMemo(() => validateProfile(draft), [draft]);
  const dirty =
    draft.headline !== profile.headline ||
    draft.bio !== profile.bio ||
    draft.primarySkill !== profile.primarySkill ||
    draft.availability !== profile.availability;

  const update = <K extends keyof EditableFields>(key: K, value: EditableFields[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setFormMessage(null);
  };
  const touch = (key: keyof EditableFields) => setTouched((t) => ({ ...t, [key]: true }));
  const shown = (key: keyof EditableFields) => (touched[key] ? errors[key] : undefined);

  const onSave = async () => {
    setTouched({ headline: true, bio: true, primarySkill: true, availability: true });
    const count = Object.keys(errors).length;
    if (count > 0) {
      setFormMessage({
        tone: 'error',
        text: `Not saved. Fix ${count} highlighted ${count === 1 ? 'field' : 'fields'} and try again.`,
      });
      return;
    }
    try {
      await saveFields(draft);
      setFormMessage({ tone: 'success', text: 'Profile saved on this phone.' });
    } catch {
      setFormMessage({ tone: 'error', text: 'Could not save. Please try again.' });
    }
  };

  const handleResult = async (result: ImagePicker.ImagePickerResult) => {
    if (result.canceled || !result.assets || result.assets.length === 0) {
      setMediaMessage({ tone: 'info', text: 'Cancelled. Your current photo was kept.' });
      return;
    }
    await setImage(result.assets[0].uri);
    setMediaMessage({ tone: 'success', text: 'Photo saved on this phone.' });
  };

  const takePhoto = async () => {
    setBusy(true);
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        setMediaMessage({
          tone: 'error',
          text: 'Camera permission was denied. You can choose a photo from the gallery instead, or allow the camera in Settings.',
          settings: !perm.canAskAgain,
        });
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      await handleResult(result);
    } catch {
      setMediaMessage({ tone: 'error', text: 'The camera could not be opened on this device.' });
    } finally {
      setBusy(false);
    }
  };

  const pickFromGallery = async () => {
    setBusy(true);
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        setMediaMessage({
          tone: 'error',
          text: 'Photo access was denied. You can take a photo with the camera instead, or allow photo access in Settings.',
          settings: !perm.canAskAgain,
        });
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      await handleResult(result);
    } catch {
      setMediaMessage({ tone: 'error', text: 'The gallery could not be opened on this device.' });
    } finally {
      setBusy(false);
    }
  };

  const confirmRemove = () => {
    Alert.alert('Remove photo?', 'Your initials avatar will be shown instead.', [
      { text: 'Keep photo', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await removeImage();
          setMediaMessage({ tone: 'info', text: 'Photo removed. Your initials avatar is shown.' });
        },
      },
    ]);
  };

  const confirmReset = () => {
    Alert.alert(
      'Reset everything?',
      'This deletes your saved profile and photo and restores the original text.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAll();
            setMediaMessage(null);
            setFormMessage({ tone: 'info', text: 'Profile reset to the original text.' });
          },
        },
      ],
    );
  };

  const hasPhoto = !!profile.imageUri;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen keyboard>
        <Card>
          <SectionTitle icon="camera-outline">Profile photo</SectionTitle>
          <View style={styles.photoRow}>
            <Avatar uri={profile.imageUri} size={110} />
            <Text style={styles.photoHint}>
              {hasPhoto
                ? 'This is the preview of your saved photo.'
                : 'No photo yet. Your initials avatar is shown.'}
            </Text>
          </View>

          {mediaMessage ? (
            <Banner tone={mediaMessage.tone} text={mediaMessage.text}>
              {mediaMessage.settings ? (
                <AppButton
                  label="Open Settings"
                  variant="secondary"
                  icon="settings-outline"
                  onPress={() => Linking.openSettings()}
                />
              ) : null}
            </Banner>
          ) : null}

          <AppButton
            label={hasPhoto ? 'Replace with camera' : 'Take photo'}
            icon="camera"
            onPress={takePhoto}
            disabled={busy}
          />
          <AppButton
            label={hasPhoto ? 'Replace from gallery' : 'Choose from gallery'}
            icon="images"
            variant="secondary"
            onPress={pickFromGallery}
            disabled={busy}
          />
          {hasPhoto ? (
            <AppButton
              label="Remove photo"
              icon="trash-outline"
              variant="danger"
              onPress={confirmRemove}
              disabled={busy}
            />
          ) : null}
        </Card>

        <Card>
          <SectionTitle icon="create-outline">Edit profile</SectionTitle>

          <FormField
            label="Headline"
            value={draft.headline}
            onChangeText={(t) => update('headline', t)}
            onBlur={() => touch('headline')}
            error={shown('headline')}
            helper="One line that says who you are."
            maxLength={LIMITS.headline.max}
          />
          <FormField
            label="Short biography"
            value={draft.bio}
            onChangeText={(t) => update('bio', t)}
            onBlur={() => touch('bio')}
            error={shown('bio')}
            helper="Two or three sentences for a recruiter."
            multiline
            maxLength={LIMITS.bio.max}
          />
          <FormField
            label="Primary skill"
            value={draft.primarySkill}
            onChangeText={(t) => update('primarySkill', t)}
            onBlur={() => touch('primarySkill')}
            error={shown('primarySkill')}
            helper="Use the exact name of one skill to highlight it on the Skills tab."
            maxLength={LIMITS.primarySkill.max}
          />

          <View style={{ gap: 6 }}>
            <Text style={styles.label}>Availability status</Text>
            <View style={styles.options} accessibilityRole="radiogroup">
              {AVAILABILITY_OPTIONS.map((opt) => {
                const selected = draft.availability === opt;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => {
                      update('availability', opt);
                      touch('availability');
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    accessibilityLabel={opt}
                    style={[styles.option, selected && styles.optionSelected]}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {shown('availability') ? (
              <Text style={styles.error}>{shown('availability')}</Text>
            ) : null}
          </View>

          {dirty ? <Text style={styles.dirty}>You have unsaved changes.</Text> : null}
          {formMessage ? <Banner tone={formMessage.tone} text={formMessage.text} /> : null}

          <AppButton label="Save profile" icon="save-outline" onPress={onSave} />
        </Card>

        <Card>
          <SectionTitle icon="refresh-outline">Reset</SectionTitle>
          <Text style={styles.photoHint}>
            Delete the saved profile and photo from this phone and start again.
          </Text>
          <AppButton label="Reset to defaults" variant="danger" onPress={confirmReset} />
        </Card>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  photoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  photoHint: { flex: 1, fontSize: font.small, color: colors.muted },
  label: { fontSize: font.body, fontWeight: '700', color: colors.text },
  options: { gap: spacing.sm },
  option: {
    minHeight: 48,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  optionSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  optionText: { fontSize: font.body, color: colors.text },
  optionTextSelected: { fontWeight: '700', color: colors.primaryDark },
  error: { fontSize: font.small, color: colors.danger, fontWeight: '600' },
  dirty: { fontSize: font.small, color: '#5C4300', fontWeight: '700' },
});
