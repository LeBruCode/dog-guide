
'use client'

import {useState} from 'react'
import {supabase} from '@/lib/supabaseClient'

export default function NewSession(){

const [notes,setNotes]=useState('')
const [success,setSuccess]=useState('bon')

async function save(){

await supabase.from('training_sessions').insert({
date:new Date(),
notes,
success_level:success
})

alert('Séance enregistrée')

}

return(

<div className="bg-white p-4 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-3">
Nouvelle séance
</h2>

<textarea
className="border p-2 w-full rounded mb-3"
placeholder="Notes"
onChange={e=>setNotes(e.target.value)}
/>

<select
className="border p-2 w-full rounded mb-4"
onChange={e=>setSuccess(e.target.value)}
>

<option>excellent</option>
<option>bon</option>
<option>moyen</option>
<option>difficile</option>

</select>

<button
onClick={save}
className="bg-black text-white w-full p-2 rounded"
>

Enregistrer

</button>

</div>

)

}
