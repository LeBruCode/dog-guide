
import Link from 'next/link'

export default function DogCard({dog}:any){

return(
<Link href={`/dogs/${dog.id}`}>
<div className="bg-white rounded-xl shadow p-4 mb-3">
<h2 className="font-semibold text-lg">{dog.name}</h2>
<p className="text-sm text-gray-600">{dog.breed}</p>
<p className="text-sm mt-2">
Statut : <span className="font-medium">{dog.status}</span>
</p>
</div>
</Link>
)

}
