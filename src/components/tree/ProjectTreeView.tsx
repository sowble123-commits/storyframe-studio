// src/components/tree/ProjectTreeView.tsx
import React, { useState } from 'react'
import { useProject } from '@/context/ProjectContext'
import type { Sequence, Scene } from '@/utils/types'

export const ProjectTreeView: React.FC = () => {
  const { project } = useProject()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!project) {
    return <div className="p-4 text-gray-400 text-sm">No project loaded</div>
  }

  const handleSelect = (id: string) => setSelectedId(id)

  return (
    <div className="p-4 text-sm space-y-2">
      {project.sequences.map((seq: Sequence) => (
        <div key={seq.id}>
          <div
            className={`font-semibold cursor-pointer ${
              selectedId === seq.id ? 'text-blue-500' : 'text-gray-800'
            }`}
            onClick={() => handleSelect(seq.id)}
          >
            🎬 {seq.name || 'Untitled Sequence'}
          </div>
          <div className="ml-4 space-y-1">
            {project.scenes
              .filter((sc: Scene) => seq.sceneIds?.includes(sc.id))
              .map((scene: Scene) => (
                <div
                  key={scene.id}
                  className={`cursor-pointer ${
                    selectedId === scene.id ? 'text-blue-400' : 'text-gray-700'
                  }`}
                  onClick={() => handleSelect(scene.id)}
                >
                  🎞️ {scene.name || 'Unnamed Scene'}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
