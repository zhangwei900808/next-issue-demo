"use client";

import { AntdRegistry } from '@ant-design/nextjs-registry';
import {ConfigProvider, theme} from 'antd'
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export default function AntdProvider({children}){
    return <AntdRegistry>
        <ConfigProvider locale={zhCN} theme={{
            "token": {
                "colorPrimary": "#54458a"
            },
            algorithm: theme.defaultAlgorithm
        }}>
            {children}
        </ConfigProvider>
    </AntdRegistry>
}