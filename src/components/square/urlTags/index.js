'use client'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useRouter, useSearchParams} from "next/navigation";
import cns from "classnames/bind";
import {setChooseTag} from '@/lib/slices/squareSlice'

let cx = cns.bind(styles);

const UrlTags = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    // const {query} = router;
    const searchParams = useSearchParams()

    const {tagList, chooseTag} = useSelector(state => state.square)

    function onChooseTag(item) {
        dispatch(setChooseTag(item))
        router.push(`/square?category=${item.code}`, undefined, {shallow: true})
    }

    return <div className={'flex  sticky top-[56px]'}>
        <div className={'w-[200px]'}>
            {
                props.showTitle?<div className={'text-xl font-medium py-2'}>
                    开发语言：
                </div>:null
            }

            <div className='list'>
                {
                    tagList.map(item => {
                        return <div key={item.key} className={cx({
                            tag: true,
                            chooseTag: searchParams.get('category') === item.name
                        })} onClick={() => {
                            onChooseTag(item)
                            if (props.choose){
                                props.choose()
                            }
                        }
                        }>
                            <span className={''} />
                            <span className={'pb-2 inline-flex cursor-pointer'}>{item.name}</span>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default UrlTags
