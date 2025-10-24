import { Project, Scene, Shot, Sequence } from './types';

export function validateProject(project: Project): string[] {
    const errors: string[] = [];

    const sceneIds = new Set(project.scenes.map((scene: Scene) => scene.id));
    const shotIds = new Set(project.shots.map((shot: Shot) => shot.id));

    for (const sequence of project.sequences) {
        for (const sid of sequence.sceneIds || []) {
            if (!sceneIds.has(sid)) {
                errors.push(`Sequence "${sequence.name}" references missing sceneId "${sid}"`);
            }
        }
    }

    for (const scene of project.scenes) {
        for (const sid of scene.shotIds || []) {
            if (!shotIds.has(sid)) {
                errors.push(`Scene "${scene.name}" references missing shotId "${sid}"`);
            }
        }
    }

    for (const shot of project.shots) {
        if (!sceneIds.has(shot.sceneId)) {
            errors.push(`Shot "${shot.id}" references non-existent sceneId "${shot.sceneId}"`);
        }
    }

    return errors;
}
