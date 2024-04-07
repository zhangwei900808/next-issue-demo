import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import AntdProvider from "@/context/antdProvider";
import AuthProvider from "@/context/authProvider";
import StoreProvider from "@/context/storeProvider";
const inter = Inter({ subsets: ["latin"] });
import TopMenus from '@/components/auth/topMenus'
export const metadata = {
  title: "Next.js & Next-Auth & Redux-Toolkit & Antd & Tailwindcss",
  description: "集成示例",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-white dark:bg-black dark:text-white">
          <StoreProvider>
              <AuthProvider>
                  <AntdProvider>
                      <TopMenus/>
                      <div>
                          {children}
                      </div>
                  </AntdProvider>
              </AuthProvider>
          </StoreProvider>
      </body>
    </html>
  );
}
