import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import AboutScreen from '../screens/AboutScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import SkillsScreen from '../screens/SkillsScreen';
import { colors } from '../theme/theme';
import type { ProjectsStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<ProjectsStackParamList>();

const headerOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '700' as const },
};

/** Stack nested inside the Projects tab: list -> details. Back returns to the list. */
function ProjectsStack() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="ProjectList" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{ title: 'Project Details' }}
      />
    </Stack.Navigator>
  );
}

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background, primary: colors.primary },
};

type IconPair = [React.ComponentProps<typeof Ionicons>['name'], React.ComponentProps<typeof Ionicons>['name']];

const icons: Record<keyof TabParamList, IconPair> = {
  Home: ['home', 'home-outline'],
  Skills: ['ribbon', 'ribbon-outline'],
  ProjectsTab: ['folder-open', 'folder-open-outline'],
  Edit: ['create', 'create-outline'],
  About: ['information-circle', 'information-circle-outline'],
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          ...headerOptions,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarAllowFontScaling: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={icons[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'DevothaPortfolio', tabBarLabel: 'Home' }} />
        <Tab.Screen name="Skills" component={SkillsScreen} options={{ title: 'Skills and Education', tabBarLabel: 'Skills' }} />
        <Tab.Screen
          name="ProjectsTab"
          component={ProjectsStack}
          options={{ headerShown: false, tabBarLabel: 'Projects' }}
        />
        <Tab.Screen name="Edit" component={EditProfileScreen} options={{ title: 'Edit Profile', tabBarLabel: 'Edit' }} />
        <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About', tabBarLabel: 'About' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
