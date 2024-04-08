'use client'
import React, {useState} from 'react';
import EmptyImg from './empty'
const Empty = (props) => {
  const [title, setTitle] = useState(props.title || '暂无数据')
  return <div>
    <div>
      {/*<EmptyData description={title}/>*/}
      <div>
        <EmptyImg/>
        <span >{title}</span>
      </div>
      {/*<img src={emptyImg} alt="Logo" />*/}
    </div>
  </div>
}

export default Empty;
