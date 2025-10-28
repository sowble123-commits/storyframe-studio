import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export const LeftMenu: React.FC = () => {
  const { pathname } = useLocation()

  const isStudio = pathname.startsWith('/studio')

  // 메뉴 세트
  const homeMenus = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' }, // 확장 대비
    { to: '/settings', label: 'Settings' }, // 확장 대비
  ]

  const studioMenus = [
    { to: '#storyboard', label: 'Storyboard' },
    { to: '#conti', label: 'Conti' },
    { to: '#library', label: 'Library' },
    { to: '#export', label: 'Export' },
    { to: '#settings', label: 'Settings' },
  ]

  const menus = isStudio ? studioMenus : homeMenus

  return (
    <aside className="w-60 bg-gray-900 border-r border-gray-800 p-4 hidden md:block">
      <div className="text-sm text-gray-400 mb-3">{isStudio ? 'Project' : 'Navigation'}</div>
      <nav className="space-y-1">
        {menus.map((m) =>
          m.to.startsWith('#') ? (
            // 스튜디오 내부 앵커(추후 실제 라우팅으로 대체)
            <a
              key={m.to}
              href={m.to}
              className="block px-3 py-2 rounded hover:bg-gray-800 text-gray-200"
            >
              {m.label}
            </a>
          ) : (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-gray-800 ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-200'
                }`
              }
            >
              {m.label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  )
}
