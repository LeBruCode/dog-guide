
'use client'

export const dynamic='force-dynamic'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'
import ProgressChart from '../../../components/ProgressChart'
import Link from 'next/link'

export default function Dog({params}){

const [dog,setDog]=useState(null)
const [points,setPoints]=useState([])

useEffect(()=>{
load()
},[])

async function load(){

const {data}=await supabase
.from('dogs')
.select('*')
.eq('id',params.id)
.single()

setDog(data)

const {data:sessions}=await supabase
.from('training_sessions')
.select('id,date')
.eq('dog_id',params.id)
.order('date',{ascending:true})

if(!sessions) return

const ids=sessions.map(s=>s.id)

const {data:skills}=await supabase
.from('session_skills')
.select('session_id,score')
.in('session_id',ids)

let map={}

skills?.forEach(s=>{
if(!map[s.session_id]) map[s.session_id]=[]
map[s.session_id].push(s.score)
})

let chart=sessions.map(s=>{

let scores=map[s.id]||[]
let avg=0

if(scores.length){
avg=scores.reduce((a,b)=>a+b,0)/scores.length
}

return {date:s.date,score:avg}

})

setPoints(chart)

}

if(!dog) return <div>Chargement...</div>

return(

<div>

<div className="card">

<h2>{dog.name}</h2>

<Link
href={`/sessions/new?dog=${params.id}`}
className="btn"
>
Nouvelle séance
</Link>

</div>

<div className="card">

<h3>Progression</h3>

<ProgressChart points={points}/>

</div>

</div>

)

}
