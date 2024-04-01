import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import StyledComponentsRegistry from "./AntdRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Seaurl",
  description: "您的ai智能管家",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div>
        <div className='flex p-24' >
            <Link href={`/login`}>登录</Link>
        </div>
      </div>
      <div>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </div>
      </body>
    </html>
  );
}
