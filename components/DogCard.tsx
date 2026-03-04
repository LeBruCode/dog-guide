export default function DogCard({dog}:any){

return (

<div className="bg-white rounded-xl shadow p-4">

<h2 className="text-xl font-semibold">{dog.name}</h2>

<p className="text-sm text-gray-600">{dog.breed}</p>

<p className="mt-2">
Statut : 
<span className="ml-1 font-medium">{dog.status}</span>
</p>

<p className="text-sm text-gray-500">
Famille : {dog.family_name}
</p>

</div>

)
}
