import React, { useRef, useState } from 'react'
import { useProjectContext } from '../../context/useProjectContext'
import { parseProjectJson } from '../../utils/parser'
import { buildIndex } from '../../utils/indexers'
import { saveProjectToLocalStorage } from '../../utils/storage'

/**
 * ✅ Studio.tsx로 데이터 전달을 위해 props 추가
 */
interface JsonUploadProps {
  onLoad?: (project: any) => void
}

const JsonUpload: React.FC<JsonUploadProps> = ({ onLoad }) => {
  const { setProject } = useProjectContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  /**
   * 📂 파일 선택 시
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    readFile(file)
  }

  /**
   * 📦 파일 드래그 드롭 처리
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) readFile(file)
  }

  /**
   * 🧠 JSON 파일 파싱 로직
   */
  const readFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      setError('❌ JSON 파일만 업로드할 수 있습니다.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string)
        const parsed = parseProjectJson(json)

        // ✅ ID 자동 생성 (없을 경우)
        if (!parsed.id) parsed.id = `project-${Date.now()}`
        if (!parsed.createdAt) parsed.createdAt = new Date().toISOString()

        // ✅ 인덱스 생성 및 전역 Context 반영
        buildIndex(parsed)
        setProject(parsed)

        // ✅ LocalStorage에 자동 저장
        saveProjectToLocalStorage(parsed)

        // ✅ Studio.tsx로 전달
        onLoad?.(parsed)

        // ✅ 성공 처리
        setFileName(file.name)
        setError(null)
      } catch (err) {
        console.error('❌ 파일 파싱 오류:', err)
        setError('❌ 유효하지 않은 JSON 파일입니다.')
      }
    }

    reader.readAsText(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      <p className="text-gray-700 font-medium">
        {fileName
          ? `✅ ${fileName} 업로드 완료`
          : '프로젝트 JSON 파일을 여기에 드래그하거나 클릭하여 업로드하세요'}
      </p>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default JsonUpload
