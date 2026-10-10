import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DEFAULT_PROFILE, Profile } from '../data/portfolio';
import { EditableFields } from '../data/validation';
import {
  clearProfile,
  deleteImageFile,
  loadProfile,
  persistImage,
  saveProfile,
} from './profileStorage';

interface ProfileContextValue {
  profile: Profile;
  ready: boolean;
  /** Save headline, bio, primary skill and availability. */
  saveFields: (fields: EditableFields) => Promise<void>;
  /** Set a new profile image (temporary URI from the camera or gallery). */
  setImage: (tempUri: string) => Promise<void>;
  removeImage: () => Promise<void>;
  /** Delete everything saved and go back to the defaults. */
  resetAll: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadProfile().then((saved) => {
      if (!active) return;
      if (saved) setProfile(saved);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const saveFields = useCallback(
    async (fields: EditableFields) => {
      const next: Profile = {
        ...profile,
        headline: fields.headline.trim(),
        bio: fields.bio.trim(),
        primarySkill: fields.primarySkill.trim(),
        availability: fields.availability,
      };
      await saveProfile(next);
      setProfile(next);
    },
    [profile],
  );

  const setImage = useCallback(
    async (tempUri: string) => {
      const stored = await persistImage(tempUri);
      const previous = profile.imageUri;
      const next: Profile = { ...profile, imageUri: stored };
      await saveProfile(next);
      setProfile(next);
      if (previous && previous !== stored) await deleteImageFile(previous);
    },
    [profile],
  );

  const removeImage = useCallback(async () => {
    const previous = profile.imageUri;
    const next: Profile = { ...profile, imageUri: null };
    await saveProfile(next);
    setProfile(next);
    await deleteImageFile(previous);
  }, [profile]);

  const resetAll = useCallback(async () => {
    await deleteImageFile(profile.imageUri);
    await clearProfile();
    setProfile(DEFAULT_PROFILE);
  }, [profile.imageUri]);

  const value = useMemo(
    () => ({ profile, ready, saveFields, setImage, removeImage, resetAll }),
    [profile, ready, saveFields, setImage, removeImage, resetAll],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
}
