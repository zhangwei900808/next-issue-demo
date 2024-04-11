'use client'
import React, {useEffect, useRef, useState} from "react";
import UrlTags from "@/components/square/urlTags";
import {useDispatch, useSelector} from 'react-redux'

import {getGithubData} from '@/lib/slices/squareSlice';
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

  // const {query} = router;
  const [loading, setLoading] = useState(true);
  const langList = useRef([])
  const [isFinished, setIsFinished] = useState(false)
  const [open, setOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('')
  const pageNum = useRef(1)
  const {tagList} = useSelector(state => state.square)


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
    setSearchValue(searchParams.get('search') || '')
    if (searchParams.get('category')) {
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
  }, [searchParams])

  async function loadMoreData() {
    setLoading(true)
    const fs = tagList.filter(f => f.name === searchParams.get('category'))
    if (fs.length > 0) {
      const result = await dispatch(getGithubData({
        lang: fs[0].code,
        pageNo: pageNum.current,
        param: searchParams.get('search') || ''
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

  return <div>
    <div>
      {/*{*/}
      {/*  !isMobile ? <div className={styles.tags}>*/}
      {/*    <UrlTags showTitle={true}/>*/}
      {/*  </div> : null*/}
      {/*}*/}

      <div>
        <div>
          <div>
            {/*{*/}
            {/*  isMobile? <PicRightOutlined className={styles.icon} onClick={() => {*/}
            {/*    setOpen(true)*/}
            {/*  }*/}
            {/*  }/>:null*/}
            {/*}*/}
            <span>{searchParams.get('category') || ''}</span>
          </div>
          <div>
            <Input
                defaultValue={searchParams.get('search') || ''}
                value={searchValue || ''}
                className={''}
                placeholder="请输入搜索内容"
                onChange={(e) => {
                  setSearchValue(e.target.value)
                }}
                onPressEnter={(e) => {
                  if (searchParams.get('category') && e.target.value) {
                    router.push(`/square?category=${searchParams.get('category')}&search=${e.target.value}`, undefined, {shallow: true})
                  } else {
                    router.push(`/square?category=${searchParams.get('category')}`, undefined, {shallow: true})
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

        <div id={'scrollableDiv2'}>
          {
            loading && pageNum.current === 1 ?
                <div><Loading/></div> : langList.current.length > 0 ?
                    <InfiniteScroll
                        //注意：dataLength={remindList.length}要写remindList.length不能写成remindListTotal,切记！
                        dataLength={langList.current.length}
                        next={loadMoreData}
                        hasMore={langList.current.length < 200 || !isFinished}
                        loader={<div>
                          {loading ? <Loading/> : null}
                        </div>}
                        scrollableTarget="scrollableDiv2">
                      <div>
                        {
                          langList.current.map((item, index) => {
                            return <div key={`${item.node_id}-${index}`}>

                              <div onClick={() => goto(item.html_url)}>
                                {
                                  item && item.owner && item.owner.avatar ? <img src={item.owner.avatar}/> :
                                      item.owner.avatar_url ? <img src={item.owner.avatar_url}/> :
                                          <FireOutlined style={{fontSize: '20px'}}/>
                                }
                              </div>
                              <div>
                                <div onClick={() => goto(item.html_url)}>{item.name || '-'}</div>
                                {item.homepage ? <a href={item.homepage}
                                                    target={'_blank'}>{item.homepage}</a> : null}
                                <div title={item.description}>{item.description}</div>
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
                    </InfiniteScroll> : <div><Empty/></div>
          }
        </div>
      </div>
    </div>
    {/*<Drawer title="开发语言" width={280} placement="left" onClose={onClose} open={open} bodyStyle={{padding: '0'}}>*/}
    {/*  <div className={styles.tags}>*/}
    {/*    <UrlTags showTitle={false} choose={onClose}/>*/}
    {/*  </div>*/}
    {/*</Drawer>*/}
  </div>
}
export default ClientPage
