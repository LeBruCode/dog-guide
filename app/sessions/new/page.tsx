
'use client'

import {useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'

const skills=[
"Marche au pied",
"Arrêt trottoir",
"Évitement obstacles",
"Ignorer distractions"
]

export default function NewSession(){

const [notes,setNotes]=useState('')
const [file,setFile]=useState<any>(null)
const [scores,setScores]=useState<any>({})

function updateScore(skill,value){
setScores({...scores,[skill]:value})
}

async function save(){

let photoUrl=null

if(file){

const fileName=Date.now()+"-"+file.name

const {data}=await supabase.storage
.from('session-photos')
.upload(fileName,file)

if(data){
photoUrl=data.path
}

}

const {data:session}=await supabase.from('training_sessions').insert({
date:new Date(),
notes,
photo_url:photoUrl
}).select().single()

for(const skill in scores){

await supabase.from('session_skills').insert({
session_id:session.id,
skill_name:skill,
score:scores[skill]
})

}

alert('Séance enregistrée')

}

return(

<div className="bg-white p-4 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-3">
Nouvelle séance
</h2>

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

<input
type="file"
className="mb-4"
onChange={e=>setFile(e.target.files?.[0])}
/>

<button
onClick={save}
className="bg-black text-white w-full p-2 rounded"
>
Enregistrer
</button>

</div>

)

}
