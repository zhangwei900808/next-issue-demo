'use client'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import cns from "classnames/bind";
import {setChooseTag} from '@/lib/slices/squareSlice'

let cx = cns.bind(styles);

const UrlTags = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {query} = router;

    const {tagList, chooseTag} = useSelector(state => state.square)

    function onChooseTag(item) {
        dispatch(setChooseTag(item))
        router.push(`/square?category=${item.code}`, undefined, {shallow: true})
    }

    return <div className={styles.container}>
        <div className={styles.content}>
            {
                props.showTitle?<div className={styles.preview}>
                    开发语言：
                </div>:null
            }

            <div className={cx({
                  list: true
              }
            )} style={{paddingTop: props.showTitle?'50px':''}}>
                {
                    tagList.map(item => {
                        return <div key={item.key} className={cx({
                            tag: true,
                            chooseTag: query.category === item.name
                        })} onClick={() => {
                            onChooseTag(item)
                            if (props.choose){
                                props.choose()
                            }
                        }
                        }>
                            <span className={styles.prefix} />
                            <span className={styles.name}>{item.name}</span>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default UrlTags
