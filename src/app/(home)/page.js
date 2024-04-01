import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"


export default function Home() {
    const session = getServerSession()
    // const { accessToken } = data

    return (
        <main className="p-24">
            main page
            <div>Access Token: {session}</div>
        </main>
    );
}
