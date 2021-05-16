import { Card, Empty, Rate } from "antd";
import styles from "./Styles.module.scss";

export function BookCard({ book, showModal }) {
  return (
    <Card
      hoverable
      className={styles.container}
      bodyStyle={{ height: 110, padding: "1rem 0 0 0" }}
      onClick={() => showModal(book)}
      cover={
        <div className={styles.cover}>
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
      <div className={styles.content}>
        <p className={styles.content_title}>{book.title}</p>
        <p className={styles.content_subtitle}>{book.subtitle}</p>
      </div>
      <div className={styles.content_published}>
        <span>{book.publishedDate?.slice(0, 4)}</span>
        <div className={styles.content_rating}>
          {book.averageRating ? (
            <div className={styles.content_rating_valid}>
              <Rate
                disabled
                count={1}
                value={1}
                style={{ marginTop: "-5px" }}
              />
              {book.averageRating}/5
            </div>
          ) : (
            <div className={styles.content_rating_invalid}>
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
