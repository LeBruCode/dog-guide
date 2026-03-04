
'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function Home(){

const [dogs,setDogs]=useState([])

useEffect(()=>{
load()
},[])

async function load(){

const {data}=await supabase
.from('dogs')
.select('*')
.order('name')

if(data) setDogs(data)

}

return (

<div>

<h2 className="text-xl mb-4">Chiens</h2>

{dogs.map(d=>(

<Link key={d.id} href={`/dogs/${d.id}`}>
<div className="bg-white p-4 rounded shadow mb-3 cursor-pointer">
{d.name}
</div>
</Link>

))}

</div>

)

}
