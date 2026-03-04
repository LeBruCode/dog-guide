
'use client'

export const dynamic='force-dynamic'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'
import ProgressChart from '../../../components/ProgressChart'
import Timeline from '../../../components/Timeline'

export default function Dog({params}){

const [dog,setDog]=useState(null)
const [points,setPoints]=useState([])
const [sessions,setSessions]=useState([])

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

const {data:s}=await supabase
.from('training_sessions')
.select('*')
.eq('dog_id',params.id)
.order('date',{ascending:true})

setSessions(s || [])

if(!s)return

let chart=s.map(x=>({
date:x.date,
score:3
}))

setPoints(chart)

}

if(!dog)return<div>Chargement...</div>

return(

<div>

<div className="card">

<h2>{dog.name}</h2>

<a className="btn" href={`/sessions/new?dog=${params.id}`}>
Nouvelle séance
</a>

</div>

<div className="card">

<h3>Progression</h3>

<ProgressChart points={points}/>

</div>

<div className="card">

<h3>Timeline</h3>

<Timeline sessions={sessions}/>

</div>

</div>

)

}
