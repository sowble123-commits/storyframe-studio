import type { Project } from './types'

const STORAGE_KEY = 'storyframe_projects'

/**
 * 📦 모든 프로젝트 불러오기
 */
export function loadAllProjects(): Project[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.error('❌ Failed to load projects:', err)
    return []
  }
}

/**
 * 📂 특정 프로젝트 ID로 불러오기
 */
export function loadProjectById(id: string): Project | null {
  const all = loadAllProjects()
  return all.find((p) => p.id === id) || null
}

/**
 * 💾 프로젝트 저장 (있으면 덮어쓰기, 없으면 추가)
 */
export function saveProjectToLocalStorage(project: Project): void {
  const all = loadAllProjects()
  const existingIndex = all.findIndex((p) => p.id === project.id)

  const updatedProject = {
    ...project,
    updatedAt: new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    all[existingIndex] = updatedProject
  } else {
    all.unshift(updatedProject)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

/**
 * ✏️ 프로젝트 이름 수정
 */
export function renameProject(id: string, newName: string): void {
  const all = loadAllProjects()
  const target = all.find((p) => p.id === id)

  if (!target) {
    console.warn(`⚠️ renameProject: 프로젝트 ${id}를 찾을 수 없습니다.`)
    return
  }

  target.name = newName
  target.updatedAt = new Date().toISOString()

  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

/**
 * 🗑️ 프로젝트 삭제
 */
export function deleteProject(id: string): void {
  const all = loadAllProjects()
  const filtered = all.filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

/**
 * 🔄 전체 초기화
 */
export function clearAllProjects(): void {
  localStorage.removeItem(STORAGE_KEY)
}
