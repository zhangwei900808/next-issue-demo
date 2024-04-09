'use client'
import {useSession, signIn, signOut} from "next-auth/react"
import {Button, theme} from 'antd'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from "react";

const {useToken} = theme;
import {setMyTheme} from '@/lib/slices/systemSlice'
import {useAppDispatch} from "@/lib/hooks";
import {useAppSelector} from "@/lib/hooks";
import {usePathname} from 'next/navigation'

import LogoInHeader from "@/components/layout/logoInHeader";
import MenusInHeader from "@/components/layout/menusInHeader";
import SearchInHeader from "@/components/layout/searchInHeader";
import UserInHeader from "@/components/layout/userInHeader";
export default function TopMenus() {

    const dispatch = useAppDispatch()
    const {myTheme, defaultTheme} = useAppSelector(state => state.system)

    const router = useRouter()
    const {data: session} = useSession()
    const [theme, setTheme] = useState()
    const {token} = useToken();

    console.log('token ===', token.colorPrimaryBg)
    const pathname = usePathname()

    useEffect(() =>{
        toggleTheme('default')
    }, [])


    return <>
        {
            pathname !== '/login' ? <div className={`dark:bg-[#1C2127] dark:text-white sticky top-0 bg-primary-purple w-dvw`}>
                <div className={'flex flex-row justify-between px-4 py-4'}>
                    <div className={'flex gap-4 '}>
                        {/*<Button onClick={() => goto('/news')}>跳转到news页面</Button>*/}
                        {/*<Button type={"primary"} onClick={() => goto('/')}>跳转到首页面</Button>*/}
                        {/*<Button type={"default"} onClick={() => toggleTheme()}>切换主题</Button>*/}
                        <LogoInHeader />
                        {!session ? <MenusInHeader onChoosed={goto}/>: null}
                    </div>
                    <div>
                        {session ?
                            <div className={'text-white gap-4 flex items-center'}>
                                <SearchInHeader/>
                                {/*<AddInHeader/>*/}
                                {/*<QuickToolsInHeader/>*/}
                                {/*/!*<SettingBgInHeader/>*!/*/}
                                {/*<RemindInHeader/>*/}
                                {/*<MessageInHeader/>*/}
                                <UserInHeader/>
                            </div> :
                            <Button type={'primary'} onClick={() =>  goto('/login')}>登录</Button>}

                    </div>
                </div>
            </div> : null
        }
    </>

    function toggleTheme(type) {
        dispatch(setMyTheme(myTheme === 'dark' ? 'default' : 'dark'))
    }

    function goto(val) {
        router.push(val)
    }
}