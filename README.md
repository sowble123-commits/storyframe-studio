# StoryFrame Studio

StoryFrame Studio is a lightweight MVP tool for planning, editing, and exporting storyboards in a JSON structure. It is built with React and TailwindCSS.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sowble123-commits/storyframe-studio.git
cd storyframe-studio
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Start the development server
```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 📂 Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── TopBar.tsx
│   ├── LeftMenu.tsx
│   ├── Tabs.tsx
│   └── upload/
│       └── JsonUpload.tsx
├── context/          # React context for project state
│   ├── ProjectContext.tsx
│   └── useProjectContext.ts
├── utils/            # Utility functions
│   └── validateProject.ts
├── types/            # TypeScript type definitions
│   └── index.ts
└── App.tsx           # Main App component
```

---

## ✅ Features (MVP)
- [x] JSON 업로드 / 다운로드 (기본 형식 검증 포함)
- [x] 프로젝트 Context로 전체 상태 관리
- [ ] Shot 카드 UI 구현 (예정)
- [ ] 씬 / 시퀀스 구조 시각화 (예정)
- [ ] 이미지 업로드 기능 (예정)

---

## 📦 JSON Structure
샷 데이터 예시:
```json
{
  "title": "My Project",
  "scenes": [
    {
      "name": "Scene 1",
      "shots": [
        {
          "id": "1",
          "description": "Wide shot of mountains",
          "image": "mountain.jpg"
        }
      ]
    }
  ]
}
```

---

## 🧩 Tech Stack
- React
- TypeScript
- TailwindCSS
- Vite

---

## 💡 Next Steps
- 카드형 UI로 샷 리스트 구현하기 (`StoryboardGrid.tsx`)
- LeftMenu에 씬/샷 탐색 트리 추가하기
- 이미지 파일 첨부 기능 구현
- 저장된 JSON을 localStorage에 유지

---

## 📝 License
MIT

---

## 🙋 Contact
If you have questions or feedback, feel free to open an issue or contact `sowble123` on GitHub.
