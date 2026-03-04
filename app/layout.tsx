import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100 text-gray-900">
        <div className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Guide Dog Trainer</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
