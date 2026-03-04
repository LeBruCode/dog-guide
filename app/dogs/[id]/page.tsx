
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '@/lib/supabaseClient'
import SkillBar from '@/components/SkillBar'

export default function Dog({params}:any){

const [dog,setDog]=useState<any>(null)
const [sessions,setSessions]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase.from('dogs').select('*').eq('id',params.id).single()
setDog(data)

const {data:s}=await supabase.from('training_sessions').select('*').eq('dog_id',params.id).order('date',{ascending:false})
setSessions(s||[])

}

if(!dog) return <div>Chargement...</div>

return(

<div>

<div className="bg-white p-4 rounded-xl shadow mb-4">
<h2 className="text-xl font-semibold">{dog.name}</h2>
<p className="text-sm text-gray-600">{dog.breed}</p>
</div>

<div className="bg-white p-4 rounded-xl shadow mb-4">

<h3 className="font-semibold mb-2">Progression</h3>

<SkillBar name="Marche au pied" level={8}/>
<SkillBar name="Arrêt trottoir" level={6}/>
<SkillBar name="Distractions" level={4}/>

</div>

<div className="bg-white p-4 rounded-xl shadow">

<h3 className="font-semibold mb-2">Historique</h3>

{sessions.map(s=>(

<div key={s.id} className="border-b py-2 text-sm">

<p>{s.date}</p>
<p className="text-gray-600">{s.notes}</p>

</div>

))}

</div>

</div>

)

}
