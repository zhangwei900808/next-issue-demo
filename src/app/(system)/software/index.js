import {Tabs, Input, Row, Col, Menu, Typography, Divider, Drawer, Button, Modal, List} from 'antd';
import {AppstoreOutlined, MailOutlined, MenuOutlined, SearchOutlined} from '@ant-design/icons';
import styles from './index.module.scss'
import React, {memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cns from "classnames/bind";
import {useRouter} from "next/navigation";
import _ from "lodash";

let cx = cns.bind(styles);

const Software = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [gid, setGid] = useState([])


  // 查询软件和用户软件请求
  async function queryApp(groupId, param) {
    await dispatch(getSoftwareQueryBy({
      groupId,
      param
    }))
    // await dispatch(getUserSoftware())
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
        <div className={styles.box}>
          <div className={styles.leftSpace}>
            <div className={styles.imgWrapper} onClick={() => {
              goto(item, 'index')
            }}>
              <img src={item.icon}/>
            </div>
            <div className={styles.right}>
              <div className={styles.name} onClick={() => {
                goto(item, 'index')
              }}>{item.name}</div>
              <div className={styles.desc} title={item.desc}>{item.desc}</div>
            </div>
          </div>
          <div className={styles.rightSpace}>
            <div className={styles.btnGet} onClick={() => {
              goto(item, 'download')
            }}>获取</div>
          </div>
        </div>
      </Col>
    })
  }

  // 点击搜索
  async function changeInput(e) {
    if (softwareGroupId) {
      await queryApp(softwareGroupId, e.target.value)
    }

  }

  function renderGroupApp() {
    const sglClone = _.cloneDeep(softwareGroupList)
    const fsg = sglClone.sort((a,b) => a.sort-b.sort)


    return fsg.map(group => {
      const flist = softwareList.filter(item =>item.groupId === group.id)
      // const showAllTip = gid.filter(f => f === group.id)
      // let showAll = false
      return <>
        <Row gutter={[32, 42]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className={styles.upper}>
              <span className={styles.ul}>{group.groupName}</span>
              {
                flist.length>12?<span className={styles.ur} onClick={()=>{
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

  return <div className={styles.container}>
    <div className={cx({
      content: true,
      isMobile
    })}>
      <div className={styles.rowBox}>
        <div className={styles.rightBox}>
          <div className={styles.appBox}>
            {
              renderGroupApp()
            }
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default Software;
