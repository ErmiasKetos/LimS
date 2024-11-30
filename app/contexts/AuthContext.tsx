'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  id: string
  username: string
  role: 'admin' | 'analyst' | 'viewer'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string) => {
    // In a real application, you would make an API call to validate credentials
    // For this example, we'll use a mock login
    if (username === 'admin' && password === 'password') {
      const user: User = { id: '1', username: 'admin', role: 'admin' }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    } else if (username === 'analyst' && password === 'password') {
      const user: User = { id: '2', username: 'analyst', role: 'analyst' }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    } else if (username === 'viewer' && password === 'password') {
      const user: User = { id: '3', username: 'viewer', role: 'viewer' }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

