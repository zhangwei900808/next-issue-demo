'use client'

import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ children }) {
    return (
        <SessionProvider // Re-fetch session every 5 minutes
            //https://next-auth.js.org/getting-started/client#options
            refetchInterval={5 * 60}
            // Re-fetches session when window is focused
            refetchOnWindowFocus={true}>
            {children}
        </SessionProvider>
    )
}
