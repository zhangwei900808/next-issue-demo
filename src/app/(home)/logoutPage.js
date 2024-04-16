'use client'
import React, {useState} from "react";
import {Typography, Button, Space, Divider, Tabs,Segmented, Statistic,Row,Col,Avatar} from 'antd'
import {useSelector} from "react-redux";
import classNames from "classnames/bind";
// let cx = classNames.bind(styles);
const {Title, Paragraph, Text, Link} = Typography;

const LogoutPage = (props) => {
    const [spaceIndex, setSpaceIndex] = useState('7')
    const [year, setYear] = useState(new Date().getFullYear());

    function getModuleList() {
        return [{
            label: <Title level={3}
                          style={{color: spaceIndex === '7' ? '#54458a' : ''}}>我的主页</Title>,
            key: '7',
        },
            {
                label: <Title level={3}
                              style={{color: spaceIndex === '1' ? '#54458a' : ''}}>网址空间</Title>,
                key: '1',
            },
            {
                label: <Title level={3}
                              style={{color: spaceIndex === '2' ? '#54458a' : ''}}>笔记空间</Title>,
                key: '2',
            },
            {
                label: <Title level={3}
                              style={{color: spaceIndex === '3' ? '#54458a' : ''}}>文件空间</Title>,
                key: '3',
            }, {
                label: <Title level={3}
                              style={{color: spaceIndex === '6' ? '#54458a' : ''}}>AIGC空间</Title>,
                key: '6',
            }]
    }

    return <div className={'relative'}>
        <div className={'px-[100px] py-[100px] best-w:px-[32px] best-w:py-[32px]'}>
            <section className='flex items-start justify-between gap-[64px] best-w:flex-col pb-[32px]'>
                <div className={'w-1/2 best-w:w-full'}>
                    <Typography className={'flex flex-col gap-[32px]'}>
                        <Title>Seaurl：您的AI数字生活管理专家</Title>
                        <p className={'text-xl text-[#333] dark:text-white'}>
                            Seaurl是一家专业的在线平台，致力于帮助用户整理、收藏和管理他们在日常工作中遇到的网址、笔记和文件。我们的服务超越了传统的书签工具或笔记应用的功能，我们提供的是一种全面的策略，旨在优化用户的数字生活，提高他们的工作效率和信息管理能力。
                        </p>
                        <div className={'pt-[32px]'}>
                            <Space size={22}>
                                <Button type={'primary'} size={'large'} onClick={()=>{
                                    location.href="/login"
                                }}>立即登录</Button>
                                <Button type={'default'} size={'large'} onClick={()=>{
                                    location.href="/register"
                                }}>注册</Button>
                            </Space>
                        </div>
                    </Typography>
                </div>
                <div className={'w-1/2 relative best-w:w-full'}>
                    <div className={'absolute right-[-50px] best-w:right-0 top-[-50px] w-[200px] h-[200px] bg-[#fcff00] rounded-full z-10'}></div>
                    <img className={'rounded-xl relative z-20 shadow-xl'} src={'https://cdn.seaurl.com/home/bg/home.png'}/>
                </div>
            </section>
            <Divider/>
            <section className={'py-[32px] w-full flex items-center justify-center'}>
                <div className={'max-w-[1200px] w-full flex items-center justify-center flex-col best-w:flex-row'}>
                        <div className={'best-w:invisible best-w:w-0 best-w:gap-[32px]'}>
                            <Tabs
                                activeKey={spaceIndex}
                                size={'large'}
                                centered={false}
                                tabPosition={'top'}
                                tabBarGutter={120}
                                onTabClick={(e) => {
                                    setSpaceIndex(e)
                                }}
                                items={getModuleList()}
                            />
                        </div>
                        <div className={'xl:invisible xl:h-0'}>
                            <Tabs
                                activeKey={spaceIndex}
                                size={'large'}
                                centered={false}
                                tabPosition={'left'}
                                tabBarGutter={60}
                                onTabClick={(e) => {
                                    setSpaceIndex(e)
                                }}
                                items={getModuleList()}
                            />
                        </div>
                        <div className={'w-full'}>
                            {
                                spaceIndex === '7' ? <div>
                                    <p className={'text-xl text-[#333] py-[32px] dark:text-white'}>
                                        "我的主页"是全方位了解用户的数字足迹的窗口。在这里，您可以清晰地看到自己积累的积分展示我的活跃度与贡献度；以及所拥有的网址数，呈现了我的网络资源收藏与分享的数量；粉丝数则直观反映了我和广大用户的互动与影响力。
                                    </p>
                                    <div>
                                        {/*<div className={styles.circleBf2}></div>*/}
                                        <img className={'rounded-xl relative z-20 shadow-xl'}
                                             src={'https://cdn.seaurl.com/home/bg/user_master.png'}/>
                                    </div>
                                </div> : null
                            }
                            {
                                spaceIndex === '1' ? <div>
                                    <p className={'text-xl text-[#333] py-[32px] dark:text-white'}>
                                        "网址空间"是一个专业的在线平台，它允许用户分享他们在日常生活和工作中频繁访问的网站链接。此外，该平台还提供了社交功能，使用户能够查看并探索他们的朋友们所添加的网站链接，从而增强信息共享和网络资源的发现。
                                    </p>
                                    <div>
                                        {/*<div className={styles.circleBf2}></div>*/}
                                        <img className={'rounded-xl relative z-20 shadow-xl'}
                                             src={'https://cdn.seaurl.com/home/bg/url_space.png'}/>
                                    </div>
                                </div> : null
                            }
                            {
                                spaceIndex === '2' ? <div>
                                    <p className={'text-xl text-[#333] py-[32px] dark:text-white'}>
                                        "笔记"是一个专属的私有空间，仅对已注册用户开放。它提供了一个安全的环境，让用户能够记录和管理他们的生活和工作信息。这个功能强调了隐私保护和信息安全，确保用户的个人笔记只能由他们自己访问和查看。
                                    </p>
                                    <div>
                                        {/*<div className={styles.circleBf2}></div>*/}
                                        <img className={'rounded-xl relative z-20 shadow-xl'}
                                             src={'https://cdn.seaurl.com/home/bg/note_space.png'}/>
                                    </div>
                                </div> : null
                            }

                            {spaceIndex === '3' ? <div>
                                <p className={'text-xl text-[#333] py-[32px] dark:text-white'}>
                                    "文件管理"同样是一个专属的私有空间，仅对已注册用户开放。这个特性提供了一个安全的环境，让用户能够存储和管理他们的个人文件。为了满足用户的存储需求，我们预设了5GB的大容量存储空间。这个功能强调了隐私保护和数据安全，确保用户的个人文件只能由他们自己访问和查看。
                                </p>
                                <div>
                                    {/*<div className={styles.circleBf2}></div>*/}
                                    <img className={'rounded-xl relative z-20 shadow-xl'}
                                         src={'https://cdn.seaurl.com/home/bg/file_space.png'}/>
                                </div>
                            </div> : null}
                            {spaceIndex === '6' ? <div>
                                <p className={'text-xl text-[#333] py-[32px] dark:text-white'}>
                                    Seaurl为您提供了强大的AI问答助手，无论是关于学习、工作、生活还是娱乐，只需输入关键词，AI助手就能以人类语言的方式理解您的意图，并提供精准的回答。
                                </p>
                                <div>
                                    {/*<div className={styles.circleBf2}></div>*/}
                                    <img className={'rounded-xl relative z-20 shadow-xl'}
                                         src={'https://cdn.seaurl.com/home/bg/ai_bg.png'}/>
                                </div>
                            </div> : null}
                        </div>
                    </div>
            </section>
            <Divider/>
            <section className={'w-full flex items-center justify-center py-[32px]'}>
                <div className={'max-w-[900px] flex items-center justify-center flex-col gap-[32px]'}>
                    <Title>与用户共同成长</Title>
                    <p className={'text-xl text-[#333] dark:text-white'}>
                        在Seaurl，我们高度重视每一位用户的参与和贡献。我们欢迎新用户的加入，你们的反馈和建议对我们的产品优化和服务提升起着至关重要的作用。我们致力于与用户共同推动Seaurl的持续完善和发展。
                    </p>
                    <div>
                        <Row gutter={64}>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className={'text-center'}>
                                <Statistic title={'用户'} value={12121} valueStyle={{fontWeight:'bold',fontSize: '32px'}}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className={'text-center'}>
                                <Statistic title={'网址'} value={11293} valueStyle={{fontWeight:'bold',fontSize: '32px'}}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className={'text-center'}>
                                <Statistic title={'笔记'} value={828} valueStyle={{fontWeight:'bold',fontSize: '32px'}}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className={'text-center'}>
                                <Statistic title={'文件'} value={993} valueStyle={{fontWeight:'bold',fontSize: '32px'}}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
            <Divider/>
            <section className={'w-full flex items-center justify-center py-[32px] pb-[100px] best-w:pb-[200px]'}>
                <div className={'max-w-[900px] flex items-center justify-center flex-col gap-[32px]'}>
                    <Title>特别鸣谢</Title>
                    <p className={'text-xl text-[#333] dark:text-white'}>
                        感谢<span onClick={() => {
                        window.open('https://nextjs.org/')
                    }
                    }>Next.js</span>和<span onClick={() => {
                        window.open('https://ant.design/')
                    }
                    }>ant-design</span> 对本站提供的帮助
                    </p>
                    <div>
                    <Space size={64}>
                        <span onClick={() => {
                            window.open('https://nextjs.org/')
                        }
                        }>
                          <svg aria-label="Next.js logotype" height="32" role="img" viewBox="0 0 394 79"><path
                              d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z"
                              fill="var(--geist-foreground)"></path><path
                              d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z"
                              fill="var(--geist-foreground)"></path><path
                              d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z"
                              fill="var(--geist-foreground)"></path><path
                              d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z"
                              fill="var(--geist-foreground)"></path><path clip-rule="evenodd"
                                                                          d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z"
                                                                          fill="var(--geist-foreground)"
                                                                          fillRule="evenodd"></path><path
                              d="M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z"
                              fill="var(--geist-foreground)"></path><path
                              d="M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z"
                              fill="var(--geist-foreground)"></path><path
                              d="M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z"
                              fill="var(--geist-foreground)"></path></svg>
                        </span>
                            <img src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'} width={100}
                                 onClick={() => {
                                     window.open('https://ant.design/')
                                 }
                                 }/>
                        </Space>
                    </div>
                    <p className={'text-xl text-[#333] dark:text-white'}>
                        感谢以下用户长期以来对本站的支持与帮助
                    </p>
                    <Avatar.Group>
                    <Avatar src={'https://cdn.seaurl.com/users/avatar/wangjie.png'} size={64}/>
                        <Avatar src={'https://cdn.seaurl.com/users/avatar/talent.png'} size={64}/>
                        <Avatar src={'https://cdn.seaurl.com/users/avatar/acy123.png'} size={64}/>
                    </Avatar.Group>
                </div>
            </section>
            {/*<Divider/>*/}
            <section className={'absolute left-0 right-0 bottom-0 flex items-center justify-center py-[32px] bg-black text-white px-[32px]'}>
                <div className={'flex flex-row items-center justify-between max-w-[900px] w-full gap-[32px] best-w:flex-col'}>
                    <div>
                        <Space>
                            <span>©{year}</span>
                            <span>Seaurl</span>
                            {/*<span>南京海纳网罗科技有限公司</span>*/}
                            <span>皖ICP备14011269号-3</span>
                            <a href= "mailto:zhangwei900808@126.com">联系方式</a>
                        </Space>
                    </div>
                    <div>
                        <span>
                          PowerBy <span onClick={()=>{
                            window.open('https://www.aliyun.com')
                        }
                        }>阿里云</span>
                        </span>
                    </div>
                </div>
            </section>
        </div>
    </div>
}

export default LogoutPage
