import { Card, Empty, Rate } from "antd";

const { Meta } = Card;

export function BookCard({ book, showModal }) {
  return (
    <Card
      hoverable
      style={{ width: 250, height: "25rem", overflow: "hidden" }}
      bodyStyle={{ height: 110, padding: "1rem 0 0 0" }}
      onClick={() => showModal(book)}
      cover={
        <div
          style={{
            height: "15rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            background: "#f0f0f0",
          }}
        >
          {book.imageLinks ? (
            <img
              alt={book.title}
              src={book.imageLinks.thumbnail}
              height={240}
            />
          ) : (
            <Empty />
          )}
        </div>
      }
    >
      {/* <Meta title={book.title} description={book.subtitle} /> */}
      <div
        style={{
          height: 104,
          padding: "0 0.5rem 0 0.5rem",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            wordBreak: "break-all",
          }}
        >
          {book.title}
        </p>
        <p style={{ fontSize: "0.7rem", wordBreak: "break-all" }}>
          {book.subtitle}
        </p>
      </div>
      <div
        style={{
          height: 40,
          display: "flex",
          fontSize: "1.3rem",
          borderTop: '1px solid #f0f0f0'
        }}
      >
        <span
          style={{
            width: "70%",
            color: "#999999",
            display: "flex",
            alignItems: "center",
            paddingLeft: "1rem",

          }}
        >
          {book.publishedDate?.slice(0, 4)}
        </span>
        <div
          style={{
            textAlign: "center",
            width: "30%",

          }}
        >
          {book.averageRating ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                color: "#666"
              }}
            >
              <Rate
                disabled
                count={1}
                value={1}
                style={{ marginTop: "-5px" }}
              />
              {book.averageRating}/5
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                height: "100%",
                color: "#ddd",
              }}
            >
              <Rate
                disabled
                count={1}
                value={0}
                style={{ marginTop: "-5px" }}
              />
              0/5
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
