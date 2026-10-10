import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ProjectCard from '../components/ProjectCard';
import { EmptyState, Screen } from '../components/ui';
import { PROJECTS } from '../data/portfolio';
import type { ProjectsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectList'>;

export default function ProjectsScreen({ navigation }: Props) {
  return (
    <Screen>
      {PROJECTS.length === 0 ? (
        <EmptyState
          icon="folder-open-outline"
          title="No projects yet"
          message="Add your projects in src/data/portfolio.ts and they will appear here."
        />
      ) : (
        PROJECTS.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onPress={() => navigation.navigate('ProjectDetails', { projectId: p.id })}
          />
        ))
      )}
    </Screen>
  );
}
