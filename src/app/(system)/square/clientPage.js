'use client'
import React, {useEffect, useRef, useState} from "react";
import UrlTags from "@/components/square/urlTags";
import PageLayout from "@/components/layout/pageLayout";
import {useDispatch, useSelector} from 'react-redux'

import {getGithubData} from '@/store/slices/squareSlice';
import {useRouter, useParams, useSearchParams} from "next/navigation";
import {SearchOutlined, StarOutlined, PicRightOutlined, FireOutlined} from "@ant-design/icons";

import {Button, Drawer, Input, Typography} from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import Empty from "@/components/empty";
import Loading from "@/components/loading";


const ClientPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams()
  const searchParams = useSearchParams()

  const {query} = router;
  const [loading, setLoading] = useState(true);
  const langList = useRef([])
  const [isFinished, setIsFinished] = useState(false)
  const [open, setOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('')
  const pageNum = useRef(1)


  // useEffect(() => {
  //   if (!isMobile) {
  //     setOpen(false)
  //   }
  // }, [isMobile])

  useEffect(() => {
    // 使用 window.scrollTo() 方法将滚动条置顶
    window.scrollTo({
      top: 0, // 指定垂直偏移量为0，即将滚动条置顶
      behavior: 'smooth' // 可选，表示平滑滚动动画效果，默认值为 'auto'
    });
    setSearchValue(query.search || '')
    if (query.category) {
      setLoading(true)
      langList.current = []
      pageNum.current = 1
      setTimeout(() => {
        loadMoreData()
      }, 100)
    } else {
      if (tagList.length > 0) {
        router.push(`/square?category=${tagList[0].code}`, undefined, {shallow: true})
      }
    }
  }, [query.category, query.search])

  async function loadMoreData() {
    setLoading(true)
    const fs = tagList.filter(f => f.name === query.category)
    if (fs.length > 0) {
      const result = await dispatch(getGithubData({
        lang: fs[0].code,
        pageNo: pageNum.current,
        param: query.search || ''
      }))
      setLoading(false)
      if (result.payload.data){
        const list = result.payload.data.rows
        const total = result.payload.data.total
        if ((pageNum.current > 1 && list.length === 0) || langList.current.length >= total) {
          setIsFinished(true)
        }
        langList.current = langList.current.concat(list)
        pageNum.current += 1
      }
    }
  }

  function formatNumber(num) {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      const formatted = (num / 1000).toFixed(1);
      return `${formatted}k`;
    } else {
      const formatted = (num / 1000000).toFixed(1);
      return `${formatted}w`;
    }
  }

  function goto(url) {
    window.open(url, '_blank')
  }

  const onClose = () => {
    setOpen(false);
  };

  return <PageLayout>
    <div className={styles.container}>
      <div className={styles.content}>
        {
          !isMobile ? <div className={styles.tags}>
            <UrlTags showTitle={true}/>
          </div> : null
        }

        <div className={styles.techList}>
          <div className={styles.header}>
            <div className={styles.title}>
              {
                isMobile? <PicRightOutlined className={styles.icon} onClick={() => {
                  setOpen(true)
                }
                }/>:null
              }
              <span>{query.category || ''}</span>
            </div>
            <div className={styles.searcher}>
              <Input
                defaultValue={query.search || ''}
                value={searchValue || ''}
                className={styles.search}
                placeholder="请输入搜索内容"
                onChange={(e) => {
                  setSearchValue(e.target.value)
                }}
                onPressEnter={(e) => {
                  if (query.category && e.target.value) {
                    router.push(`/square?category=${query.category}&search=${e.target.value}`, undefined, {shallow: true})
                  } else {
                    router.push(`/square?category=${query.category}`, undefined, {shallow: true})
                  }
                }}
                prefix={<SearchOutlined onClick={() => {
                }
                }/>}
                style={{borderRadius: 8, borderWidth: 2}}
                allowClear
              />
            </div>
          </div>

          <div id={styles.scrollableDiv2}>
            {
              loading && pageNum.current === 1 ?
                <div className={styles.loadingEmpty}><Loading/></div> : langList.current.length > 0 ?
                  <InfiniteScroll
                    //注意：dataLength={remindList.length}要写remindList.length不能写成remindListTotal,切记！
                    dataLength={langList.current.length}
                    next={loadMoreData}
                    hasMore={langList.current.length < 200 || !isFinished}
                    loader={<div className={styles.loadingEmpty}>
                      {loading ? <Loading/> : null}
                    </div>}
                    scrollableTarget="scrollableDiv2">
                    <div className={styles.gridList}>
                      {
                        langList.current.map((item, index) => {
                          return <div className={styles.item} key={`${item.node_id}-${index}`}>

                            <div className={styles.l} onClick={() => goto(item.html_url)}>
                              {
                                item && item.owner && item.owner.avatar?<img src={item.owner.avatar}/>:
                                    item.owner.avatar_url?<img src={item.owner.avatar_url}/>:<FireOutlined style={{fontSize: '20px'}}/>
                              }
                            </div>
                            <div className={styles.r}>
                              <div className={styles.name} onClick={() => goto(item.html_url)}>{item.name || '-'}</div>
                              {item.homepage ? <a className={styles.homepage} href={item.homepage}
                                                  target={'_blank'}>{item.homepage}</a> : null}
                              <div className={styles.info} title={item.description}>{item.description}</div>
                              <div>
                                <Button type="default" size={'small'} icon={<StarOutlined/>} onClick={() => {
                                  goto(item.html_url + '/stargazers')
                                }
                                }>{formatNumber(item.stargazers_count)}</Button>
                              </div>
                            </div>
                          </div>
                        })
                      }
                    </div>
                  </InfiniteScroll> : <div className={styles.loadingEmpty}><Empty/></div>
            }
          </div>
        </div>
      </div>
      <Drawer title="开发语言" width={280} placement="left" onClose={onClose} open={open} bodyStyle={{padding: '0'}}>
        <div className={styles.tags}>
          <UrlTags showTitle={false} choose={onClose}/>
        </div>
      </Drawer>
    </div>
  </PageLayout>
}
export default ClientPage
