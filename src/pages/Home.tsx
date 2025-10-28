import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../utils/types'
import { useProjectContext } from '../context/useProjectContext'
import {
  loadAllProjects,
  saveProjectToLocalStorage,
  deleteProject,
  renameProject,
} from '../utils/storage'

export default function Home() {
  const navigate = useNavigate()
  const { setProject } = useProjectContext()
  const [projects, setProjects] = useState<Project[]>([])

  // 로드
  useEffect(() => {
    setProjects(loadAllProjects())
  }, [])

  // 정렬(최근 수정 우선)
  const sorted = useMemo(() => {
    return [...projects].sort((a, b) => {
      const at = a.updatedAt ?? a.createdAt ?? ''
      const bt = b.updatedAt ?? b.createdAt ?? ''
      return (bt > at ? 1 : -1)
    })
  }, [projects])

  // 새 프로젝트 생성
  const handleNewProject = () => {
    const name = prompt('새 프로젝트 이름을 입력하세요', 'Untitled Project')
    if (name === null) return
    const id = `project-${Date.now()}`
    const now = new Date().toISOString()
    const newProject: Project = {
      id,
      name: name.trim() || 'Untitled Project',
      version: '1.0.0',
      description: '',
      sequences: [],
      scenes: [],
      shots: [],
      createdAt: now,
      updatedAt: now,
    }
    saveProjectToLocalStorage(newProject)
    setProjects(loadAllProjects())
    setProject(newProject)
    navigate(`/studio/${id}`)
  }

  // 열기
  const handleOpen = (p: Project) => {
    setProject(p)
    navigate(`/studio/${p.id}`)
  }

  // 이름 변경
  const handleRename = (p: Project) => {
    const next = prompt('프로젝트 새 이름', p.name || 'Untitled Project')
    if (next === null) return
    renameProject(p.id, (next || '').trim() || 'Untitled Project')
    setProjects(loadAllProjects())
  }

  // 삭제(확인)
  const handleDelete = (p: Project) => {
    const ok = confirm(`프로젝트를 삭제할까요?\n\n[${p.name || p.id}]`)
    if (!ok) return
    deleteProject(p.id)
    setProjects(loadAllProjects())
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to StoryFrame Studio</h1>
      <p className="text-gray-400 mb-8">
        프로젝트를 생성하거나 목록에서 선택해 들어가세요. JSON 업로드는 스튜디오에서 할 수 있습니다.
      </p>

      {/* 새 프로젝트 */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={handleNewProject}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + 새 프로젝트 만들기
        </button>
      </div>

      {/* 프로젝트 리스트 */}
      <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-3">📁 프로젝트</h2>

        {sorted.length === 0 ? (
          <p className="text-gray-500">아직 프로젝트가 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {sorted.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg"
              >
                <button
                  className="text-left flex-1 hover:underline"
                  onClick={() => handleOpen(p)}
                  title="열기"
                >
                  <div className="font-medium">{p.name || 'Untitled Project'}</div>
                  <div className="text-xs text-gray-400">
                    Updated:{' '}
                    {new Date(p.updatedAt ?? p.createdAt ?? Date.now()).toLocaleString()}
                  </div>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600"
                    onClick={() => handleRename(p)}
                    title="이름 변경"
                  >
                    ✏️
                  </button>
                  <button
                    className="px-2 py-1 text-sm rounded bg-red-600 hover:bg-red-500"
                    onClick={() => handleDelete(p)}
                    title="삭제"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
