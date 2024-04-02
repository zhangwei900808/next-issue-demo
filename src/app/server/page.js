import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import {authOptions} from "../api/auth/[...nextauth]/options";

export default async function ServerPage() {
    const sessions = await getServerSession(authOptions)
    console.log('----sessions-----', sessions)
    if (!sessions) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    return <div className="flex flex-col gap-6">
        sdfsdfdsfsdf{sessions}
    </div>
}
