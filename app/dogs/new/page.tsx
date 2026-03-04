'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function NewDog(){

const [name,setName] = useState('')
const [breed,setBreed] = useState('')
const [status,setStatus] = useState('socialisation')

async function createDog(){

await supabase.from('dogs').insert({
name,
breed,
status
})

alert('Chien ajouté')

}

return (

<div className="bg-white p-4 rounded-xl shadow space-y-3">

<h2 className="text-xl font-semibold">
Ajouter un chien
</h2>

<input
className="border p-2 w-full rounded"
placeholder="Nom"
onChange={(e)=>setName(e.target.value)}
/>

<input
className="border p-2 w-full rounded"
placeholder="Race"
onChange={(e)=>setBreed(e.target.value)}
/>

<select
className="border p-2 w-full rounded"
onChange={(e)=>setStatus(e.target.value)}
>

<option>socialisation</option>
<option>pré-éducation</option>
<option>éducation</option>

</select>

<button
onClick={createDog}
className="bg-black text-white w-full p-2 rounded"
>

Créer

</button>

</div>

)

}
