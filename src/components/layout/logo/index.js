'use client'

import React, {useEffect, useState} from "react";
import {useRouter, usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {Button} from 'antd'
const Index = ({isLogin, clickLogo}) => {
  const pathname = usePathname()
  const router = useRouter()
  const {query} = router;
  const dispatch = useDispatch();

  const [where, setWhere] = useState('')

  useEffect(() => {
    // console.log('---------------------router', router)
    // console.log('---------------------query', query)
    console.log('---------------------pathname', pathname)

    if (isLogin) {
      if (pathname === '/') {
        setWhere('首页')
      }
      // if (pathname === '/[username]') {
      //   setWhere(router.query.username)
      // }
      // if (pathname === "/[username]/urlSpace") {
      //   setWhere(`${router.query.username} / 网址空间`)
      // }
      // if (pathname === "/[username]/aiSpace/chatAi") {
      //   setWhere(`${router.query.username} / ChatAI`)
      // }
      // if (pathname === "/[username]/aiSpace/imageAi") {
      //   setWhere(`${router.query.username} / ImageAI`)
      // }
      // if (pathname === "/[username]/noteSpace") {
      //   setWhere(`${router.query.username} / 笔记空间`)
      // }
      // if (pathname === "/[username]/fileSpace") {
      //   setWhere(`${router.query.username} / 文件空间`)
      // }
      // if (pathname === "/setting/[tab]") {
      //   setWhere(`设置`)
      // }
      // if (pathname === "/chatroom") {
      //   setWhere(`私信`)
      // }
      // if (pathname === "/recommendUrls") {
      //   setWhere(`网址推荐`)
      // }
      // if (pathname === "/software") {
      //   setWhere(`软件下载`)
      // }
      // if (pathname === "/square") {
      //   setWhere(`技术热榜`)
      // }
      // if (pathname === "/techNews") {
      //   setWhere(`新闻广场`)
      // }
      // if (pathname === "/blogs") {
      //   setWhere(`博客广场`)
      // }
      // if (pathname === "/hotline") {
      //   setWhere(`客服电话`)
      // }
      // if (pathname === "/about") {
      //   setWhere(`关于`)
      // }
      // if (pathname === "/rank") {
      //   setWhere(`积分排行`)
      // }
      // if (pathname === "/rank") {
      //   setWhere(`积分排行`)
      // }
      // if (pathname === "/privacy") {
      //   setWhere(`隐私政策`)
      // }
      // if (pathname === "/license") {
      //   setWhere(`服务条款`)
      // }
    }
  }, [pathname, isLogin])

  return <div className={'flex gap-2 items-center'}>
    <img src="https://cdn.awbeci.com/seaurl/logo/seaurl_logo.png" alt="" onClick={clickLogo} className={'w-[32px] h-[32px] rounded-full cursor-pointer'}/>
    {isLogin ? <span className={'text-white dark:bg-black dark:text-white text-sm cursor-pointer hover:bg-sky-700 px-2 py-1.5 rounded-md box-border'}>{where}</span> : null}
  </div>
};

export default Index;
