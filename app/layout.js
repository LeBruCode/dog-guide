
import './globals.css'

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100">
        <div className="max-w-xl mx-auto min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-6">Guide Dog Trainer</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
