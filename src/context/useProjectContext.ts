import { useContext } from 'react';
import { ProjectContext } from './ProjectContext';
import type { ProjectContextType } from './ProjectContext';

export function useProjectContext(): ProjectContextType {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("❌ ProjectContext is undefined. Make sure you're inside <ProjectProvider>.");
    }
    return context;
}
