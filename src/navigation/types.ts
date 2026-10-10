import type { NavigatorScreenParams } from '@react-navigation/native';

export type ProjectsStackParamList = {
  ProjectList: undefined;
  ProjectDetails: { projectId: string };
};

export type TabParamList = {
  Home: undefined;
  Skills: undefined;
  ProjectsTab: NavigatorScreenParams<ProjectsStackParamList> | undefined;
  Edit: undefined;
  About: undefined;
};
