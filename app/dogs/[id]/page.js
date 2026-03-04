
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../../../lib/supabaseClient'
import SkillProgress from '../../../components/SkillProgress'
import Timeline from '../../../components/Timeline'

export default function Dog({params}){

const [dog,setDog]=useState(null)
const [sessions,setSessions]=useState([])
const [skills,setSkills]=useState([])

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
.order('date',{ascending:false})

setSessions(s || [])

const {data:skillData}=await supabase
.from('session_skills')
.select('skill_name,score')

if(skillData){

let map={}

skillData.forEach(x=>{

if(!map[x.skill_name]) map[x.skill_name]=[]

map[x.skill_name].push(x.score)

})

let list=[]

for(const k in map){

let avg = map[k].reduce((a,b)=>a+b,0)/map[k].length

list.push({
skill:k,
value:Math.round(avg*20)
})

}

setSkills(list)

}

}

if(!dog) return <div>Chargement...</div>

return(

<div>

<div className="card">

<h2>{dog.name}</h2>

<div style={{fontSize:"13px",color:"#666"}}>{dog.breed}</div>

</div>

<div className="card">

<h3>Progression par compétence</h3>

{skills.map(s=>(

<SkillProgress key={s.skill} skill={s.skill} value={s.value}/>

))}

</div>

<div className="card">

<h3>Timeline</h3>

<Timeline sessions={sessions}/>

</div>

</div>

)

}
