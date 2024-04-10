'use client'
import {useEffect, useState} from 'react'
import {Tabs, Input, Row, Col, Menu, Button, Anchor} from 'antd';
import {
    WeiboOutlined, MailOutlined, ShoppingCartOutlined, LineChartOutlined,
    DesktopOutlined, CarOutlined, CustomerServiceOutlined, CommentOutlined, VideoCameraOutlined,
    SolutionOutlined, HomeOutlined, SendOutlined, ManOutlined, TranslationOutlined, CloudServerOutlined
} from '@ant-design/icons';


const SubPage = ({urls}) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [])

    function renderTabs() {
        const anchorList = urls.map(item => {
            if (item.group === "shopping") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <ShoppingCartOutlined className={'text-[18px]'}/>
                        <span>
                            {item.groupName}
                        </span>
                    </div>,
                }
            }
            if (item.group === "news") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <WeiboOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "finance") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <LineChartOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "technology") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <DesktopOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "car") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <CarOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "email") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <MailOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "music") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <CustomerServiceOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "sociality") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <CommentOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "videolive") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <VideoCameraOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "recruitment") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <SolutionOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "house") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <HomeOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "travel") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <SendOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "it") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <ManOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "dictional") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <TranslationOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "cloud") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        <CloudServerOutlined className={'text-[18px]'}/>
                        {item.groupName}
                    </div>,
                }
            } else {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div className={'pt-[6px] pb-[12px] flex items-center justify-center gap-1'}>
                        {item.groupName}
                    </div>,
                }
            }

        })
        return <Anchor
            offsetTop={60}
            targetOffset={132}
            direction="horizontal"
            // getCurrentAnchor={(activeLink)=>{
            //   return
            // }}
            items={anchorList}
        />
    }

    function renderUrls() {
        const result = urls.map((item, index) => {
            return <div className='bg-white mb-[20px] rounded-xl'>
                <div id={item.group} className={'px-6 py-4 border-solid border-[#ddd] border-b-[1px] font-medium'}>{item.groupName}</div>
                <div className={'grid grid-cols-auto-250 auto-rows-max gap-y-[42px] gap-x-[24px] items-center p-6'}>
                    {
                        item.commonUrlsList.map(url => {
                            return <div className={'flex items-center gap-4'} onClick={() => {
                                window.open(url.url)
                            }}>
                                <div className={'cursor-pointer'}>
                                    <img src={url.icon} className={'w-[32px] h-[32px] rounded-md'}/>
                                </div>
                                <div className={'cursor-pointer'}>
                                    <span className={'font-medium'}>{url.name}</span>
                                    {/*<span className={styles.desc} title={url.description}>{url.description}</span>*/}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        })

        return <div className={'w-full sm:w-full md:w-[640px] lg:w-[768px] xl:w-[1024px] 2xl:w-[1280px]'}>
            {result}
        </div>
    }

    return <div className={'bg-[#F4F5F6]'}>
        <div className={'bg-white fixed top-[56px] left-0 right-0'}>
            <div className={'flex items-center justify-center bg-white gap-2'}>
                {renderTabs()}
            </div>
        </div>
        <div className={'flex items-center justify-center pt-[86px]'}>
            {renderUrls()}
        </div>
    </div>
}
export default SubPage;
