import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"


export default async function Home() {
    const session = await getServerSession(authOptions)
    // const { accessToken } = data
    console.log('sessssss=====', session)
    return (
        <main className="p-24">
            main page
            <div>Access Token: {session}</div>
        </main>
    );
}
