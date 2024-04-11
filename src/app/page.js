import LogoutPage from "@/app/(home)/logoutPage";
import {auth} from "@/lib/auth";
async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/space/info/getCommonUrls`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const RecommendUrls = async () => {
    const session = await auth()

    // const data = await getData()
    // if (data.status === 0) {
    //     console.log('ddd=', data)
    //     return <div>
    //         <LogoutPage />
    //     </div>
    // }
    return <div>
        {!session?<LogoutPage />:<div>you had login!</div>}
    </div>

}
export default RecommendUrls;
