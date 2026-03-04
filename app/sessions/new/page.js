
'use client'

export const dynamic='force-dynamic'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'
import ScoreSelector from '../../../components/ScoreSelector'

const skills=[
"Marche au pied",
"Arrêt trottoir",
"Évitement obstacles",
"Ignorer distractions"
]

export default function NewSession({searchParams}){

const [dogs,setDogs]=useState([])
const [dogId,setDogId]=useState(searchParams?.dog||'')
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

if(data)setDogs(data)

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

return(

<div className="card">

<h2>Nouvelle séance</h2>

<select
value={dogId}
onChange={e=>setDogId(e.target.value)}
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
onChange={e=>setNotes(e.target.value)}
/>

{skills.map(skill=>(

<div key={skill} className="score-row">

<p style={{fontSize:14}}>{skill}</p>

<ScoreSelector
value={scores[skill]}
onChange={(v)=>updateScore(skill,v)}
/>

</div>

))}

<button className="btn" onClick={save}>
Enregistrer
</button>

</div>

)

}
