
export const dynamic = 'force-dynamic'

import NewSessionClient from "./sessionClient"

export default function Page({searchParams}){
  return <NewSessionClient dogId={searchParams?.dog} />
}
