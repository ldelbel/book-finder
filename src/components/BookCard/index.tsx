import { Card, Empty } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export function BookCard({ book, showModal }) {
  return (
    <Card
      hoverable
      style={{ width: 199, height: "25rem", overflow: "hidden" }}
      bodyStyle={{ paddingTop: 10}}
      cover={
        <div
          style={{
            height: "20rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            background: "#f0f0f0",
          }}
          onClick={() => showModal(book)}
        >
          {book.imageLinks ? (
            <img alt={book.title} src={book.imageLinks.thumbnail} width={199} />
          ) : (
            <Empty />
          )}
        </div>
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      {/* <Meta title={book.title} description={book.subtitle} /> */}
      <div>
        <p style={{ fontWeight: "bold", fontSize: "0.6rem"}}>{book.title}</p>
      </div>
    </Card>
  );
}
