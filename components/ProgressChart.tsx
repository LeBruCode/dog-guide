
'use client'

import {Line} from 'react-chartjs-2'
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

export default function ProgressChart({dataPoints}:any){

const labels=dataPoints.map((d:any)=>d.date)
const scores=dataPoints.map((d:any)=>d.score)

const data={
labels,
datasets:[{
label:'Progression',
data:scores
}]
}

return <Line data={data}/>

}
