
import './globals.css'

export default function RootLayout({children}:{children:React.ReactNode}){

return(
<html lang="fr">
<body className="bg-gray-100">

<div className="max-w-xl mx-auto min-h-screen p-4 pb-20">

<header className="mb-6">
<h1 className="text-2xl font-bold">Guide Dog Trainer</h1>
</header>

{children}

</div>

<nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around text-sm">
<a href="/">Chiens</a>
<a href="/sessions/new">Séance</a>
</nav>

</body>
</html>
)

}
