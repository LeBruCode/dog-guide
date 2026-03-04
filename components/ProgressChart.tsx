
'use client'

import {Line} from 'react-chartjs-2'
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
} from 'chart.js'

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
)

export default function ProgressChart({sessions}:any){

const labels=sessions.map((s:any)=>s.date)

const scores=sessions.map((s:any)=>s.avg_score || 0)

const data={
labels,
datasets:[
{
label:'Progression',
data:scores,
borderColor:'rgb(34,197,94)',
backgroundColor:'rgba(34,197,94,0.2)'
}
]
}

return <Line data={data}/>

}
