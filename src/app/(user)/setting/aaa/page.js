import ClientPage from "@/app/(user)/setting/[tab]/clientPage"
import {auth} from "@/lib/auth";

async function getData(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/crud/getAccountBaseInfo`, {
        headers: {
            'token-id': `${token}`,
        }
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Setting = async ({params, searchParams}) => {
    console.log('Setting params=', params)
    console.log('Setting searchParams=', searchParams)
    const session = await auth()
    console.log('Setting session=', session)
    if (session?.accessToken){
        const data = await getData(session.accessToken)
        console.log('Setting data=', data)
        if (data.status === 0) {
            console.log('ddd=', data)
            return <div>
                <ClientPage tab={params.tab} userInfo={data?.data}/>
            </div>
        }
    }

    return <ClientPage tab={params.tab} userInfo={null}>sdfsdfsdf</ClientPage>

}
export default Setting;
