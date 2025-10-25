// src/utils/sort.ts

/**
 * StoryFrame Studio
 * 정렬 유틸
 * ---------------------------------------
 * JSON 데이터 내 order 속성 기준으로
 * Sequence / Scene / Shot 순서를 정렬
 */

/**
 * order가 있으면 오름차순,
 * 없으면 ID 알파벳 순으로 정렬
 */
export function byOrderOrId<T extends { order?: number; id: string }>(
  list: T[] = []
): T[] {
  return [...list].sort((a, b) => {
    // order가 모두 있는 경우 → 숫자 순서 정렬
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }

    // order가 한쪽만 있는 경우 → order 있는 쪽을 우선
    if (a.order !== undefined) return -1
    if (b.order !== undefined) return 1

    // order 둘 다 없으면 → ID 기준 알파벳 순서
    return a.id.localeCompare(b.id)
  })
}

/**
 * Storyboard 전체 구조를 정렬
 * Project → Sequence → Scene → Shot 순으로 처리
 */
export function sortStoryboard<T extends {
  sequences?: { order?: number; id: string; scenes?: { order?: number; id: string; shots?: { order?: number; id: string }[] }[] }[]
}>(project: T): T {
  if (!project.sequences) return project

  const sortedSequences = byOrderOrId(project.sequences).map((seq) => ({
    ...seq,
    scenes: byOrderOrId(seq.scenes ?? []).map((scene) => ({
      ...scene,
      shots: byOrderOrId(scene.shots ?? []),
    })),
  }))

  return { ...project, sequences: sortedSequences }
}
