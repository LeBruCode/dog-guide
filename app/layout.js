
import './globals.css'

export const dynamic='force-dynamic'

export default function RootLayout({children}){

return(
<html lang="fr">
<body>

<div className="container">

<div className="header">Guide Dog Trainer</div>

{children}

</div>

<div className="nav">
<a href="/">🐕 Chiens</a>
<a href="/sessions/new">➕ Séance</a>
</div>

</body>
</html>
)

}
