'use client'
import IconFont from "@/utils/iconFont";
import {useRouter} from "next/navigation";
import {Modal, Drawer, Button, Input, AutoComplete} from 'antd'
import React, {useEffect, useState, useRef} from "react";
// import SearchContainer from '@/components/search/searchContainer'
import {ArrowLeftOutlined, ArrowRightOutlined, SearchOutlined, CloseOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {useSession} from "next-auth/react";
const SearchInHeader = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [input, setInput] = useState('')
    // const { showSearchPanel, searchContent, showSearchApp} = useSelector((state) => state.system);

    const [options, setOptions] = useState([])
    const {data: session} = useSession()

    const onClose2 = () => {
        // dispatch(setSearchPanel(false))
    };

    // 回车搜索
    // function onSearch() {
    //     console.log('input =', input)
    //     if (input){
    //         dispatch(setSearchContent(input))
    //         dispatch(resetSearch())
    //         dispatch(webSearch({
    //             q: input,
    //             pageNum: 1,
    //             pageSize: 20
    //         }))
    //     }else{
    //         // dispatch(resetSearch())
    //     }
    // }

    // useEffect(()=>{
    //     // 清空搜索内容
    //     if (!searchContent){
    //         setInput('')
    //     }
    // }, [searchContent])


    // async function onSelect(value, option){
    //     console.log('value option=', option)
    //     // window.open(option.url);
    //     await dispatch(setSearchContent(option.value))
    //     dispatch(resetSearch())
    //     dispatch(webSearch({
    //         q: option.value,
    //         pageNum: 1,
    //         pageSize: 20
    //     }))
    // }
    return <div className={'item'}>
        {
            !session?<div className={'text-2xl'} onClick={() => {
                // dispatch(setSearchPanel(true))
                // dispatch(resetSearch())
                // setOptions([])
                // setInput('')
            }}>
                <IconFont type="icon-sousuo1" />
                <span>搜索</span>
            </div>:<IconFont type="icon-sousuo1" className={'flex items-center justify-center text-lg'} onClick={() => {
                // dispatch(setSearchPanel(true))
                // dispatch(resetSearch())
                // setOptions([])
                // setInput('')
            }}/>
        }
        {/*<Modal title={<div>*/}
        {/*    <AutoComplete allowClear className={styles.input} options={options} onSelect={onSelect} value={input} onChange={async (e) => {*/}
        {/*        setInput(e)*/}
        {/*    }} onBlur={()=>{*/}
        {/*        setOptions([])*/}
        {/*    }}>*/}
        {/*        <Input placeholder={'请输入搜索内容'} prefix={<SearchOutlined/>} size={'large'} onPressEnter={onSearch}/>*/}
        {/*    </AutoComplete>*/}
        {/*</div>}*/}
        {/*       width={560}*/}
        {/*       centered*/}
        {/*       mask={false}*/}
        {/*       closable={false}*/}
        {/*       footer={null}*/}
        {/*       maskClosable*/}
        {/*        open={showSearchPanel}*/}
        {/*       onCancel={onClose2}*/}
        {/*       style={{    boxShadow: '0 12px 48px 0 rgba(0,0,0,.5)',borderRadius: '8px'}}>*/}
        {/*    <SearchContainer/>*/}
        {/*</Modal>*/}
    </div>
}

export default SearchInHeader;
