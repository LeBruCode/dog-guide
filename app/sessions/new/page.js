
export const dynamic='force-dynamic'

import SessionClient from "./sessionClient"

export default function Page({searchParams}){

return <SessionClient dogId={searchParams?.dog}/>

}
