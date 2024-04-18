import {useRouter} from 'next/navigation'

import {
  Result,
  Row,
  Col,
  Menu,
  Tabs,
  Drawer,
  Input,
  InputNumber,
  Button,
  Avatar,
  Modal,
  Typography,
  Popconfirm,
  Checkbox
} from 'antd'
import {AppstoreOutlined, MailOutlined, MenuOutlined, SearchOutlined} from '@ant-design/icons';
import NavMenus from "@/components/navMenus";
import styles from "./index.module.scss";
import {useState, useContext, useEffect, memo} from "react";
import Help from '../../components/help'
import AccountInfo from "@/components/setting/accountInfo";
import AccountName from "@/components/setting/accountName";
import AccountSecurity from "@/components/setting/accountSecurity";
import AccountEmail from "@/components/setting/accountEmail";
import AccountNotice from "@/components/setting/accountNotice";
import {useSelector, useDispatch} from 'react-redux'
import {setTabs, getAccountBaseInfo} from '@/store/slices/settingSlice'
import {setHeader} from '@/store/slices/layoutSlice';
import {getSessionUser, getUserInfo} from '@/store/slices/authSlice'
import {setCurrentHydrate} from '@/store/slices/systemSlice'

import _ from "lodash";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);
const {Title, Paragraph, Text, Link} = Typography;

const {SubMenu} = Menu;
const {TabPane} = Tabs;

const Setting = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const {
    tabs,
    isLogin,
    isMobile
  } = useSelector((state) => {
    const {me, isLogin, userInfo} = state.auth
    const {isMobile} = state.layout
    return {
      isLogin,
      isMobile,
      ...state.setting,
      hydrate: state.system.currentHydrate
    }
  }, (_old, _new) => _old.hydrate !== _new.hydrate);

  const {tab} = router.query;
  console.log(tab);
  // const { resize, setResize } = useContext(LayoutContext);

  const [height, setHeight] = useState(0);
  const [showDlg, setShowDlg] = useState(false);
  const [tabContent, setTabContent] = useState()
  const [dialog, setDialog] = useState({
    show: false,
    title: '',
    width: 300,
    content: null,
    mask: true,
    onOk: () => {

    },
    onCancel: () => {

    }
  })


  function handleClick(e) {
    console.log('click ', e);
  };

  function renderDlg() {
    return <Modal
      centered={dialog.centered}
      title={dialog.title}
      width={dialog.width}
      open={showDlg}
      onOk={dialog.onOk}
      onCancel={dialog.onCancel}
      mask={dialog.mask}
      okText="确定"
      cancelText="取消">
      {dialog.content}
    </Modal>
  }

  // 用户基本信息设置
  function renderUserInfo() {
    return <div>
      <Title level={3} className={styles.titleLine}>基本信息</Title>
      <AccountInfo/>
    </div>
  }

  // 账户名设置
  function renderAccount() {
    return <div>
      <Title level={3} className={styles.titleLine}>修改用户名</Title>
      <AccountName/>
    </div>
  }

  // 账户密码设置
  function renderAccountSecurity() {
    return <div>
      <Title level={3} className={styles.titleLine}>修改密码</Title>
      <AccountSecurity/>
    </div>
  }

  // 账户邮箱设置
  function renderEmail() {
    return <div>
      <Title level={3} className={styles.titleLine}>邮箱</Title>
      <AccountEmail/>
    </div>
  }

  // 账户通知设置
  function renderNotice() {
    return <div>
      <Title level={3} className={styles.titleLine}>消息</Title>
      <AccountNotice/>
    </div>
  }

  function renderTabContent() {
    switch (tab) {
      case "profile":
        setTabContent(renderUserInfo())
        break;
      case "account":
        setTabContent(renderAccount())
        break;
      case "security":
        setTabContent(renderAccountSecurity())
        break;
      case "email":
        setTabContent(renderEmail())
        break;
      case "notice":
        setTabContent(renderNotice())
        break;
      default:
        setTabContent(null);
        break;
    }
    dispatch(setTabs({
      key: tab
    }))
  }

  useEffect(() => {
    console.log('tab=', tab);
    renderTabContent();
  }, [])
  useEffect(() => {
    renderTabContent()
    return () => {
      return false;
    }
  }, [tab]);
  useEffect(() => {
    if (!isLogin) {
      router.push('/')
      // Modal.error({
      //   title: '提示',
      //   content: '您的登录已过期！请重新登录',
      //   okText: '确定',
      //   onOk: function (close) {
      //     router.push('/login')
      //     close();
      //   }
      // });
    }
  }, [isLogin])

  function choosedTab(tab) {
    setOpen(false)
    console.log('choosedTab tab=>', tab)
    dispatch(setTabs({
      key: tab.key
    }))
  }

  function renderDom() {
    let dom = ['profile', 'account', 'security', 'email', 'notice'].includes(tab) ?
      <div className={styles.container}>
        <div className={styles.content}>
          {/* gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }} */}
          <Row>
            {
              !isMobile?<Col xs={9} sm={9} md={9} lg={6} xl={5} xxl={4}>
                {/*<div style={{ height: `${resize.height - 56}px`, borderRight: '1px solid #eee', padding: '12px 0' }}>*/}
                <div className={styles.leftBar}>
                  <NavMenus menus={tabs} onChoosed={choosedTab}/>
                </div>
              </Col>:<MenuOutlined className={styles.menu} onClick={()=>{
                setOpen(true)
              }}/>
            }
            <Col xs={24} sm={24} md={24} lg={18} xl={13} xxl={10}>
              <div className={styles.body}>
                {tabContent}
              </div>
            </Col>
          </Row>
        </div>

      </div> : <Result
        status="404"
        title="404"
        subTitle="对不起, 没有找到您想要访问的页面."
      />
    return <>
      {dom}
      <Drawer title="" width={320} placement="left" onClose={onClose} open={open} bodyStyle={{padding: '0'}}>
        <div className={styles.leftBar}>
          <NavMenus menus={tabs} onChoosed={choosedTab}/>
        </div>
      </Drawer>
    </>
  }

  return renderDom()
};

export default memo(Setting);
