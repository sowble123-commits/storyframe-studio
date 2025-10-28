// src/utils/types.ts
// ============================================
// 🧩 StoryFrame Studio Type Definitions
// ============================================

// 🎞️ Shot (한 컷 단위)
export interface Shot {
  id: string;                 // 고유 ID
  sceneId: string;            // 포함된 Scene의 ID
  cut_number?: string;        // 컷 넘버
  camera?: string;            // 카메라 종류
  angle?: string;             // 앵글
  notes?: string;             // 메모

  // ✅ 스토리보드 / 콘티뷰 렌더링용 추가 필드
  image?: string;             // 썸네일 이미지 (data URL 또는 경로)
  description?: string;       // 설명 텍스트
  duration?: number;          // (선택) 컷 길이(초 단위)
  emotion?: string;           // (선택) 감정 키워드
  contiNotes?: string;        // (선택) 콘티용 특수 노트
}

// 🎬 Scene (한 장면 단위)
export interface Scene {
  id: string;
  name?: string;
  order?: number;
  shotIds?: string[];         // 포함된 샷들의 ID 목록
  description?: string;
}

// 🎥 Sequence (시퀀스 / 큰 단위 구분)
export interface Sequence {
  id: string;
  name?: string;
  order?: number;
  sceneIds?: string[];        // 포함된 Scene ID 목록
  theme?: string;
}

// 📁 Project (전체 프로젝트 구조)
export interface Project {
  id: string;                 // ✅ 고유 프로젝트 ID
  name?: string;              // 프로젝트 이름
  version?: string;           // 버전
  description?: string;       // 프로젝트 설명
  sequences: Sequence[];
  scenes: Scene[];
  shots: Shot[];
  createdAt?: string;         // ✅ 생성 날짜
  updatedAt?: string;         // ✅ 최근 수정 날짜
}

// ===============================
// ⚙️ 인덱스 구조 (검색 / 빠른 접근용)
// ===============================
export interface ProjectIndex {
  sequences: Record<string, Sequence>;
  scenes: Record<string, Scene>;
  shots: Record<string, Shot>;
}

// ===============================
// 📦 JSON 변환용 타입 (Zod 스키마와 호환)
// ===============================
export interface RawProjectJson {
  id: string;
  title: string;
  description?: string;
  sequences: {
    id: string;
    name: string;
    order?: number;
    scenes: {
      id: string;
      name: string;
      order?: number;
      shots: {
        id: string;
        name: string;
        order?: number;
        image?: string;
        description?: string;
      }[];
    }[];
  }[];
}
