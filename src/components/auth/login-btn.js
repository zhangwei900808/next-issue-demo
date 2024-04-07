'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import {Button, theme} from 'antd'
import { useRouter } from 'next/navigation'
import {useState} from "react";
const { useToken } = theme;
import {setMyTheme} from '@/lib/slices/systemSlice'
import {useAppDispatch} from "@/lib/hooks";
import {useAppSelector} from "@/lib/hooks";

export default function Component() {

    const dispatch = useAppDispatch()
    const {myTheme} =useAppSelector(state => state.system)

    const router = useRouter()
    const { data: session } = useSession()
    const [theme, setTheme] = useState()
    const { token } = useToken();

    console.log('token ===', token.colorPrimaryBg)

        return (
            <div>
                <div className={'flex flex-row justify-between px-6 py-6'}>
                    <div className={'flex gap-4 '}>
                        <Button onClick={() => goto('/news')}>跳转到news页面</Button>
                        <Button type={"primary"} onClick={() => goto('/')}>跳转到首页面</Button>
                        <Button type={"default"} onClick={() => toggleTheme()}>切换主题</Button>

                    </div>
                    <div>
                        {session?
                            <Button onClick={() => signOut()}>退出</Button>:<Button onClick={() => signIn()}>登录</Button>}

                    </div>
                </div>
            </div>
        )

    function toggleTheme(type){
        dispatch(setMyTheme(myTheme === 'dark'?'default':'dark'))
    }

    function goto(val) {
        router.push(val)
    }
}