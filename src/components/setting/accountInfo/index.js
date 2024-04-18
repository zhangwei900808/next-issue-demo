'use client'
import styles from './index.module.scss'
import {useState, useContext, useEffect} from "react";
import {AppstoreOutlined, MailOutlined, SettingOutlined, EditOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import Cropper from "react-cropper";

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
  message,
  Upload
} from 'antd'
import {updateAccountBaseInfo, uploadAvatar, getAccountBaseInfo} from '@/lib/slices/settingSlice';
import {useDispatch, useSelector} from 'react-redux'
import {createSelector} from "@reduxjs/toolkit";
import _ from "lodash";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const {Title, Paragraph, Text, Link} = Typography;

const Index = (props) => {
  const [form] = Form.useForm();
  const [cropper, setCropper] = useState();

  const dispatch = useDispatch();

  const {accountUserInfo} = useSelector(state => state.setting)

  // const {accountUserInfo,isMobile, me} = useSelector((state) => {
  //   const {me, isLogin, userInfo} = state.auth
  //   const {isMobile} = state.layout
  //   return {
  //     me, isLogin, userInfo,
  //     isMobile,
  //     ...state.setting,
  //     hydrate: state.system.currentHydrate
  //   }
  // }, (_old, _new) => _old.hydrate !== _new.hydrate);

  const [image, setImage] = useState('');
  const [showDlg, setShowDlg] = useState(false);
  const [avatar, setAvatar] = useState((accountUserInfo && accountUserInfo.avatar) || 'http://static.awbeci.com/img/avatar/20200131205259');
  const [avatarBtnLoading, setAvatarBtnLoading] = useState(false);

  function renderDlg() {
    return <Modal
      centered={false}
      title='修改头像'
      width='500px'
      open={showDlg}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      // mask={dialog.mask}
      okText="确定"
      cancelText="取消"
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={avatarBtnLoading} onClick={onOk}>
          提交
        </Button>
      ]}
    >
      <Cropper
        src={image}
        style={{height: 300, width: '100%'}}
        // Cropper.js options
        initialAspectRatio={1}
        // autoCrop={false}
        // 不可变动box
        cropBoxResizable={false}
        dragMode='none'
        guides={true}
        // crop={onCrop}
        // ref={cropperRef}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
    </Modal>
  }

  const onChange = async (info) => {
    console.log('info=>', info)
    if (info.file.status === "done") {
      let imgsrc = info.file.url;

      if (!imgsrc) {
        imgsrc = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(info.file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      console.log('imgsrc=', imgsrc)
      setImage(imgsrc);
      setShowDlg(true)
    }
  };

  //修改头像
  async function onOk() {
    setAvatarBtnLoading(true)
    if (typeof cropper !== "undefined") {
      // console.log('cropper.getCroppedCanvas().toDataURL()=', )
      const base64Img = cropper.getCroppedCanvas().toDataURL();
      const res = await dispatch(uploadAvatar({
        avatar: base64Img
      }))
      setAvatarBtnLoading(false)

      if (res.payload.status === 0) {
        console.log('onOk res =>', res)
        setShowDlg(false);
        setAvatar(res.payload.data);
        message.success("修改成功");
      }
    }
  }

  function onCancel() {
    setShowDlg(false)
  }

  useEffect(() => {
    // 初始化数据
    console.log('accountUserInfo=>', accountUserInfo)
    if (accountUserInfo) {
      form.setFieldsValue({
        user: {
          nickName: accountUserInfo.nickName,
          school: accountUserInfo.school,
          company: accountUserInfo.company,
          website: accountUserInfo.website,
          location: accountUserInfo.location,
          signature: accountUserInfo.signature,
          introduction: accountUserInfo.introduction
        }
      })
    }

  }, [accountUserInfo])

  const urlReg = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i',
  );

  function hasHttpOrHttpsPrefix(url) {
    return url.startsWith("http://") || url.startsWith("https://");
  }

  // 提交表单
  const onFinish = async (formData) => {
    console.log('formData=>form', form)
    const {user} = formData;

    if (user.website && !hasHttpOrHttpsPrefix(user.website)){
      message.info('个人网站url开头必须包含http://或者https://，请重新输入');
      return
    }

    if(user.website && !user.website.match(urlReg)){
      message.info('网址不正确，请重新输入');
      return
    }

    const updateres = await dispatch(updateAccountBaseInfo({
      // userName: me.name,
      nickName: user.nickName || '',
      school: user.school || '',
      company: user.company || '',
      website: user.website || '',
      location: user.location || '',
      signature: user.signature || '',
      introduction: user.introduction || '',
    }));
    console.log('updateres=>', updateres)
    if (updateres.payload.status === 0) {
      message.success('更新成功');
      await dispatch(getAccountBaseInfo());
    } else {
      message.info('更新失败');
    }
  }
  return <Row gutter={{xs: 16, sm: 16, md: 16, lg: 12, xl: 12, xxl: 12}}  className={cx({
    // myrow:isMobile
    myrow: false
  })}>
    <Col xs={24} sm={24} md={24} lg={15} xl={15} xxl={15}>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{remember: true}}>
        <Form.Item name={['user', 'nickName']} label={<Text strong>昵称</Text>} rules={[{}]}>
          <Input maxLength={20}/>
        </Form.Item>

        <Form.Item name={['user', 'school']} label={<Text strong>学校</Text>}>
          <Input maxLength={100}/>
        </Form.Item>
        <Form.Item name={['user', 'company']} label={<Text strong>公司</Text>}>
          <Input maxLength={100}/>
        </Form.Item>
        <Form.Item name={['user', 'website']} label={<Text strong>个人网站</Text>}>
          <Input/>
        </Form.Item>
        {/*<Form.Item name={['user', 'location']} label={<Text strong>地址位置</Text>}>*/}
        {/*  <Input maxLength={100}/>*/}
        {/*</Form.Item>*/}
        <Form.Item name={['user', 'signature']} label={<Text strong>个性签名</Text>}>
          <Input maxLength={100}/>
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label={<Text strong>个人简介</Text>}>
          <Input.TextArea maxLength={500} autoSize={{ minRows: 4, maxRows: 6 }}/>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            更新
          </Button>
        </Form.Item>
      </Form>
    </Col>
    <Col xs={24} sm={24} md={24} lg={9} xl={9} xxl={9}>
      <div className={styles.avatar}>
        <Text strong className={styles.avatartitle}>个人头像</Text>
        <Avatar
          size={{xs: 200, sm: 200, md: 200, lg: 200, xl: 200, xxl: 200}}
          className={styles.icon}
          src={`${avatar}?x-oss-process=style/300X300`}
        />

        <Upload showUploadList={false} onChange={onChange}>
          <Button type="default" className={styles.btn}>
            <EditOutlined/>编辑
          </Button>
        </Upload>
      </div>
    </Col>
    {renderDlg()}
  </Row>
}

export default Index;
