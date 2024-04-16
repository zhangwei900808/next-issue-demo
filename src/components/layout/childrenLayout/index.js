'use client'
import {useEffect, useState} from "react";
import {ExclamationCircleFilled,LoginOutlined,LoadingOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import { useSession } from "next-auth/react"
import Loading from "@/components/loading";
import TopMenus from "@/components/layout/topMenus";

const relativeTime = require('dayjs/plugin/relativeTime')
const customParseFormat = require('dayjs/plugin/customParseFormat')

const utc = require('dayjs/plugin/utc')
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.locale('zh-cn') // 全局使用
export default function ChildrenLayout({children}) {
    const { data: session, status } = useSession()

    const [isOnline, setOnline] = useState(true)
    const [error, setError] = useState({
        show: false,
        content: ""
    });

    useEffect(() => {
        console.log('session status=', status)
        console.log('children session =', session)
    }, [session])

    useEffect(() => {
        window.addEventListener("offline", changeOffline);
        window.addEventListener('online', changeOnline);

        return () => {
            window.addEventListener("offline", () => {});
            window.addEventListener('online', () => {});
        };
    }, []);

    function changeOffline() {
        setOnline(false)
        setError({
            show: true,
            content: "你没有联网，请检查网络连接。"
        });
    }

    function changeOnline() {
        setOnline(true)
        setError({
            show: false
        });
    }

    function renderChildren(children) {
        if (status === 'loading'){
            return <div className={'flex items-center justify-center p-2'}>
                <Loading />
            </div>
        }
        return <div>
            <TopMenus/>
            {children}
        </div>
    }

    return <div>

        {isOnline?renderChildren(children):<div className={'flex flex-col justify-center items-center gap-4 pt-4'}>
            {/*<Image width={200} height={200} src={lostnet}/>*/}
            <LoadingOutlined className={'text-3xl'}/>
            <div className={'text-2xl'}>连接到互联网</div>
            <div className={'text-base'}>你没有联网，请检查网络连接。</div>
        </div>}
    </div>
}