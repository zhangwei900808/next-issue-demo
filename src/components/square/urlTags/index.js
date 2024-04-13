'use client'
import {useDispatch, useSelector} from "react-redux";
import {useRouter, useSearchParams} from "next/navigation";


const UrlTags = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    // const {query} = router;
    const searchParams = useSearchParams()

    const {tagList, chooseTag} = useSelector(state => state.square)

    function onChooseTag(item) {
        // dispatch(setChooseTag(item))
        router.push(`/square?category=${item.code}`, {scroll: true})
    }

    return <div className={'w-full'}>
        {
            props.showTitle ? <div className={'text-xl font-medium py-3'}>
                开发语言：
            </div> : null
        }

        <div className={'pt-[12px]'}>
            {
                tagList.map(item => {
                    return <div key={item.key}
                                className={searchParams.get('category') === item.name ? 'bg-[#eee] dark:bg-[#2D333B] hover:bg-[#eee] dark:hover:bg-[#2D333B] p-1 px-2 rounded-md cursor-pointer' : 'bg-transparent hover:bg-[#eee] dark:hover:bg-[#2D333B] p-1 px-2 rounded-md cursor-pointer'}
                                onClick={() => {
                                    onChooseTag(item)
                                    if (props.choose) {
                                        props.choose()
                                    }
                                }
                                }>
                        <span className={'inline-flex cursor-pointer whitespace-nowrap'}>{item.name}</span>
                    </div>
                })
            }
        </div>
    </div>
}

export default UrlTags
