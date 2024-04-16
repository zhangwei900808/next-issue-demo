'use client'
import {useCallback, useEffect, useState} from "react";
import {ExclamationCircleFilled, LoginOutlined, LoadingOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {useSession} from "next-auth/react"
import Loading from "@/components/loading";
import TopMenus from "@/components/layout/topMenus";
import {refreshToken} from '@/lib/slices/authSlice'
import {useDispatch} from "react-redux";

const relativeTime = require('dayjs/plugin/relativeTime')
const customParseFormat = require('dayjs/plugin/customParseFormat')

const utc = require('dayjs/plugin/utc')
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.locale('zh-cn') // 全局使用
export default function ChildrenLayout({children}) {
    const {data: session, status} = useSession()
    const dispatch = useDispatch()

    const [isOnline, setOnline] = useState(true)
    const [error, setError] = useState({
        show: false,
        content: ""
    });

    // 注意：因为我们使用了refetchOnWindowFocus={true}，所以当页面显示的时候就会重新调用session，因此，这里就会被调用，
    // 也就是说相当于添加了document.addEventListener('visibilitychange'事件，利用这点来添加自定义逻辑
    // useEffect(() => {
    //     console.log('session status=', status)
    //     console.log('children session =', session)
    //     const tokenHandlerWrapper = async () => {
    //         if (session) {
    //             await tokenHandler();
    //         }
    //     };
    //
    //     tokenHandlerWrapper();
    //
    //     // if (session){
    //     //     tokenHandler()
    //     // }
    //     return () => {
    //         tokenHandler()
    //     }
    // }, [session])

    useEffect(() => {
        document.addEventListener('visibilitychange', tokenHandler);

        window.addEventListener("offline", changeOffline);
        window.addEventListener('online', changeOnline);
        return () => {
            document.addEventListener('visibilitychange', tokenHandler);

            window.addEventListener("offline", changeOffline);
            window.addEventListener('online', changeOnline);
        };
    }, []);

    const tokenHandler = useCallback(async () => {
        if (document.visibilityState === 'visible'){
            //todo:死循环了
            const res = await dispatch(refreshToken())
            console.log('tokenHandler refreshToken res=', res)
            // if (res.payload.status === 40001) {
            //     confirm({
            //         title: '登录已过期',
            //         icon: <ExclamationCircleFilled/>,
            //         content: '您的登录已过期，请重新登录！',
            //         okText: '确定',
            //         cancelText: '取消',
            //         onOk() {
            //             location.href = '/login'
            //         },
            //         onCancel() {
            //             //弹出确认框，让用户自行跳转登录
            //             // 重新登录
            //             location.reload()
            //         },
            //     });
            // }
        }
    }, [session])

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
        if (status === 'loading') {
            return <div className={'flex items-center justify-center p-2'}>
                <Loading/>
            </div>
        }
        return <div>
            <TopMenus/>
            {children}
        </div>
    }

    return <div>

        {isOnline ? renderChildren(children) : <div className={'flex flex-col justify-center items-center gap-4 pt-4'}>
            {/*<Image width={200} height={200} src={lostnet}/>*/}
            <LoadingOutlined className={'text-3xl py-4'}/>
            <div className={'text-2xl'}>连接到互联网</div>
            <div className={'text-base'}>你没有联网，请检查网络连接。</div>
        </div>}
    </div>
}