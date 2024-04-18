'use client'
import {useState, useContext, useEffect} from "react";

import {
  Result,
  Row,
  Col,
  Menu,
  Tabs,
  Form,
  Input,
  InputNumber,
  Button,
  Avatar,
  Modal,
  Typography,
  Popconfirm,
  Checkbox,
  message
} from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import {updateAccountNotice} from '@/lib/slices/settingSlice';
import {createSelector} from "@reduxjs/toolkit";
import _ from "lodash";

const {Title, Paragraph, Text, Link} = Typography;

const AccountNotice = (props) => {
  const dispatch = useDispatch();

  const {accountUserInfo} = useSelector((state) => state.setting);

  const [noticeGroup, setNoticeGroup] = useState(accountUserInfo && accountUserInfo.notices.filter(item => item !== 'versionUpdateNotice'))
  const [versionUpdateNotice, setVersionUpdateNotice] = useState(accountUserInfo && accountUserInfo.notices.includes('versionUpdateNotice'))
  const onValuesChange = async (changedValues, allValues) => {
    console.log('changedValues => ', changedValues)
    console.log('allValues => ', allValues)
    let notices = [];
    console.log('allValues.versionUpdateNotice=?', allValues.versionUpdateNotice)
    if (allValues.versionUpdateNotice) {
      notices.push('versionUpdateNotice')
    }
    let newnotices = notices.concat(allValues.noticeGroup)
    console.log('onValuesChange notices=>', newnotices)
    const res = await dispatch(updateAccountNotice({
      notices: newnotices
    }))
    if (res.payload.status == 0) {
      message.success("修改成功");
    }
  }
  return <Row>
    <Col xs={24} sm={24} md={24} lg={15} xl={15} xxl={15}>
      <Form layout="vertical" onValuesChange={onValuesChange} initialValues={{
        'noticeGroup': noticeGroup,
        'versionUpdateNotice': versionUpdateNotice
      }}>
        <Form.Item name="noticeGroup" label={<Text strong>消息设置</Text>}>
          <Checkbox.Group>
            <Row>
              {/*<Col span={24}>*/}
              {/*  <Checkbox value="likeMyUrlNotice">有人点赞我的网址</Checkbox>*/}
              {/*</Col>*/}
              <Col span={24}>
                <Checkbox value="copyMyUrlNotice">有人复制我的网址</Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="followingMeNotice">有人关注我</Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="userSendMessageToMeNotice" disabled>有人给我发私信</Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="systemSendMessageToUserNotice" disabled>系统消息</Checkbox>
              </Col>
              {/*<Col span={24}>*/}
              {/*  <Checkbox value="followersAddedNotice">关注者添加网址时</Checkbox>*/}
              {/*</Col>*/}
            </Row>
          </Checkbox.Group>

        </Form.Item>
        {/*<Form.Item name="versionUpdateNotice" valuePropName="checked" label={<Text strong>官方邮件</Text>}>*/}
        {/*  <Checkbox>版本更新</Checkbox>*/}
        {/*</Form.Item>*/}
      </Form>
    </Col>
  </Row>
}

export default AccountNotice;
