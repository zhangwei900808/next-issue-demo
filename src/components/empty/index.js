'use client'
import React, {useState} from 'react';
import EmptyImg from './empty'
const Empty = (props) => {
  const [title, setTitle] = useState(props.title || '暂无数据')
  return <div className={'flex items-center justify-between w-full'}>
    {/*<EmptyData description={title}/>*/}
    <div className={'w-[300px] h-[100px] flex flex-col items-center justify-center  mx-auto'}>
      <EmptyImg/>
      <span>{title}</span>
    </div>
    {/*<img src={emptyImg} alt="Logo" />*/}
  </div>
}

export default Empty;
