import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
    const { data } = useSession()
    const { accessToken } = data

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            main page
            <div>Access Token: {accessToken}</div>
        </main>
    );
}
