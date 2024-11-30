'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Notification {
  id: string
  message: string
  type: 'holdTime' | 'qcAlert'
  timestamp: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Simulating fetching notifications from an API
    const fetchNotifications = async () => {
      // In a real application, this would be an API call
      const mockNotifications: Notification[] = [
        { id: '1', message: 'Sample 1 approaching hold time', type: 'holdTime', timestamp: new Date().toISOString() },
        { id: '2', message: 'QC result for Sample 2 out of spec', type: 'qcAlert', timestamp: new Date().toISOString() },
      ]
      setNotifications(mockNotifications)
    }

    fetchNotifications()
    // Set up a polling mechanism to check for new notifications periodically
    const intervalId = setInterval(fetchNotifications, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [])

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  return (
    <div className="relative">
      <Button onClick={toggleNotifications} variant="ghost" className="relative">
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </Button>
      {showNotifications && (
        <Card className="absolute right-0 mt-2 w-80 z-10">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            {notifications.length === 0 ? (
              <p>No new notifications</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li key={notification.id} className="flex justify-between items-start">
                    <div>
                      <p className={`text-sm ${notification.type === 'holdTime' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                    <Button onClick={() => dismissNotification(notification.id)} variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

