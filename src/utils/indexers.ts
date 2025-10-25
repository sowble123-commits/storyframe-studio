// src/utils/indexers.ts
import type { Project, Sequence, Scene, Shot } from './types'

/**
 * StoryFrame Studio
 * 인덱스 유틸 (평면 구조 버전)
 * ---------------------------------------
 * Project 내부의 모든 요소를 빠르게 찾을 수 있도록
 * id 기반 Map 인덱스를 생성한다.
 */

export interface ProjectIndex {
  sequences: Map<string, Sequence>
  scenes: Map<string, Scene>
  shots: Map<string, Shot>
  parentMap: Map<string, string> // childId -> parentId
}

/**
 * 평면 구조의 Project에서 ID 기반 인덱스 생성
 */
export function buildIndex(project: Project): ProjectIndex {
  const sequences = new Map<string, Sequence>()
  const scenes = new Map<string, Scene>()
  const shots = new Map<string, Shot>()
  const parentMap = new Map<string, string>()

  // 모든 시퀀스 등록
  project.sequences.forEach((seq) => {
    sequences.set(seq.id, seq)

    // 시퀀스 → 씬 관계 등록
    seq.sceneIds?.forEach((sceneId) => {
      parentMap.set(sceneId, seq.id)
    })
  })

  // 모든 씬 등록
  project.scenes.forEach((scene) => {
    scenes.set(scene.id, scene)

    // 씬 → 샷 관계 등록
    scene.shotIds?.forEach((shotId) => {
      parentMap.set(shotId, scene.id)
    })
  })

  // 모든 샷 등록
  project.shots.forEach((shot) => {
    shots.set(shot.id, shot)
  })

  return {
    sequences,
    scenes,
    shots,
    parentMap,
  }
}

/**
 * 특정 시퀀스 ID로 해당 씬 배열 반환
 */
export function getScenesBySequence(project: Project, sequenceId: string): Scene[] {
  const seq = project.sequences.find((s) => s.id === sequenceId)
  if (!seq || !seq.sceneIds) return []
  return project.scenes.filter((scene) => seq.sceneIds?.includes(scene.id))
}

/**
 * 특정 씬 ID로 해당 샷 배열 반환
 */
export function getShotsByScene(project: Project, sceneId: string): Shot[] {
  const scene = project.scenes.find((s) => s.id === sceneId)
  if (!scene || !scene.shotIds) return []
  return project.shots.filter((shot) => scene.shotIds?.includes(shot.id))
}

/**
 * 특정 시퀀스 ID로 전체 샷 반환 (씬 단위 포함)
 */
export function getShotsBySequence(project: Project, sequenceId: string): Shot[] {
  const seq = project.sequences.find((s) => s.id === sequenceId)
  if (!seq || !seq.sceneIds) return []

  const relatedScenes = project.scenes.filter((scene) => seq.sceneIds?.includes(scene.id))
  const allShots: Shot[] = []

  relatedScenes.forEach((scene: Scene) => {
    const shotsInScene = project.shots.filter((shot: Shot) =>
      scene.shotIds?.includes(shot.id)
    )
    allShots.push(...shotsInScene)
  })

  return allShots
}
