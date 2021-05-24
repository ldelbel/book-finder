import { Button, Badge } from "antd";
import { FaBookmark } from "react-icons/fa";
import { purple } from "@ant-design/colors";
import styles from "./styles.module.scss";

const btnStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: purple[5],
  border: "none",
  boxShadow: "2px 2px 1px rgba(0,0,0,0.6)",
};

export function BookmarkButton({ showDrawer, count }) {
  return (
    <div className={styles.container}>
      <Badge count={count} size="default">
        <Button
          type="primary"
          onClick={showDrawer}
          shape="circle"
          style={btnStyle}
          size="large"
        >
          <FaBookmark />
        </Button>
      </Badge>
    </div>
  );
}
