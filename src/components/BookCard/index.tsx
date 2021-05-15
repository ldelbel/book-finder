import { Card, Empty } from "antd";

const { Meta } = Card;

export function BookCard({ book, showModal }) {
  return (
    <Card
      hoverable
      style={{ width: 199, height: "25rem", overflow: "hidden" }}
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
    >
      <Meta title={book.title} description={book.subtitle} />
    </Card>
  );
}
