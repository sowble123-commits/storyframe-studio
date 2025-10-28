import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import JsonUpload from '../components/upload/JsonUpload'
import { useProjectContext } from '../context/useProjectContext'
import { loadProjectById, saveProjectToLocalStorage } from '../utils/storage'
import type { Project } from '../utils/types'

export default function Studio() {
  const { id } = useParams<{ id: string }>()
  const { project, setProject } = useProjectContext()
  const [localProject, setLocalProject] = useState<Project | null>(null)

  // 최초 로드: ID로 프로젝트 찾기
  useEffect(() => {
    if (!id) return
    const loaded = loadProjectById(id)
    if (loaded) {
      setLocalProject(loaded)
      setProject(loaded)
    }
  }, [id, setProject])

  // 업로드로 교체
  const handleJsonLoad = (json: any) => {
    if (!json) return
    // 현재 프로젝트 id를 유지(프로젝트 구분 유지)
    const merged: Project = {
      ...json,
      id: localProject?.id || json.id || `project-${Date.now()}`,
      name: json.name || localProject?.name || 'Untitled Project',
      createdAt: localProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setLocalProject(merged)
    setProject(merged)
    saveProjectToLocalStorage(merged)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        🎬 Studio: {localProject?.name || project?.name || id || 'Untitled Project'}
      </h1>

      {/* JSON 업로드: 스튜디오에서만 */}
      <div className="mb-6">
        <JsonUpload onLoad={handleJsonLoad} />
      </div>

      {/* 임시 프리뷰 (추후: 스토리보드/콘티 UI로 대체) */}
      {localProject ? (
        <div className="bg-gray-900 rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3">✅ 프로젝트 로드 성공</h2>
          <pre className="text-sm bg-gray-800 p-3 rounded-lg overflow-auto">
            {JSON.stringify(localProject, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-gray-500">이 프로젝트로 업로드할 JSON을 선택하세요.</p>
      )}
    </div>
  )
}
