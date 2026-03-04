
import Link from 'next/link'

export default function TimelineItem({session}:any){

return(

<Link href={`/sessions/${session.id}`}>

<div className="border-l pl-3 mb-4 cursor-pointer">

<p className="text-xs text-gray-500">{session.date}</p>

<p className="text-sm">{session.notes}</p>

{session.photo_url && (
<img src={session.photo_url} className="mt-2 rounded-lg"/>
)}

</div>

</Link>

)

}
