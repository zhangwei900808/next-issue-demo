'use client'

import React, {useEffect, useState} from "react";
import {useRouter, usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {useSession} from "next-auth/react";

const Logo = props => {
  const pathname = usePathname()
  const router = useRouter()
  const {query} = router;
  const dispatch = useDispatch();
  const {data: session} = useSession()

  const [where, setWhere] = useState('')

  useEffect(() => {
    console.log('---------------------router', router)
    console.log('---------------------query', query)
    if (session) {
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
  }, [query])

  return (
    <div>
      <div>
        <img src="https://cdn.awbeci.com/seaurl/logo/seaurl_logo.png" alt="" onClick={props.clickLogo} className={'w-[32px] h-[32px] rounded-full'}/>
        {
          session ? <span>
                    <span>{where}</span>
            {/*<SearchInHeader/>*/}
                </span> : null
        }

      </div>
    </div>
  );
};

export default Logo;
