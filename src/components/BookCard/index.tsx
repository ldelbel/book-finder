import { Card, Empty, Rate } from "antd";
import styles from "./styles.module.scss";
import { BookMark } from "./Bookmark";
import { IBookInfo, IBookmark, IWholeBook } from "../../utils/types";

interface BookCardProps {
  book: IWholeBook | IBookmark;
  showModal: (book: IBookInfo) => void;
  action: (book: IWholeBook | IBookmark) => void;
  bookmarked?: boolean;
}

export function BookCard({
  book,
  showModal,
  action,
  bookmarked = false,
}: BookCardProps) {
  const wholeBook = book as IWholeBook;
  const bookInfo = wholeBook.volumeInfo;

  return (
    <div style={{ position: "relative" }}>
      {bookmarked ? (
        <BookMark item={book as IBookmark} onClick={action} marked />
      ) : (
        <BookMark item={book as IBookmark} onClick={action} />
      )}
      <Card
        hoverable
        style={{ borderColor: "#d1d1d1" }}
        className={styles.container}
        bodyStyle={{ height: 110, padding: "1rem 0 0 0" }}
        onClick={() => showModal(bookInfo)}
        cover={
          <div className={styles.cover}>
            {bookInfo.imageLinks ? (
              <img
                alt={bookInfo.title}
                src={bookInfo.imageLinks.thumbnail}
                height={240}
              />
            ) : (
              <Empty description={<span>Sem Imagem</span>} />
            )}
          </div>
        }
      >
        <div className={styles.content}>
          <p className={styles.content_title}>{bookInfo.title}</p>
          <p className={styles.content_subtitle}>{bookInfo.subtitle}</p>
        </div>
        <div className={styles.content_published}>
          <span>{bookInfo.publishedDate?.slice(0, 4)}</span>
          <div className={styles.content_rating}>
            {bookInfo.averageRating ? (
              <div className={styles.content_rating_valid}>
                <Rate
                  disabled
                  count={1}
                  value={1}
                  style={{ marginTop: "-5px" }}
                />
                {bookInfo.averageRating}/5
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
    </div>
  );
}
