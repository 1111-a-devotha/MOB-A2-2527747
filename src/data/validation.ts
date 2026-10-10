import { AVAILABILITY_OPTIONS, Profile } from './portfolio';

export type EditableFields = Pick<Profile, 'headline' | 'bio' | 'primarySkill' | 'availability'>;

export type ProfileErrors = Partial<Record<keyof EditableFields, string>>;

export const LIMITS = {
  headline: { min: 10, max: 80 },
  bio: { min: 40, max: 300 },
  primarySkill: { min: 2, max: 40 },
};

/**
 * Validation rules for the profile editor.
 * 1. Headline: required, 10 to 80 characters.
 * 2. Bio: required, 40 to 300 characters.
 * 3. Primary skill: required, 2 to 40 characters and must contain a letter.
 * 4. Availability: must be one of the listed options.
 */
export function validateProfile(f: EditableFields): ProfileErrors {
  const errors: ProfileErrors = {};

  const headline = f.headline.trim();
  if (headline.length === 0) {
    errors.headline = 'Headline is required.';
  } else if (headline.length < LIMITS.headline.min) {
    errors.headline = `Headline is too short. Use at least ${LIMITS.headline.min} characters.`;
  } else if (headline.length > LIMITS.headline.max) {
    errors.headline = `Headline is too long. Use at most ${LIMITS.headline.max} characters.`;
  }

  const bio = f.bio.trim();
  if (bio.length === 0) {
    errors.bio = 'Short biography is required.';
  } else if (bio.length < LIMITS.bio.min) {
    errors.bio = `Write at least ${LIMITS.bio.min} characters so a recruiter understands you.`;
  } else if (bio.length > LIMITS.bio.max) {
    errors.bio = `Biography is too long. Use at most ${LIMITS.bio.max} characters.`;
  }

  const skill = f.primarySkill.trim();
  if (skill.length === 0) {
    errors.primarySkill = 'Primary skill is required.';
  } else if (skill.length < LIMITS.primarySkill.min) {
    errors.primarySkill = 'Primary skill is too short.';
  } else if (skill.length > LIMITS.primarySkill.max) {
    errors.primarySkill = `Primary skill is too long. Use at most ${LIMITS.primarySkill.max} characters.`;
  } else if (!/[A-Za-z]/.test(skill)) {
    errors.primarySkill = 'Primary skill must contain letters, not only numbers or symbols.';
  }

  if (!(AVAILABILITY_OPTIONS as readonly string[]).includes(f.availability)) {
    errors.availability = 'Choose one availability status.';
  }

  return errors;
}
