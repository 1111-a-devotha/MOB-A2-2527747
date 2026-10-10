import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';

import { AVAILABILITY_OPTIONS, DEFAULT_PROFILE, Profile } from '../data/portfolio';

// Low-risk class data only. No passwords, tokens or sensitive records are stored.
const KEY = '@devothaportfolio/profile/v1';

function isAvailability(v: unknown): v is Profile['availability'] {
  return typeof v === 'string' && (AVAILABILITY_OPTIONS as readonly string[]).includes(v);
}

/** Load the saved profile, or null when nothing was saved or the data is unreadable. */
export async function loadProfile(): Promise<Profile | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Profile>;

    let imageUri: string | null = typeof data.imageUri === 'string' ? data.imageUri : null;
    if (imageUri) {
      // Make sure the saved local image file still exists after a restart.
      try {
        const info = await FileSystem.getInfoAsync(imageUri);
        if (!info.exists) imageUri = null;
      } catch {
        imageUri = null;
      }
    }

    return {
      headline: typeof data.headline === 'string' ? data.headline : DEFAULT_PROFILE.headline,
      bio: typeof data.bio === 'string' ? data.bio : DEFAULT_PROFILE.bio,
      primarySkill:
        typeof data.primarySkill === 'string' ? data.primarySkill : DEFAULT_PROFILE.primarySkill,
      availability: isAvailability(data.availability)
        ? data.availability
        : DEFAULT_PROFILE.availability,
      imageUri,
    };
  } catch {
    return null;
  }
}

export async function saveProfile(profile: Profile): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(profile));
}

export async function clearProfile(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}

/**
 * Copy a picked or captured image from the temporary cache into the app's own
 * document folder so the reference survives restarts. Falls back to the original
 * URI if the copy fails.
 */
export async function persistImage(tempUri: string): Promise<string> {
  try {
    const dir = FileSystem.documentDirectory;
    if (!dir) return tempUri;
    const target = `${dir}profile-${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: tempUri, to: target });
    return target;
  } catch {
    return tempUri;
  }
}

export async function deleteImageFile(uri: string | null): Promise<void> {
  if (!uri) return;
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch {
    // Nothing to do: the file may already be gone.
  }
}
