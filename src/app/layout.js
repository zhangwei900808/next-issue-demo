import { Inter } from "next/font/google";
import "./(global)/globals.css";
import Link from 'next/link'
import StyledComponentsRegistry from "./(global)/AntdRegistry";
import AuthProvider from "@/context/authProvider";
import StoreProvider from "@/context/storeProvider";
import {Button} from "antd";
const inter = Inter({ subsets: ["latin"] });
import LoginBtn from '@/components/auth/login-btn'
export const metadata = {
  title: "Seaurl",
  description: "您的ai智能管家",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <StoreProvider>
              <AuthProvider>
                  <StyledComponentsRegistry>
                      <div>
                          <LoginBtn />
                      </div>
                      <div>
                          {children}
                      </div>
                  </StyledComponentsRegistry>
              </AuthProvider>
          </StoreProvider>
      </body>
    </html>
  );
}
