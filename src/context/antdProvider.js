"use client";

import {AntdRegistry} from '@ant-design/nextjs-registry';
import {ConfigProvider, theme} from 'antd'
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";

export default function AntdProvider({children}) {

    const {myTheme, defaultTheme, darkTheme} = useAppSelector(state => state.system)
    useEffect(() => {
        if (myTheme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }

    }, [myTheme])
    return <AntdRegistry>
        <ConfigProvider locale={zhCN} theme={{
            //全局算法暗色主题色
            algorithm: myTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            // 全局主题色
            token: {
                colorPrimary: myTheme === 'dark' ? darkTheme.primary : defaultTheme.primary
            },
            // 组件主题色
            components: {
                Menu: {
                    // 特殊情况特殊处理
                    itemBg: myTheme === 'dark' ? '#1f1f1f' : '#fff',
                    // darkItemColor: myTheme === 'dark' ? darkTheme.primary : defaultTheme.primary
                }
            }
        }}>
            <div>
                {children}
            </div>
        </ConfigProvider>
    </AntdRegistry>
}