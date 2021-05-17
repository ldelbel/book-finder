import { Button, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export function DrawerCard({ bookmark, showModal, removeBookmark }) {
  const bookInfo = bookmark.volumeInfo;

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #f0f0f0",
        height: "8rem",
        display: "flex",
        marginBottom: "1rem",
        overflow: "hidden",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.5)",
        borderRadius: '3px'
      }}
    >
      <div
        style={{
          width: "45%",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div style={{ height: "70%" }}>
          <img src={bookInfo.imageLinks.thumbnail} alt="book" width="100%" />
        </div>
        <div style={{ height: "30%" }}>
          <Button
            type="primary"
            style={{ width: "100%", height: "100%" }}
            onClick={() => showModal(bookInfo)}
          >
            Ver
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Remover dos favoritos">
            <Button
              type="primary"
              danger
              style={{ padding: "1px 4px", height: "auto" }}
              onClick={() => removeBookmark(bookmark)}
            >
              <CloseOutlined />
            </Button>
          </Tooltip>
        </div>
        <div
          style={{ height: "100%", padding: "0.5rem", wordBreak: "break-all" }}
        >
          {bookInfo.title}
        </div>
      </div>
    </div>
  );
}
