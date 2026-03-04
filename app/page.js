
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../lib/supabaseClient'
import Link from 'next/link'

export default function Home(){

const [dogs,setDogs]=useState([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase
.from('dogs')
.select('*')
.order('name')

if(data)setDogs(data)

}

return(

<div>

{dogs.map(d=>(

<Link key={d.id} href={`/dogs/${d.id}`} className="card">

<div style={{fontWeight:600,fontSize:'18px'}}>{d.name}</div>

<div style={{fontSize:'13px',color:'#9aa3b2'}}>{d.breed}</div>

</Link>

))}

</div>

)

}
