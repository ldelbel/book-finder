import { Drawer } from "antd";

export function BookmarkDrawer({ onClose, visible}) {
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
