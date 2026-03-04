
export default function SkillBar({value}){

return(

<div className="progress-bar">
<div className="progress-value" style={{width:`${value*20}%`}}></div>
</div>

)

}
