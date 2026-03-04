
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'
import Timeline from '../../../components/Timeline'
import {formatAge} from '../../../lib/age'

export default function Dog({params}){

const [dog,setDog]=useState(null)
const [sessions,setSessions]=useState([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase
.from('dogs')
.select('*')
.eq('id',params.id)
.single()

setDog(data)

const {data:s}=await supabase
.from('training_sessions')
.select(`
id,date,location,notes,
session_skills(
result,
skills(name)
)
`)
.eq('dog_id',params.id)
.order('date',{ascending:false})

const formatted=(s||[]).map(x=>({
...x,
skills:(x.session_skills||[]).map(ss=>({
name:ss.skills?.name,
result:ss.result
}))
}))

setSessions(formatted)
}

if(!dog) return <div>Chargement...</div>

return(
<div>

<div className="card">

<h2>{dog.name}</h2>

<div style={{color:"#9aa3b2"}}>
{dog.breed} • {formatAge(dog.birth_date)}
</div>

<a className="btn" href={`/sessions/new?dog=${params.id}`}>
Nouvelle séance
</a>

</div>

<div className="card">

<h3>Historique entraînement</h3>

<Timeline sessions={sessions}/>

</div>

</div>
)
}
