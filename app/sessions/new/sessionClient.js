
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'

export default function SessionClient({dogId:initialDog}){

const [dogs,setDogs]=useState([])
const [dogId,setDogId]=useState(initialDog||"")
const [notes,setNotes]=useState("")

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

async function save(){

const {data}=await supabase
.from('training_sessions')
.insert({
dog_id:dogId,
date:new Date(),
notes
})

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

<textarea
placeholder="Notes"
onChange={e=>setNotes(e.target.value)}
/>

<input type="file" accept="image/*" />

<button className="btn" onClick={save}>
Enregistrer
</button>

</div>

)

}
