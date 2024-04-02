'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import {Button} from 'antd'
export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.name} <br />
                <Button onClick={() => signOut()}>Sign out</Button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <Button onClick={() => signIn()}>Sign in</Button>
        </>
    )
}