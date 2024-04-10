import ClientPage from "@/app/(system)/software/clientPage";
async function getGroupData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/space/info/softwareGroup`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getListData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/space/info/software/queryBy`, {
        method: 'POST',
        body: JSON.stringify({ param: '', groupId: '' }),
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Software = async () => {

    const res1 = await getGroupData()
    const res2 = await getListData()
    if (res1.status === 0 && res1.status === 0) {
        console.log('data1=', res1)
        console.log('data2=', res2)
        return <div>
            <ClientPage data={{
                group: res1.data,
                list: res2.data
            }}/>
        </div>
    }
    return <div>error</div>

}
export default Software;
