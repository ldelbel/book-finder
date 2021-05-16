import { Button, Badge } from "antd";
import { FaBookmark } from "react-icons/fa";
import { purple } from "@ant-design/colors";

export function BookmarkButton({ showDrawer, count }) {
  return (
    <div style={{ position: 'fixed', right: "1rem", bottom: "1rem"}}>
      <Badge count={count} size="small">
        <Button
          type="primary"
          onClick={showDrawer}
          shape="circle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: purple[5],
            border: "none",
            boxShadow: "2px 2px 1px rgba(0,0,0,0.6)"
          }}
          size="large"
        >
          <FaBookmark />
        </Button>
      </Badge>
    </div>
  );
}
