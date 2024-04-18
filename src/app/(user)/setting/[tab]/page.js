// import ClientPage from "@/app/(user)/setting/[tab]/clientPage"

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

const Setting = async ({params, searchParams}) => {
    console.log('Setting params=', params)
    console.log('Setting searchParams=', searchParams)
    // const data = await getData()
    // if (data.status === 0) {
    //     console.log('ddd=', data)
    //     return <div>
    //         <ClientPage urls={data.data}/>
    //     </div>
    // }
    return <div/>

}
export default Setting;
