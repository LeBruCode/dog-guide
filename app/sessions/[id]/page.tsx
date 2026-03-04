
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'

export default function Session({params}:any){

const [session,setSession]=useState<any>(null)
const [skills,setSkills]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase
.from('training_sessions')
.select('*')
.eq('id',params.id)
.single()

setSession(data)

const {data:s}=await supabase
.from('session_skills')
.select('*')
.eq('session_id',params.id)

setSkills(s||[])

}

if(!session) return <div>Chargement...</div>

return(

<div>

<div className="bg-white p-4 rounded-xl shadow mb-4">

<h2 className="text-xl font-semibold">
Séance
</h2>

<p className="text-sm text-gray-600">
{session.date}
</p>

<p className="mt-2">{session.notes}</p>

{session.photo_url && (
<img src={session.photo_url} className="mt-3 rounded-lg"/>
)}

</div>

<div className="bg-white p-4 rounded-xl shadow">

<h3 className="font-semibold mb-3">
Compétences travaillées
</h3>

{skills.map((s:any)=>(
<div key={s.id} className="mb-2 text-sm">
{s.skill_name} : {s.score}/5
</div>
))}

</div>

</div>

)

}
