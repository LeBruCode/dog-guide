
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

export default function NewSession(){

const params=useSearchParams()

const [dogs,setDogs]=useState<any[]>([])
const [skills,setSkills]=useState<any[]>([])

const [dogId,setDogId]=useState("")
const [notes,setNotes]=useState("")
const [scores,setScores]=useState<Record<string,number>>({})

const [loading,setLoading]=useState(false)

useEffect(()=>{
loadDogs()
loadSkills()

const dog=params.get("dog")
if(dog) setDogId(dog)

},[])

async function loadDogs(){
const {data}=await supabase.from("dogs").select("*").order("name")
setDogs(data||[])
}

async function loadSkills(){
const {data}=await supabase.from("skills").select("*").order("name")
setSkills(data||[])
}

function setScore(skillId:string,value:number){
setScores(prev=>({...prev,[skillId]:value}))
}

async function save(){

if(!dogId){
alert("Choisir un chien")
return
}

setLoading(true)

try{

const {data:session,error}=await supabase
.from("training_sessions")
.insert({
dog_id:dogId,
date:new Date(),
notes
})
.select()
.single()

if(error) throw error

const skillsData=Object.entries(scores).map(([skillId,result])=>({
session_id:session.id,
skill_id:skillId,
result
}))

if(skillsData.length>0){
await supabase.from("session_skills").insert(skillsData)
}

alert("Séance enregistrée")

setScores({})
setNotes("")

}catch(err){
console.error(err)
alert("Erreur")
}

setLoading(false)

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
value={notes}
onChange={e=>setNotes(e.target.value)}
/>

<h3>Compétences</h3>

{skills.map(skill=>{

const value=scores[skill.id]

return(
<div key={skill.id} className="skillRow">

<div>{skill.name}</div>

<div className="scoreButtons">

{[1,2,3,4,5].map(v=>(

<div
key={v}
className={`scoreBtn ${value===v?'scoreActive':''}`}
onClick={()=>setScore(skill.id,v)}
>
{v}
</div>

))}

</div>

</div>
)

})}

<button onClick={save} disabled={loading} className="btn">
{loading?"Enregistrement...":"Enregistrer"}
</button>

</div>

)
}
