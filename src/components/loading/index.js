'use client'
import {
  LoadingOutlined
} from "@ant-design/icons";

const Loading = (props) => {
  return <div className={'p-6'}>
    <LoadingOutlined style={{fontSize: 36}} spin/>
  </div>
}

export default Loading;