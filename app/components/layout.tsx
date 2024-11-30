'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">LIMS</h1>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/samples" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Samples
            </Link>
          </li>
          <li>
            <Link href="/qc" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              QC
            </Link>
          </li>
          <li>
            <Link href="/reports" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Reports
            </Link>
          </li>
          <li>
            <Link href="/documents" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Documents
            </Link>
          </li>
          {user?.role === 'admin' && (
            <li>
              <Link href="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Welcome, {user?.username || 'Guest'}</h2>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        {children}
      </main>
    </div>
  )
}

