import ClientPage from "@/app/(system)/square/clientPage";
async function getGithubData(params) {
    let lang = ''
    let search = ''
    if (params.category){
        lang = params.category
    }
    if (params.search){
        search = params.search
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/space/info/getGithubData`, {
        method: 'POST',
        body: JSON.stringify({
            lang: lang,
            pageNo: 1,
            param: search
        }),
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Square = async (props) => {
    console.log('ssquare=', JSON.stringify(props.searchParams))
    const res = await getGithubData(props.searchParams)
    if (res.status === 0) {
        console.log('ddd=', res)
        return <div>
            <ClientPage data={res.data}/>
        </div>
    }
    return <div>
        <ClientPage />
    </div>

}
export default Square;
