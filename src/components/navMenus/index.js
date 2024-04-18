'use client'
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

import classNames from "classnames/bind";
import {Badge} from "antd";
import {
  CaretRightOutlined,
  CompassOutlined,
  AppstoreOutlined,
  HomeOutlined,
  IdcardOutlined,
  DatabaseOutlined,
  RightOutlined,
  PicRightOutlined,
  HomeFilled
} from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-store";
import IconFont from "@/utils/iconFont";
import styles from "./index.module.scss";

let cx = classNames.bind(styles);

const NavMenus = props => {
  const router = useRouter();
  const [color, setColor] = useState(props.color || "#000");
  const [mode, setMode] = useState(props.mode || 'router');
  const [size, setSize] = useState(props.size || 'large')

  function onChoosed(menu) {
    let newMenus = null;
    if (props.onChoosed) {
      props.onChoosed(menu);
    }
    if (mode == 'router') {
      router.push(menu.url);
    }
    if (props.onChoosed) {
      props.onChoosed(menu)
    }
  }

  function renderMenuIcon(icon) {
    switch (icon) {
      case "AppstoreOutlined":
        return <AppstoreOutlined className={styles.iconUsercenter} style={{color: color}}/>;
      case "HomeFilled":
        return <HomeFilled className={styles.iconUsercenter} style={{color: color}}/>;
      case "UserOutlined":
        return <IdcardOutlined className={styles.iconUsercenter} style={{color: color}}/>;
      case "CompassOutlined":
        return <CompassOutlined className={styles.iconUsercenter} style={{color: color}}/>;
      case "DatabaseOutlined":
        return <DatabaseOutlined className={styles.iconUsercenter} style={{color: color}}/>;
      case "CaretRightOutlined":
        return <CaretRightOutlined className={styles.iconUsercenter} style={{color: color}}/>;
      case "RightOutlined":
        return <RightOutlined className={styles.iconUsercenter} style={{color: color}}/>;
      default:
        return <IconFont type={icon} className={styles.iconUsercenter} style={{color: color}}/>;
    }
  }

  function renderMenus() {
    return props.menus.map((menu, index) => {
      return (
        <div className={styles.menusItem} key={menu.key}>
          <div
            className={cx({
              menusLink: true,
              choosed: menu.choosed
            })}
            onClick={() => {
              onChoosed(menu);
            }}
          >
            {menu.icon ? renderMenuIcon(menu.icon) : null}
            {menu.badge ? <Badge color={color}/> : null}
            <span className={styles.title} style={{color: color, fontSize: size == 'large' ? '14px' : '12px'}}>
              {menu.label}
            </span>
          </div>
        </div>
      );
    });
  }

  return <div className={styles.menusContainer}>{renderMenus()}</div>;
};

export default NavMenus;
