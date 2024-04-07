import { NextResponse } from 'next/server'
import {auth} from "@/lib/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    // 获取session
    const session = await auth()

    console.log('哈哈就是我=', session)
    return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/news',
}