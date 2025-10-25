// src/utils/parser.ts
import { z } from 'zod'
import { byOrderOrId } from './sort'
import { buildIndex } from './indexers'
import type { Project, Sequence, Scene, Shot } from './types'

/**
 * StoryFrame Studio
 * JSON 파서 (프로젝트 로드 핵심)
 * ---------------------------------------
 * 1. JSON 구조 검증 (Zod 스키마)
 * 2. 시퀀스/씬/샷 정렬
 * 3. 평면 구조로 변환 (types.ts에 맞춤)
 * 4. 정리된 Project 객체 반환
 */

// Zod 스키마 정의
const shotSchema = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
})

const sceneSchema = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number().optional(),
  shots: z.array(shotSchema).default([]),
})

const sequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number().optional(),
  scenes: z.array(sceneSchema).default([]),
})

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  sequences: z.array(sequenceSchema).default([]),
})

/**
 * 업로드된 JSON을 검증하고 평면 구조의 Project 객체로 변환
 */
export function parseProjectJson(raw: unknown): Project {
  const result = projectSchema.safeParse(raw)
  if (!result.success) {
    console.error('❌ JSON 파싱 실패:', result.error)
    throw new Error('프로젝트 JSON 구조가 올바르지 않습니다.')
  }

  const validated = result.data

  // 정렬 처리
  const sortedSequences = byOrderOrId(validated.sequences).map((seq: any) => ({
    ...seq,
    scenes: byOrderOrId(seq.scenes).map((scene: any) => ({
      ...scene,
      shots: byOrderOrId(scene.shots),
    })),
  }))

  // 평면 구조로 변환 (types.ts에 맞게)
  const sequences: Sequence[] = []
  const scenes: Scene[] = []
  const shots: Shot[] = []

  sortedSequences.forEach((seq: any) => {
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
          notes: '',
          cut_number: '',
          camera: '',
          angle: '',
        })
      })
    })
  })

  // 최종 Project 객체 반환 (types.ts 구조에 맞춤)
  const project: Project = {
    name: validated.title,
    version: '1.0.0',
    sequences,
    scenes,
    shots,
  }

  // 인덱스 생성 (필요 시 전역 context에서 사용)
  buildIndex(project)

  return project
}
