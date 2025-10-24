export interface Shot {
    id: string;
    sceneId: string;
    cut_number?: string;
    camera?: string;
    angle?: string;
    notes?: string;
}

export interface Scene {
    id: string;
    name?: string;
    shotIds?: string[];
}

export interface Sequence {
    id: string;
    name?: string;
    sceneIds?: string[];
}

export interface Project {
    name?: string;
    version?: string;
    sequences: Sequence[];
    scenes: Scene[];
    shots: Shot[];
}
