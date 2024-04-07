import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import {auth} from "@/lib/auth";
import {Button} from 'antd'


export default async function Home() {
    const session = await auth()

    return (
        <main className="p-12">
            <div>Access Token: {JSON.stringify(session)}</div>
        </main>
    );
}
