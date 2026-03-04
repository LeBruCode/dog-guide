
'use client'

import {useEffect,useState} from 'react'
import {useSearchParams} from 'next/navigation'
import {supabase} from '../../../lib/supabaseClient'

const skills=[
"Marche au pied",
"Arrêt trottoir",
"Évitement obstacles",
"Ignorer distractions"
]

export default function NewSession(){

const params=useSearchParams()

const [dogs,setDogs]=useState<any[]>([])
const [dogId,setDogId]=useState('')
const [notes,setNotes]=useState('')
const [scores,setScores]=useState<any>({})

useEffect(()=>{
loadDogs()

const dog=params.get("dog")
if(dog) setDogId(dog)

},[])

async function loadDogs(){

const {data}=await supabase
.from('dogs')
.select('*')
.order('name')

if(data) setDogs(data)

}

function updateScore(skill,value){
setScores({...scores,[skill]:value})
}

async function save(){

if(!dogId){
alert("Choisir un chien")
return
}

const {data:session}=await supabase
.from('training_sessions')
.insert({
dog_id:dogId,
date:new Date(),
notes
})
.select()
.single()

for(const skill in scores){

await supabase.from('session_skills').insert({
session_id:session.id,
skill_name:skill,
score:scores[skill]
})

}

alert("Séance enregistrée")

}

return(

<div className="bg-white p-4 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-3">
Nouvelle séance
</h2>

<h3 className="font-semibold mb-2">Chien</h3>

<select
className="border p-2 w-full rounded mb-4"
value={dogId}
onChange={(e)=>setDogId(e.target.value)}
>

<option value="">Sélectionner un chien</option>

{dogs.map(d=>(
<option key={d.id} value={d.id}>
{d.name}
</option>
))}

</select>

<textarea
className="border p-2 w-full rounded mb-3"
placeholder="Notes"
onChange={e=>setNotes(e.target.value)}
/>

<h3 className="font-semibold mb-2">Compétences</h3>

{skills.map(skill=>(
<div key={skill} className="mb-3">
<p className="text-sm">{skill}</p>
<input
type="range"
min="1"
max="5"
className="w-full"
onChange={e=>updateScore(skill,e.target.value)}
/>
</div>
))}

<button
onClick={save}
className="bg-black text-white w-full p-2 rounded"
>
Enregistrer
</button>

</div>

)

}
