// src/components/upload/JsonUpload.tsx
import React, { useRef, useState } from 'react'
import { useProjectContext } from '../../context/useProjectContext'
import { parseProjectJson } from '../../utils/parser'
import { buildIndex } from '../../utils/indexers'

const JsonUpload: React.FC = () => {
  const { setProject } = useProjectContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    readFile(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) readFile(file)
  }

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
        buildIndex(parsed)
        setProject(parsed)
        setError(null)
      } catch (err) {
        console.error('파일 파싱 오류:', err)
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
        프로젝트 JSON 파일을 여기에 드래그하거나 클릭하여 업로드하세요
      </p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default JsonUpload
