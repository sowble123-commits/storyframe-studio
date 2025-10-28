// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProjectProvider } from './context/ProjectContext'
import { TopBar } from './components/TopBar'
import { LeftMenu } from './components/LeftMenu'
import Home from './pages/Home'
import ProjectList from './pages/ProjectList'
import Studio from './pages/Studio'

export default function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="h-screen flex flex-col bg-gray-950 text-gray-100">
          {/* 상단 바 (모든 페이지 공통) */}
          <TopBar />

          {/* 메인 영역 */}
          <div className="flex flex-1 overflow-hidden">
            {/* 좌측 메뉴 (페이지마다 다르게 변경 가능) */}
            <LeftMenu />

            {/* 우측 메인 콘텐츠 */}
            <div className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/studio/:id" element={<Studio />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ProjectProvider>
  )
}
