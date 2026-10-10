My name is TUYISINGIZE Devotha.

# DevothaPortfolio

A personal portfolio app that runs as a standalone Android application (no Expo Go) and works fully offline. It is my submission for **SWE 3409 Mobile Application Development, Individual Assignment 2**, INES-Ruhengeri.

| Item | Value |
| --- | --- |
| Student | TUYISINGIZE Devotha |
| Registration number | 25/27747 |
| App name | DevothaPortfolio |
| Verification code | MOB-A2-7747 |
| Android package | `rw.ac.ines.ug2527747.devothaportfolio` |
| Version | 1.0.0 |

## Purpose

A recruiter can install the APK, open it without Expo Go and understand my profile within two minutes: who I am, my skills, my education and two real projects (SPPS and AgriPulse), all offline.

## Features

1. **Home**: exact "My name is TUYISINGIZE Devotha." sentence, profile photo or initials avatar, headline, biography, verification code.
2. **Skills and education**: seven skills with evidence of where I used them, and an education/training timeline, built from reusable components.
3. **Projects**: two projects, each with title, problem, my contribution and technology, plus a separate Project Details screen.
4. **Profile editor**: controlled fields for headline, biography, primary skill and availability, with field-level messages. Rules: headline 10-80 characters; biography 40-300 characters; primary skill 2-40 characters and must contain a letter; availability must be chosen. Invalid saves are blocked.
5. **Navigation**: bottom tabs (Home, Skills, Projects, Edit, About) and a nested stack in the Projects tab (list to details). Back keeps the session.
6. **Profile media**: take a photo or choose from the gallery (Expo ImagePicker), preview, replace, remove, with safe messages for denied permission and cancellation.
7. **Local persistence**: AsyncStorage keeps the profile; the chosen photo is copied into the app's document folder and its path is saved. Everything is restored after restarting the app. A Reset button deletes it all.
8. **Offline behavior**: no feature needs the internet. The optional online link is hidden by default and would be labelled "Needs internet".
9. **About and release information**: app name, student name, registration number, verification code, version and a data-use statement.
10. **Standalone Android release**: APK built with EAS Build (`preview` profile).

## Tech stack

React Native 0.81, Expo SDK 54, TypeScript, React Navigation (bottom tabs and native stack), Expo ImagePicker, Expo FileSystem, `@react-native-async-storage/async-storage`.

## Project structure

```
App.tsx, index.ts          entry point
src/components/            reusable UI (cards, buttons, form field, skill card, timeline, avatar)
src/screens/               Home, Skills, Projects, ProjectDetails, EditProfile, About
src/navigation/            tab and stack navigators, route types
src/storage/               AsyncStorage helpers and profile context
src/data/                  portfolio content and validation rules
src/theme/                 colors, spacing, font sizes
docs/                      UI and UX design PDF
evidence/                  test log, declaration, AI use disclosure
```

## Setup and run

Requires Node.js 20 or newer.

```bash
npm install
npx expo install --fix      # aligns package versions with the Expo SDK
npm run typecheck           # TypeScript check
npx expo start              # development only
```

## Build the APK (EAS)

```bash
npm install -g eas-cli
eas login
eas init                    # first time only, links the project to your Expo account
eas build --platform android --profile preview
```

`eas.json` sets the `preview` profile to `buildType: apk`. Download the finished `.apk` from the link EAS prints and rename it `MOB_A2_2527747.apk`.

## Test record

| Item | Value |
| --- | --- |
| Tested device | FILL IN (brand and model) |
| Android version | FILL IN |
| Final commit hash | FILL IN |
| Release link | FILL IN (https://github.com/YOUR-USERNAME/MOB_A2_2527747/releases/tag/v1.0.0) |
| APK link | FILL IN |

See `evidence/MOB_A2_2527747_TEST_LOG.pdf` for the physical-device tests, including Airplane Mode.

## Known limitations

- Portfolio content (skills, projects, timeline) is edited in `src/data/portfolio.ts`; only headline, biography, primary skill, availability and photo are editable inside the app.
- The app is portrait only and light theme only.
- Android only; not tested on iOS.
- No online features in this version.

## Acknowledgements

Built with Expo and React Navigation. AI assistance is disclosed in `evidence/AI_USE.md`.
