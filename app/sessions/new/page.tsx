'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

export default function NewSession() {

  const params = useSearchParams()

  const [dogs, setDogs] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])

  const [dogId, setDogId] = useState('')
  const [notes, setNotes] = useState('')

  const [scores, setScores] = useState<Record<string, number>>({})

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    loadDogs()
    loadSkills()

    const dog = params.get("dog")
    if (dog) setDogId(dog)

  }, [])

  async function loadDogs() {

    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .order('name')

    if (error) {
      console.error(error)
      return
    }

    if (data) setDogs(data)

  }

  async function loadSkills() {

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name')

    if (error) {
      console.error(error)
      return
    }

    if (data) setSkills(data)

  }

  function updateScore(skillId: string, value: number) {

    setScores(prev => ({
      ...prev,
      [skillId]: value
    }))

  }

  async function save() {

    if (!dogId) {
      alert("Choisir un chien")
      return
    }

    setLoading(true)

    try {

      const { data: session, error: sessionError } = await supabase
        .from('training_sessions')
        .insert({
          dog_id: dogId,
          date: new Date(),
          notes
        })
        .select()
        .single()

      if (sessionError) throw sessionError

      const skillsData = Object.entries(scores).map(([skillId, result]) => ({
        session_id: session.id,
        skill_id: skillId,
        result
      }))

      if (skillsData.length > 0) {

        const { error: skillsError } = await supabase
          .from('session_skills')
          .insert(skillsData)

        if (skillsError) throw skillsError

      }

      alert("Séance enregistrée")

      setScores({})
      setNotes("")

    } catch (err) {

      console.error(err)
      alert("Erreur lors de l'enregistrement")

    }

    setLoading(false)

  }

  return (

    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-3">
        Nouvelle séance
      </h2>

      <h3 className="font-semibold mb-2">Chien</h3>

      <select
        className="border p-2 w-full rounded mb-4"
        value={dogId}
        onChange={(e) => setDogId(e.target.value)}
      >

        <option value="">Sélectionner un chien</option>

        {dogs.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}

      </select>

      <textarea
        className="border p-2 w-full rounded mb-3"
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      <h3 className="font-semibold mb-2">Compétences</h3>

      {skills.map(skill => (

        <div key={skill.id} className="mb-3">

          <p className="text-sm">{skill.name}</p>

          <input
            type="range"
            min="1"
            max="5"
            className="w-full"
            value={scores[skill.id] ?? 3}
            onChange={e => updateScore(skill.id, Number(e.target.value))}
          />

        </div>

      ))}

      <button
        onClick={save}
        disabled={loading}
        className="bg-black text-white w-full p-2 rounded disabled:opacity-50"
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>

    </div>

  )

}
