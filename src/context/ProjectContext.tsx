// src/context/ProjectContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react'
import type { Project } from '@/utils/types'
import { parseProjectJson } from '@/utils/parser'
import { buildIndex } from '@/utils/indexers'

export interface ProjectContextType {
  project: Project | null
  setProject: (project: Project) => void
  loadProject: (raw: unknown) => void
  clearProject: () => void
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null)

  const loadProject = (raw: unknown) => {
    try {
      const parsed = parseProjectJson(raw)
      buildIndex(parsed)
      setProject(parsed)
    } catch (err) {
      console.error('❌ 프로젝트 로드 실패:', err)
    }
  }

  const clearProject = () => setProject(null)

  return (
    <ProjectContext.Provider value={{ project, setProject, loadProject, clearProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

/**
 * 전역 ProjectContext를 안전하게 불러오는 Hook
 */
export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) throw new Error('useProject must be used within a ProjectProvider')
  return context
}
