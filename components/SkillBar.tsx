
export default function SkillBar({name,level}:any){

return(

<div className="mb-3">

<div className="flex justify-between text-sm">
<span>{name}</span>
<span>{level}/10</span>
</div>

<div className="bg-gray-200 rounded-full h-3 mt-1">
<div className="bg-green-500 h-3 rounded-full"
style={{width:`${level*10}%`}}/>
</div>

</div>

)

}
