import { ProjectProvider } from './context/ProjectContext'
import { TopBar } from './components/TopBar'
import { LeftMenu } from './components/LeftMenu'
import { Tabs } from './components/Tabs'

export default function App() {
  return (
    <ProjectProvider>
      <div className="h-screen flex flex-col">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <LeftMenu />
          <div className="flex-1 overflow-auto p-4">
            <Tabs />
          </div>
        </div>
      </div>
    </ProjectProvider>
  )
}
