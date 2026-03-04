
export default function Timeline({sessions}){

return(

<div className="timeline">

{sessions.map(s=>(

<div key={s.id} className="timeline-item">
<b>{new Date(s.date).toLocaleDateString()}</b><br/>
{s.notes || "Séance"}
</div>

))}

</div>

)

}
