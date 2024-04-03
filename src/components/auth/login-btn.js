'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import {Button} from 'antd'
import { useRouter } from 'next/navigation'
import {useState} from "react";

export default function Component() {
    const router = useRouter()
    const { data: session } = useSession()
    const [theme, setTheme] = useState()
    if (session) {
        return (
            <div>
                Signed in as {session.user.name} <br />
                <div className={'flex flex-row justify-between px-6 py-6'}>
                    <div className={'flex gap-4 '}>
                        <Button onClick={() => goto('/news')}>跳转到news页面</Button>
                        <Button type={"primary"} onClick={() => goto('/')}>跳转到首页面</Button>
                        <Button type={"primary"} onClick={() => toggleTheme('/')}>切换主题</Button>

                    </div>
                    <div>
                        <Button onClick={() => signOut()}>退出</Button>
                    </div>
                </div>
            </div>
        )
    }

    function toggleTheme(type){
        setTheme(type)
    }

    function goto(val) {
        router.push(val)
    }

    return (
        <div className={'flex justify-between px-6 py-6'}>
            <div>Not signed in</div>
            <Button onClick={() => signIn()}>登录</Button>
        </div>
    )
}