
export default function Timeline({sessions}){

return(
<div className="timeline">

{sessions.map(s=>{

const d=new Date(s.date).toLocaleDateString()

return(
<div key={s.id} className="timelineItem">

<b>{d}</b>

<div className="skill">{s.location}</div>

{s.skills.map((sk,i)=>(
<div key={i} className="skill">
• {sk.name} — {sk.result}
</div>
))}

<div className="skill">{s.notes}</div>

</div>
)

})}

</div>
)
}
