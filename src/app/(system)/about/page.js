'use client'
import {memo} from "react";
import {ClockCircleOutlined} from '@ant-design/icons';
import {Timeline, Divider, Typography} from 'antd';
import classNames from "classnames/bind";
import {useSelector} from "react-redux";

const {Title, Paragraph, Text, Link} = Typography;
const About = () => {
  return <div>
    <div className={'relative'}>
      <div className={'w-full h-[calc(100vh-56px)] bg-cover'}>
        <img className={'w-full h-full'} src={'https://cdn.seaurl.com/about/about13.jpg'}/>
      </div>
      <div className={'absolute top-0 left-0 right-0 h-[calc(100vh-56px)] flex items-center justify-center p-4 dark:bg-[#22272E] dark:text-white'}>
        <div className={'bg-[hsla(0,0%,100%,.71)] dark:bg-[#22272E] dark:border-[#444C56] dark:border dark:border-solid  overflow-y-auto p-6 rounded-2xl flex flex-col 2xl:w-[960px] xl:w-[960px] lg:w-[960px] md:w-full sm:w-full w-full'}>
          <Typography>
            <Title level={3}>关于Seaurl</Title>
            <Paragraph>
              <Text style={{fontSize: '18px'}}>
                在数字化的时代，我们每天都会遇到大量的信息，无论是工作中的网址、个人笔记还是重要的文件。对于许多人来说，有效地管理这些信息是一个挑战，这就是
                Seaurl 出现的原因。
              </Text>
            </Paragraph>
            <Title level={3}>使命</Title>
            <Paragraph>
              <Text style={{fontSize: '18px'}}>
                深挖每个网址背后的价值。
              </Text>
            </Paragraph>
            <Title level={3}>愿景</Title>
            <Text style={{fontSize: '18px'}}>致力于构建全球领先的AI网址管理和分析平台。</Text>
            <Title level={3}>价值观</Title>
            <Text style={{fontSize: '18px'}}>那些疯狂的以为自己能改变世界的人才是真正能改变世界的人。</Text>
            <Title level={3}>联系方式</Title>
            <Paragraph>
              <Text style={{fontSize: '18px'}}>邮箱：zhangwei900808@126.com</Text>
            </Paragraph>
            <Paragraph>
              <Text style={{fontSize: '18px'}}>QQ群：701558381</Text>
            </Paragraph>
          </Typography>
        </div>
      </div>
    </div>
  </div>
};
export default memo(About);
