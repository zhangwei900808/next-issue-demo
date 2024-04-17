'use client'
import {useCallback, useEffect, useState} from "react";
import {message, Modal} from 'antd'
import {ExclamationCircleFilled, LoginOutlined, LoadingOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {useSession, getSession} from "next-auth/react"
import Loading from "@/components/loading";
import TopMenus from "@/components/layout/topMenus";
import {refreshToken, isReadNotify} from '@/lib/slices/authSlice'
import {useDispatch} from "react-redux";
import _ from "lodash";

const relativeTime = require('dayjs/plugin/relativeTime')
const customParseFormat = require('dayjs/plugin/customParseFormat')

const utc = require('dayjs/plugin/utc')
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.locale('zh-cn') // 全局使用
export default function ChildrenLayout({children}) {
    const {confirm} = Modal;

    // useSession中的session需要useEffect监听变化才能拿到最新的，而getSession获取的永远是最新的
    const {data: session, status, update} = useSession()
    const dispatch = useDispatch()

    const [isOnline, setOnline] = useState(true)
    const [error, setError] = useState({
        show: false,
        content: ""
    });
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        console.log('我被 调用 了几次？')
        document.addEventListener('visibilitychange', tokenHandler);
        // 每小时执行一下监听token是否过期
        // const interval = setInterval(() => tokenHandler(), 1000 * 60 * 60)
        window.addEventListener("offline", changeOffline);
        window.addEventListener('online', changeOnline);

        //return 中的清理函数在组件卸载或 update 变量变化时执行
        return () => {
            console.log('我被 销毁 了几次？')
            // 销毁的时候是removeEventListener，而不是addEventListener，否则会造成dead cycle
            document.removeEventListener('visibilitychange', tokenHandler);
            // clearInterval(interval)
            window.removeEventListener("offline", changeOffline);
            window.removeEventListener('online', changeOnline);
        };
    }, [update]);

    const debouncedOnVisible = _.debounce(onVisible, 10000);

    // 显示页面时需要验证token是否过期，
    const tokenHandler = function () {
        console.log('visibilityState', document.visibilityState)
        console.log('document.hidden', document.hidden)
        if (!document.hidden) {
            debouncedOnVisible()
        }
    }

   async function onVisible() {
        // 获取session数据
        const session = await getSession()
        console.log('session ---', session)
        if (session?.accessToken) {
            await dispatch(isReadNotify());
        }
        const res = await dispatch(refreshToken())
        console.log('tokenHandler refreshToken res=', res)
        if (res?.payload?.status === 40001) {
            confirm({
                title: '登录已过期',
                icon: <ExclamationCircleFilled/>,
                content: '您的登录已过期，请重新登录！',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    location.href = '/login'
                },
                onCancel() {
                    // 弹出确认框，让用户自行跳转登录
                    // 重新登录
                    location.reload()
                }
            });
        } else if (res?.payload?.status !== -1) {
            messageApi.info('未知异常!');
        } else if (res?.payload?.data) {
            if (session?.accessToken !== res?.payload?.data) {
                // 更新session中的token-id
                update({
                    newTokenId: res.payload.data
                })
            }
        }
    }

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