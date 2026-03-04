
export default function SkillProgress({skill,value}){

return(

<div style={{marginBottom:'12px'}}>

<div style={{fontSize:'14px'}}>{skill}</div>

<div className="progress">
<div className="progress-bar" style={{width:`${value}%`}}></div>
</div>

</div>

)

}
