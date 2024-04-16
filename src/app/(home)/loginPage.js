'use client'
import { useSession } from "next-auth/react"
import {Button} from 'antd'

const LoginPage = () => {
    const { data: session, status, update } = useSession()

    return <div>
        this is client page <Button onClick={() => update({name: '1212121'})}>更新session</Button>

    </div>
}

export default LoginPage