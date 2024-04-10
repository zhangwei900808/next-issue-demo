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
                    title: <div>
                        <ShoppingCartOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "news") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <WeiboOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "finance") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <LineChartOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "technology") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <DesktopOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "car") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <CarOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "email") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <MailOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "music") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <CustomerServiceOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "sociality") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <CommentOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "videolive") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <VideoCameraOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "recruitment") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <SolutionOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "house") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <HomeOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "travel") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <SendOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "it") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <ManOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "dictional") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <TranslationOutlined/>
                        {item.groupName}
                    </div>,
                }
            }
            if (item.group === "cloud") {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
                        <CloudServerOutlined/>
                        {item.groupName}
                    </div>,
                }
            } else {
                return {
                    key: item.id,
                    href: `#${item.group}`,
                    title: <div>
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
            return <div className=''>
                <div id={item.group}>{item.groupName}</div>
                <div>
                    {
                        item.commonUrlsList.map(url => {
                            return <div onClick={() => {
                                window.open(url.url)
                            }}>
                                <div>
                                    <img src={url.icon}/>
                                </div>
                                <div>
                                    <span>{url.name}</span>
                                    {/*<span className={styles.desc} title={url.description}>{url.description}</span>*/}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        })

        return <div className={''}>
            {result}
        </div>
    }

    return <div>
        <div>{renderTabs()}</div>
        <div>
            {renderUrls()}
        </div>
    </div>
}
export default SubPage;
