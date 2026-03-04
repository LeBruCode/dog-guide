
'use client'

export default function ScoreSelector({value,onChange}){

const scores=[1,2,3,4,5]

return (

<div className="score-buttons">

{scores.map(s=>(
<div
key={s}
className={`score-btn ${value==s ? 'score-active' : ''}`}
onClick={()=>onChange(s)}
>
{s}
</div>
))}

</div>

)

}
