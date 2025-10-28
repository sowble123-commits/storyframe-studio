import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProjectContext } from '../context/useProjectContext'
import { saveProjectToLocalStorage } from '../utils/storage'
import { parseProjectJson } from '../utils/parser'

export const TopBar: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { project, setProject } = useProjectContext()
  const isStudio = pathname.startsWith('/studio')

  // 업로드(스튜디오에서만 보임)
  const fileRef = useRef<HTMLInputElement>(null)
  const handleUploadClick = () => fileRef.current?.click()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(String(ev.target?.result || '{}'))
        const parsed = parseProjectJson(raw)
        // 현재 프로젝트 id 유지
        if (project?.id) parsed.id = project.id
        if (!parsed.createdAt) parsed.createdAt = project?.createdAt || new Date().toISOString()
        parsed.updatedAt = new Date().toISOString()
        setProject(parsed)
        saveProjectToLocalStorage(parsed)
      } catch (err) {
        alert('❌ JSON 파싱 실패')
        console.error(err)
      } finally {
        if (fileRef.current) fileRef.current.value = ''
      }
    }
    reader.readAsText(file)
  }

  // 다운로드
  const handleDownload = () => {
    if (!project) return alert('다운로드할 프로젝트가 없습니다.')
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name || 'project'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 리셋
  const handleReset = () => {
    const ok = confirm('이 프로젝트의 편집 내용을 초기화할까요?')
    if (!ok) return
    setProject(null)
    navigate('/')
  }

  return (
    <header className="h-14 border-b border-gray-800 bg-gray-950 px-4 flex items-center justify-between">
      <div className="font-bold">StoryFrame Studio</div>
      <div className="flex items-center gap-2">
        {isStudio && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={handleUploadClick}
              className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700"
              title="JSON 업로드"
            >
              JSON Upload
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700"
              title="JSON 다운로드"
            >
              JSON Down
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500"
              title="리셋"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </header>
  )
}
