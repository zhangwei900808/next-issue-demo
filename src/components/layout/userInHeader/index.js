'use client'
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {Avatar, Popover, Drawer, Menu, Dropdown, List, Badge, Button, Space, Divider, Typography} from "antd";
import {
    HomeOutlined,
    FolderOutlined,
    UserOutlined,
    MenuOutlined,
    MailOutlined,
    PictureOutlined,
    ClusterOutlined,
    SettingOutlined,
    ShareAltOutlined,
    RobotOutlined,
    GlobalOutlined,
    FormOutlined, CloseOutlined
} from "@ant-design/icons";
import IconFont from "@/utils/iconFont";
import classNames from "classnames/bind";
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {useSession, signIn, signOut} from "next-auth/react";

const UserInHeader = () => {
    const [visible, setVisible] = useState(false);
    const {data: session} = useSession()

    const showDrawer = () => {
        setVisible(true);
    };
    const hideDrawer = () => {
        setVisible(false);
    };

    const dispatch = useDispatch();
    const router = useRouter();

    // 显示下拉菜单头像
    function renderDropdownAvatar() {
        if (session) {
            return <Avatar src={session.user.image} size={48} className={'rounded-full cursor-pointer'}/>;
        } else {
            return <Avatar icon={<UserOutlined style={{fontSize: '22px'}}/>} className={'rounded-full cursor-pointer'}/>;
        }
    }

    // 显示头部头像
    function renderHeaderAvatar() {
        if (session && session.user.image) {
            return <img src={`${session.user.image}?x-oss-process=style/30X30`} className={'rounded-full cursor-pointer'} onClick={() => {
                showDrawer()
            }
            }/>
        } else {
            return <Avatar icon={<UserOutlined/>} className={'rounded-full cursor-pointer'} onClick={() => {
                showDrawer()
            }
            }/>
        }
    }

    function getMenus() {
        if (session && session.user.image) {
            let menus = [
                {
                    label: '我的主页',
                    key: '1',
                    icon: <HomeOutlined className={'text-xl'}/>,
                    url: `/${session.user.name}`
                },{
                    label: '我的ChatAI',
                    key: '5',
                    icon: <RobotOutlined className={'text-base'}/>,
                    url: `/${session.user.name}/aiSpace/chatAi`
                },{
                    label: '我的ImageAI',
                    key: '7',
                    icon: <PictureOutlined className={'text-base'}/>,
                    url: `/${session.user.name}/aiSpace/imageAi`
                },{
                    label: '我的网址',
                    key: '2',
                    icon: <GlobalOutlined className={'text-base'}/>,
                    url: `/${session.user.name}/urlSpace`
                }
            ]

            // if (!isMobile) {
                menus = menus.concat([{
                    label: '我的笔记',
                    key: '3',
                    icon: <FormOutlined className={'text-base'}/>,
                    url: `/${session.user.name}/noteSpace`
                },
                    {
                        label: '我的文件',
                        key: '4',
                        icon: <FolderOutlined className={'text-base'}/>,
                        url: `/${session.user.name}/fileSpace`
                    },{
                        type: 'divider',
                        key: 'divider'
                    }])
            // }
            menus = menus.concat([{
                label: '设置',
                key: '6',
                icon: <SettingOutlined className={'text-base'}/>,
                url: `/setting/profile`
            },
                {
                    label: '退出',
                    key: 'logout',
                    icon: <IconFont type={"icon-tuichu1"} className={'text-base'}/>,
                }])
            return menus
        }
        return []
    }

    async function onClickMenuItem({item, key, keyPath, domEvent}) {
        hideDrawer()
        if (key === 'logout') {
            // // await dispatch(logout())
            // // 清除完之后立马跳转到登录页面
            // location.href = '/login'
            signOut()
        } else if (key !== 'divider') {
            router.push(item.props.url);
        }
    }


    return <div>
        <div className={'border-white border-solid border-2 rounded-full'}>
            {renderHeaderAvatar()}
        </div>
        <Drawer title={<div className={'flex items-center justify-between'}>
            <div className={'flex items-center gap-2'}>
                <div className={'p-2'}>
                    {renderDropdownAvatar()}
                </div>
                <div className={'flex items-center flex-col'}>
                    <span className={'text-base'}>{session && session.user.name}</span>
                    <span className={'text-sm font-normal'}>{session && session.user.nickName}</span>
                </div>
            </div>
            <div className={'bg-[#eee] h-[28px] w-[28px] flex items-center justify-center rounded mr-2 cursor-pointer text-[#aaa]'} onClick={() => {
                hideDrawer()
            }}>
                    <CloseOutlined className={'text-sm'}/>
                </div>
        </div>}
                placement="right"
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
                items={getMenus()}
            />
        </Drawer>
    </div>
}

export default UserInHeader;
