'use client'
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'

import {Form, Select, InputNumber, Switch, Divider, Menu, Drawer, Typography} from 'antd'
import Logo from '../logo'
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {
    LikeOutlined,
    FireOutlined,
    InfoCircleOutlined,
    MenuOutlined,
    HomeOutlined,
    BuildOutlined,
    DownloadOutlined,
    ReadOutlined,
    CloseOutlined,
    BookOutlined,
    FormOutlined,
    PhoneOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import Loading from "@/components/loading";
import Empty from "@/components/empty";

// import {getUserMostClickUrlList} from "@/store/slices/systemSlice";
import {useSession} from "next-auth/react";
const {Title, Paragraph, Text, Link} = Typography;

const LogoInHeader = (props) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [userClickUrls, setUserClickUrls] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const {data: session} = useSession()

    const {loginMenus, logoutMenus} = useSelector(state => state.system)


    console.log('---------------------session 444', session)
    const showDrawer = () => {
        setVisible(true);
    };
    const hideDrawer = () => {
        setVisible(false);
    };

    async function goto() {
        if (session) {
            // await dispatch(clearLatestNews())
            // dispatch(getLatestNewsForUsers({
            //     pageSize: pagination.pageSize,
            //     pageNum: 1,
            //     type: 1
            // }))
            router.push('/', undefined, {shallow: true})
        } else {
            window.location = '/'
        }
    }

     function onClickMenuItem({item, key, keyPath, domEvent}) {
        if (session) {
            loginMenus.forEach(async d => {
                if (d.key === key) {
                    if (key === '0'){
                        // await dispatch(clearLatestNews())
                        // dispatch(getLatestNewsForUsers({
                        //     pageSize: pagination.pageSize,
                        //     pageNum: 1,
                        //     type: 1
                        // }))
                        router.push('/', undefined, {shallow: true})
                    }else{
                        router.push(d.url);
                    }
                }
            })
        } else {
            logoutMenus.forEach(d => {
                if (d.key === key) {
                    window.location = d.url
                }
            })
        }
        hideDrawer()
    }

    function onClickUrlItem({item, key, keyPath, domEvent}) {
        userClickUrls.forEach(d =>{
            if (d.key === key){
                window.open(d.url, '_blank')
            }
        })
        hideDrawer()
    }

    function getMenuList() {
        if (session) {
            let newLoginMenus = JSON.parse(JSON.stringify(loginMenus))
            return newLoginMenus.map(item =>{
                if (item.type === 'drawer-menus'){
                    if (item.key === '0'){
                        item.icon = <HomeOutlined />
                    }
                    if (item.key === '1'){
                        item.icon = <LikeOutlined />
                    }
                    if (item.key === '3'){
                        item.icon = <DownloadOutlined />
                    }
                    if (item.key === '4'){
                        item.icon = <InfoCircleOutlined />
                    }
                    if (item.key === '5'){
                        item.icon = <FireOutlined />
                    }
                    if (item.key === '6'){
                        item.icon = <ReadOutlined />
                    }
                    if (item.key === '7'){
                        item.icon = <BookOutlined />
                    }
                    if (item.key === '8'){
                        item.icon = <PhoneOutlined />
                    }
                    if (item.key === '9'){
                        item.icon = <VideoCameraOutlined />
                    }
                    return item;
                }
            })
        } else {
            let newLogoutMenus = JSON.parse(JSON.stringify(logoutMenus))
            return newLogoutMenus.map(item => {
                if (item.type === 'drawer-menus'){
                    if (item.key === '0'){
                        item.icon = <HomeOutlined />
                    }
                    if (item.key === '1'){
                        item.icon = <LikeOutlined />
                    }
                    if (item.key === '3'){
                        item.icon = <DownloadOutlined />
                    }
                    if (item.key === '4'){
                        item.icon = <InfoCircleOutlined />
                    }
                    if (item.key === '5'){
                        item.icon = <FireOutlined />
                    }
                    if (item.key === '6'){
                        item.icon = <ReadOutlined />
                    }
                    if (item.key === '7'){
                        item.icon = <BookOutlined />
                    }
                    if (item.key === '8'){
                        item.icon = <PhoneOutlined />
                    }
                    if (item.key === '9'){
                        item.icon = <VideoCameraOutlined />
                    }
                    return item;
                }
            })
        }
    }

    useEffect(() => {
        if (visible) {
            // todo:
            // getUserClickUrls()
        }
    }, [visible])

    async function getUserClickUrls() {
        setLoading(true)
        const res = await dispatch(getUserMostClickUrlList())
        console.log('getUserClickUrls res=', res)
        const resData = res.payload.data
        if (resData && resData.length > 0) {
            let list = []
            resData.forEach(item =>{
                list.push({
                    key: item.id,
                    label: item.title,
                    url: item.url,
                    favicon: item.favicon
                })
            })
            setUserClickUrls(list)
        }
        setLoading(false)
    }

    function getUserClickUrlMenus() {
        return userClickUrls.map(item => {
            return {
                icon: <span>
                    <img src={item.favicon}/>
                </span>,
                ...item
            }
        })
    }

    return <div className={'flex gap-4 items-center'}>
        {/*//只有登录和移动端才显示*/}
        {
            session ? <div className={'flex text-white dark:bg-[#1C2127] dark:text-white cursor-pointer border border-solid border-white rounded w-[30px] h-[30px] items-center justify-center'} onClick={() => {
                showDrawer()
            }}><MenuOutlined /></div> : null
        }
        <Logo isLogin={!!session} clickLogo={() => {
            goto()
            hideDrawer()
        }}/>
        <Drawer
            title={
                <div className={'flex items-center justify-between px-3 py-3'}>
                    <Logo clickLogo={() => {
                        // goto()
                        // hideDrawer()
                    }}/>
                    <div className={'dark:bg-[#22272E] dark:text-white dark:hover:bg-[#2A3037] bg-[#eee] h-[28px] w-[28px] flex items-center justify-center rounded mr-2 cursor-pointer text-[#aaa]'} onClick={() => {
                        hideDrawer()
                    }}>
                        <CloseOutlined/>
                    </div>
                </div>
            }
            placement="left"
            closable={false}
            onClose={hideDrawer}
            open={visible}
            width={320}
            headerStyle={{padding: "0"}}
            bodyStyle={{padding: "0", zIndex: '10'}}>
            <Menu
                onClick={onClickMenuItem}
                selectable={false}
                style={{
                    width: '100%',
                }}
                mode="inline"
                items={getMenuList()}
            />
            {/*<Divider/>*/}
            <div className={'px-3'}><Title level={5}>常用网址</Title></div>
            {/*<div>*/}
            {/*    {*/}
            {/*        loading?<Loading/> : userClickUrls.length>0?<Menu*/}
            {/*            onClick={onClickUrlItem}*/}
            {/*            selectable={false}*/}
            {/*            style={{*/}
            {/*                width: '100%',*/}
            {/*            }}*/}
            {/*            mode="inline"*/}
            {/*            items={getUserClickUrlMenus()}*/}
            {/*        />:<div>*/}
            {/*            <Empty title='暂无数据'/>*/}
            {/*        </div>*/}
            {/*    }*/}

            {/*</div>*/}
            {/*<div className={styles.record}><Record/></div>*/}
        </Drawer>
    </div>
}

export default LogoInHeader;
