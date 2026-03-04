
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'
import TimelineItem from '../../../components/TimelineItem'
import ProgressChart from '../../../components/ProgressChart'

export default function Dog({params}:any){

const [dog,setDog]=useState<any>(null)
const [sessions,setSessions]=useState<any[]>([])

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
.select('*')
.eq('dog_id',params.id)
.order('date',{ascending:true})

setSessions(s||[])

}

if(!dog) return <div>Chargement...</div>

return(

<div>

<div className="bg-white p-4 rounded-xl shadow mb-4">

<h2 className="text-xl font-semibold">{dog.name}</h2>
<p className="text-sm text-gray-600">{dog.breed}</p>

<a
href={`/sessions/new?dog=${params.id}`}
className="mt-3 inline-block bg-black text-white px-3 py-1 rounded text-sm"
>
Nouvelle séance
</a>

</div>

<div className="bg-white p-4 rounded-xl shadow mb-4">

<h3 className="font-semibold mb-3">Progression</h3>

<ProgressChart sessions={sessions}/>

</div>

<div className="bg-white p-4 rounded-xl shadow">

<h3 className="font-semibold mb-4">Timeline</h3>

{sessions.reverse().map((s:any)=>(
<TimelineItem key={s.id} session={s}/>
))}

</div>

</div>

)

}
