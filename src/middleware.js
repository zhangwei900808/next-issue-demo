import { NextResponse } from 'next/server'
import {auth} from "@/lib/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    // 获取session
    const session = await auth()
    // 1、如果登录了就不能跳转到登录页面，
    // 2、我的笔记、文件、chatAI、imageAi页面没有登录就必须跳转到登录页面
    // console.log('哈哈就是我=', session)
    if (session && session.user){
        // 1、如果登录了或者注册了就不能跳转到登录或者注册页面，
        if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')){
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    // return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/news', '/login', '/register'],
}