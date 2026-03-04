'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import DogCard from '@/components/DogCard'

export default function Dashboard(){

const [dogs,setDogs] = useState<any[]>([])

useEffect(()=>{

fetchDogs()

},[])

async function fetchDogs(){

const {data,error} = await supabase
.from('dogs')
.select('*')
.order('name')

if(data) setDogs(data)

}

return (

<div className="space-y-4">

{dogs.map((dog)=>(

<DogCard key={dog.id} dog={dog}/>

))}

</div>

)

}
