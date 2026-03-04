
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'

const skills=[
"Marche au pied",
"Arrêt trottoir",
"Obstacles",
"Distractions"
]

export default function SessionClient({dogId:initialDog}){

const [dogs,setDogs]=useState([])
const [dogId,setDogId]=useState(initialDog||"")
const [date,setDate]=useState("")
const [location,setLocation]=useState("")
const [notes,setNotes]=useState("")
const [scores,setScores]=useState({})

useEffect(()=>{loadDogs()},[])

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

const {data:session}=await supabase
.from('training_sessions')
.insert({
dog_id:dogId,
date:date,
location:location,
notes:notes
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

<select value={dogId} onChange={e=>setDogId(e.target.value)}>

<option value="">Sélectionner un chien</option>

{dogs.map(d=>(
<option key={d.id} value={d.id}>{d.name}</option>
))}

</select>

<input type="date" value={date} onChange={e=>setDate(e.target.value)}/>

<input placeholder="Lieu" value={location} onChange={e=>setLocation(e.target.value)}/>

<textarea placeholder="Notes" onChange={e=>setNotes(e.target.value)}/>

<h3>Compétences</h3>

{skills.map(skill=>(

<div key={skill}>

<div>{skill}</div>

<select onChange={e=>updateScore(skill,e.target.value)}>

<option value="">-</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>

</select>

</div>

))}

<button className="btn" onClick={save}>
Enregistrer
</button>

</div>

)

}
