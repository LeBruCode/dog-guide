
export default function Timeline({sessions}){

return(

<div className="timeline">

{sessions.map(s=>{

const d = new Date(s.date).toLocaleDateString()

return(
<div key={s.id} className="timeline-item">

<div className="timeline-date">{d}</div>

<div>{s.location || ""}</div>

<div style={{fontSize:"13px",color:"#555"}}>{s.notes}</div>

</div>
)

})}

</div>

)
}
