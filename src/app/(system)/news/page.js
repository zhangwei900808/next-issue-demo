import ClientPage from "@/app/(system)/news/clientPage";
async function getMsnData(params) {
    let tab = params.tab || 'Y_77f04c37-b63e-46b4-a990-e926f7d129ff'
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/space/info/getMsnData/${tab}/0`
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const News = async (props) => {
    const res = await getMsnData(props.searchParams)
    if (res.sections) {
        return <div>
            <ClientPage data={res.sections}/>
        </div>
    }
    return <div>
        <ClientPage />
    </div>

}
export default News;
