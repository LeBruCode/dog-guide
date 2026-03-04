
export const dynamic='force-dynamic'

import Client from "./sessionClient"

export default function Page({searchParams}){

return <Client dogId={searchParams?.dog}/>

}
