import { AuthProvider } from './contexts/AuthContext'
import { NotificationSystem } from './components/notifications'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex h-screen bg-gray-100">
            <main className="flex-1 p-8 overflow-y-auto">
              <div className="flex justify-end mb-4">
                <NotificationSystem />
              </div>
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

