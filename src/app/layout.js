import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import AntdProvider from "@/context/antdProvider";
import AuthProvider from "@/context/authProvider";
import StoreProvider from "@/context/storeProvider";
const inter = Inter({ subsets: ["latin"] });
import ChildrenLayout from "@/components/layout/childrenLayout";
import TopMenus from "@/components/layout/topMenus";

export const metadata = {
  title: "Seaurl-AI管家",
  description: "集成示例",
};

export default function RootLayout({ children }) {

    // function IP() {
    //     const FALLBACK_IP_ADDRESS = '0.0.0.0'
    //     const forwardedFor = headers().get('x-forwarded-for')
    //
    //     if (forwardedFor) {
    //         return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
    //     }
    //
    //     return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
    // }


  return (
    <html>
    <head>
        <link href="https://cdn.awbeci.com/images/awbeci-new-logo/93577bcd7af2636a178d680f1128bace.png" rel="shortcut icon"/>
        <script type="text/javascript" src="https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js"/>
    </head>
    <body className="bg-white dark:bg-black dark:text-white">
        <StoreProvider>
            <AuthProvider>
                <AntdProvider>
                    <TopMenus/>
                    <ChildrenLayout>
                        {children}
                    </ChildrenLayout>
                </AntdProvider>
            </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
