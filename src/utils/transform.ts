// src/utils/transform.ts
import type { Project, Sequence, Scene, Shot } from './types'

/**
 * 계층형 JSON(Project 원본)을
 * 내부 상태에서 사용하는 평면 구조 Project로 변환
 * (parser.ts와 동일한 변환 로직, types.ts 구조 기준)
 */
export function normalizeProject(raw: any): Project {
  const sequences: Sequence[] = []
  const scenes: Scene[] = []
  const shots: Shot[] = []

  raw.sequences.forEach((seq: any) => {
    sequences.push({
      id: seq.id,
      name: seq.name,
      sceneIds: seq.scenes.map((s: any) => s.id),
    })

    seq.scenes.forEach((scene: any) => {
      scenes.push({
        id: scene.id,
        name: scene.name,
        shotIds: scene.shots.map((sh: any) => sh.id),
      })

      scene.shots.forEach((sh: any) => {
        shots.push({
          id: sh.id,
          sceneId: scene.id,
          image: sh.image,
          description: sh.description,
        })
      })
    })
  })

  return {
    name: raw.title,
    version: '1.0.0',
    sequences,
    scenes,
    shots,
  }
}
