'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withAuth(WrappedComponent: React.ComponentType, allowedRoles: string[]) {
  return function AuthenticatedComponent(props: any) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        router.push('/login')
      } else if (!allowedRoles.includes(user.role)) {
        router.push('/unauthorized')
      }
    }, [user, router])

    if (!user || !allowedRoles.includes(user.role)) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

