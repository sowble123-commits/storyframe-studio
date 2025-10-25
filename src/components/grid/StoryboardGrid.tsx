// src/components/grid/StoryboardGrid.tsx
import React from 'react'
import { useProject } from '@/context/ProjectContext'
import type { Shot, Scene } from '@/utils/types'

interface StoryboardGridProps {
  sceneId: string | null
}

export const StoryboardGrid: React.FC<StoryboardGridProps> = ({ sceneId }) => {
  const { project } = useProject()

  if (!project || !sceneId) {
    return <div className="p-4 text-gray-400 text-sm">Select a scene to view shots</div>
  }

  const scene = project.scenes.find((s: Scene) => s.id === sceneId)
  if (!scene) {
    return <div className="p-4 text-gray-400 text-sm">Scene not found</div>
  }

  const shots = project.shots.filter((sh: Shot) => scene.shotIds?.includes(sh.id))

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {shots.map((shot: Shot) => (
        <div
          key={shot.id}
          className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
        >
          {shot.image ? (
            <img src={shot.image} alt={shot.description || 'Shot'} className="w-full h-40 object-cover" />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="p-2 text-sm text-gray-800">
            {shot.description || 'No description'}
          </div>
        </div>
      ))}
    </div>
  )
}
