'use client'
import {
  Spin,
  Row,
  Col,
  Space,
  Popconfirm,
  Modal,
  Drawer,
  Select,
  message,
  Typography,
  Empty,
  Menu,
  Dropdown,
  Button,
  Popover,
  List, Divider
} from "antd";
import {
  LoadingOutlined,
  CaretDownOutlined,
  CloseCircleOutlined,
  AlertOutlined,
  EditOutlined,
  CloseOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  ExclamationCircleOutlined,
  CopyOutlined,
  AimOutlined
} from "@ant-design/icons";

const Loading = (props) => {
  return <div>
    <LoadingOutlined style={{fontSize: 36}} spin/>
  </div>
}

export default Loading;