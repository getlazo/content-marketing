import type { Metadata } from 'next'
import './globals.css'
import { ChatMessagesProvider } from './components/ChatMessagesContext'

export const metadata: Metadata = {
  title: 'Lazo I Loyalty-Test',
  description: 'Explore mini-projects, test UIs and marketing tools designed by the Lazo team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favIcon.png" type="image/png" />
      </head>
      <body className="bg-lazo-bg min-h-screen text-gray-900 font-sans">
        <ChatMessagesProvider>
          <div className="min-h-screen flex flex-col items-center justify-start">
            {children}
          </div>
        </ChatMessagesProvider>
      </body>
    </html>
  )
} 