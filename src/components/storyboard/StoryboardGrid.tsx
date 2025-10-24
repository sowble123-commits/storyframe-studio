import { useProjectContext } from "@/context/useProjectContext";
import { Shot } from "@/utils/types";

export const StoryboardGrid = () => {
  const { project } = useProjectContext();

  if (!project || !project.scenes?.length) {
    return <p className="text-gray-500">프로젝트에 씬이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {project.scenes.map((scene, sceneIndex) => {
        const shotsInScene = scene.shotIds
          ?.map(id => project.shots.find((s) => s.id === id))
          .filter((s): s is Shot => !!s); // null 제거 + 타입 보장

        return shotsInScene?.map((shot, shotIndex) => (
          <div
            key={`${sceneIndex}-${shotIndex}`}
            className="border rounded-lg shadow p-4 bg-white"
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Scene {sceneIndex + 1} - Shot {shotIndex + 1}
            </h3>
            <p className="text-xs text-gray-500 mb-2">{scene.name}</p>

            {/* 이미지 미리보기 */}
            <div className="aspect-video bg-gray-200 rounded-md mb-2 flex items-center justify-center text-xs text-gray-400">
              {shot.image ? (
                <img
                  src={shot.image}
                  alt="Shot"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                "이미지 없음"
              )}
            </div>

            {/* 설명 */}
            <p className="text-sm">{shot.description || "설명 없음"}</p>
          </div>
        ));
      })}
    </div>
  );
};
