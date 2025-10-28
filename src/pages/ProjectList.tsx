// src/pages/ProjectList.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProjectList() {
  const navigate = useNavigate()

  const projects = [
    { id: 'dark-tide', name: '🎞️ Dark Tide', updated: '2025-10-25' },
    { id: 'sci-fi-short', name: '🎬 Sci-Fi Short', updated: '2025-10-24' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">프로젝트 목록</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => alert('🚧 새 프로젝트 기능 준비 중')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + 새 프로젝트 만들기
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          홈으로 돌아가기
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-3">📁 전체 프로젝트</h2>
        <ul className="space-y-2">
          {projects.map((p) => (
            <li
              key={p.id}
              onClick={() => navigate(`/studio/${p.id}`)}
              className="flex justify-between items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer transition"
            >
              <span>{p.name}</span>
              <span className="text-gray-500 text-sm">Last updated: {p.updated}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
