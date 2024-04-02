'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import {Button} from 'antd'
import { useRouter } from 'next/navigation'

export default function Component() {
    const router = useRouter()
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.name} <br />
                <Button onClick={() => signOut()}>退出</Button>
                <Button onClick={() => goto('/news')}>跳转到news页面</Button>
                <Button onClick={() => goto('/')}>跳转到首页面</Button>
            </>
        )
    }

    function goto(val){
        router.push(val)
    }

    return (
        <>
            Not signed in <br />
            <Button onClick={() => signIn()}>登录</Button>
        </>
    )
}