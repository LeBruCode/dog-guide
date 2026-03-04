
export function formatAge(birthDate){

if(!birthDate) return ""

const birth=new Date(birthDate)
const now=new Date()

let years=now.getFullYear()-birth.getFullYear()
let months=now.getMonth()-birth.getMonth()

if(months<0){
years--
months+=12
}

const totalMonths=years*12+months

if(totalMonths<12){
return totalMonths+" mois"
}

if(months===0){
return years===1?"1 an":years+" ans"
}

return (years===1?"1 an":years+" ans")+" et "+months+" mois"
}
