'use client'
import {Tabs, Input, Row, Col, Menu, Typography, Divider, Drawer, Button, Modal, List} from 'antd';
import {AppstoreOutlined, MailOutlined, MenuOutlined, SearchOutlined} from '@ant-design/icons';
import styles from './index.module.scss'
import React, {memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cns from "classnames/bind";
import {useRouter} from "next/navigation";
import _ from "lodash";
import Empty from "@/components/empty";

let cx = cns.bind(styles);

const Software = ({data}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [gid, setGid] = useState([])


  if (!data.group || !data.list){//todo
    return <Empty />
  }
  function goto(item, type) {
    console.log('item=', item)
    if (type === 'index'){
      window.open(item.url);
    }
    if (type === 'download'){
      window.open(item.download);
    }
  }

  // 渲染软件列表
  function renderApp(gId, flist) {
    // const flist = softwareList.filter(item =>item.groupId === gid)
    let result = flist
    const fg = gid.filter(g => g === gId)
    if (fg.length<=0){
      result = result.slice(0,12)
    }
    return result.map(item => {
      return <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6} flex>
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-4'}>
            <div className={'w-[42px] h-[42px] shrink-0'} onClick={() => {
              goto(item, 'index')
            }}>
              <img src={item.icon} className={'w-full h-full rounded-md'}/>
            </div>
            <div>
              <div className={'text-[18px] font-medium cursor-pointer hover:underline'} onClick={() => {
                goto(item, 'index')
              }}>{item.name}</div>
              <div className={cx({
                'text-[gray]':true,
                'truncate': true,
                'desc': true
              })} title={item.desc}>{item.desc}</div>
            </div>
          </div>
          <div>
            <div className={'shrink-0 whitespace-nowrap bg-[#eee] px-4 py-1 rounded-2xl text-sm cursor-pointer text-[#54458a] hover:underline dark:bg-[#1c2127]'} onClick={() => {
              goto(item, 'download')
            }}>获取</div>
          </div>
        </div>
      </Col>
    })
  }


  function renderGroupApp() {
    const sglClone = _.cloneDeep(data.group)
    const fsg = sglClone.sort((a,b) => a.sort-b.sort)

    return fsg.map(group => {
      const flist = data.list.filter(item =>item.groupId === group.id)
      // const showAllTip = gid.filter(f => f === group.id)
      // let showAll = false
      return <>
        <Row gutter={[32, 42]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className={'flex items-center justify-between'}>
              <span className={'text-xl font-medium'}>{group.groupName}</span>
              {
                flist.length>12?<span className={'cursor-pointer text-[#54458a] hover:underline'} onClick={()=>{
                  // const list = softwareList.filter(item => item.groupId === group.id)
                  // setList(list)
                  // setOpen(true)
                  setGid(gid.concat(group.id))
                  // showAll = true
                }}>查看全部</span>:null
              }
            </div>
          </Col>
          {
            renderApp(group.id, flist)
          }
        </Row>
        <Divider />
      </>
    })
  }

  return <div className={'px-[140px] py-[32px] hideEle:px-[32px]'}>
    {
      renderGroupApp()
    }
  </div>
}
export default Software;
