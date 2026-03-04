
'use client'

import { Line } from 'react-chartjs-2'
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
} from 'chart.js'

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
)

export default function ProgressChart({points}){

const data={
labels:points.map(p=>p.date),
datasets:[{
label:'Progression',
data:points.map(p=>p.score),
borderColor:'#22c55e',
backgroundColor:'rgba(34,197,94,0.2)'
}]
}

return <Line data={data}/>
}
