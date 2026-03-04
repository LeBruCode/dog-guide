
export default function Timeline({sessions,filter}){

let list=sessions

if(filter && filter!=='all'){
list=sessions.filter(s=>s.location===filter)
}

return(

<div className="timeline">

{list.map(s=>{

const d=new Date(s.date).toLocaleDateString()

return(

<div key={s.id} className="timeline-item">

<b>{d}</b>

<div style={{fontSize:'13px',color:'#9aa3b2'}}>{s.location}</div>

<div style={{fontSize:'13px'}}>{s.notes}</div>

</div>

)

})}

</div>

)

}
