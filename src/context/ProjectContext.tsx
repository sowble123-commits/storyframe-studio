import React, { createContext, useState, ReactNode } from 'react';
import { Project } from '../utils/types';

// ✅ 이걸 추가!
export interface ProjectContextType {
    project: Project | null;
    setProject: (project: Project) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [project, setProject] = useState<Project | null>(null);

    return (
        <ProjectContext.Provider value={{ project, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
