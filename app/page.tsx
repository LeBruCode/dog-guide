
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../lib/supabaseClient'
import DogCard from '../components/DogCard'

export default function Page(){

const [dogs,setDogs]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase
.from('dogs')
.select('*')
.order('name')

if(data) setDogs(data)

}

return(

<div>

<div className="flex justify-between mb-4">

<h2 className="text-xl font-semibold">
Chiens en formation
</h2>

</div>

{dogs.map(d=>(
<DogCard key={d.id} dog={d}/>
))}

</div>

)

}
