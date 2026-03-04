
'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

const skills=[
"Marche au pied",
"Arrêt trottoir",
"Évitement obstacles",
"Ignorer distractions"
]

export default function NewSession({searchParams}){

const [dogs,setDogs]=useState([])
const [dogId,setDogId]=useState(searchParams?.dog || '')
const [notes,setNotes]=useState('')
const [scores,setScores]=useState({})

useEffect(()=>{

loadDogs()

},[])

async function loadDogs(){

const {data}=await supabase
.from('dogs')
.select('*')
.order('name')

if(data) setDogs(data)

}

function updateScore(skill,val){

setScores({...scores,[skill]:val})

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

return (

<div className="bg-white p-4 rounded shadow">

<h2 className="text-xl mb-4">Nouvelle séance</h2>

<select
value={dogId}
onChange={(e)=>setDogId(e.target.value)}
className="border p-2 w-full mb-3"
>

<option value="">Sélectionner un chien</option>

{dogs.map(d=>(
<option key={d.id} value={d.id}>
{d.name}
</option>
))}

</select>

<textarea
placeholder="Notes"
className="border p-2 w-full mb-3"
onChange={(e)=>setNotes(e.target.value)}
/>

{skills.map(skill=>(

<div key={skill} className="mb-3">

<p className="text-sm">{skill}</p>

<input
type="range"
min="1"
max="5"
className="w-full"
onChange={(e)=>updateScore(skill,e.target.value)}
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
