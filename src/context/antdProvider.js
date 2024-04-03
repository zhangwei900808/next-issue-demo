"use client";

import {AntdRegistry} from '@ant-design/nextjs-registry';
import {ConfigProvider, theme} from 'antd'
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {useAppSelector} from "@/lib/hooks";
import {useState} from "react";

export default function AntdProvider({children}) {

    const {myTheme, defaultTheme, darkTheme} = useAppSelector(state => state.system)

    return <AntdRegistry>
        <ConfigProvider locale={zhCN} theme={{
            token: {
                colorPrimary: myTheme === 'dark' ? darkTheme.primary : defaultTheme.primary
            },
            algorithm: myTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}>
            <div style={{
                backgroundColor: myTheme === 'dark' ?darkTheme.background:defaultTheme.background
            }}>
                {children}
            </div>
        </ConfigProvider>
    </AntdRegistry>
}