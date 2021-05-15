import styles from "../styles/Home.module.css";
import {
  Input,
  Space,
  Empty,
  Pagination,
  Layout,
  Card,
  Modal,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { BookModal } from "../components/BookModal";
import { BookCard } from "../components/BookCard";

const { Search } = Input;
const { Footer } = Layout;

const onSearch = (value) => console.log(value);

export default function Home() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalCurrentBook, setModalCurrentBook] = useState({
    title: "",
  });

  console.log(data);

  const showModal = (item) => {
    setModalCurrentBook(item);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchBooks = async (page = 0) => {
    const { data } = await api.get(
      `volumes?q=harry+potter&maxResults=20&startIndex=${
        page * 20
      }&key=AIzaSyDAqfUsi25efc9iYx7ZppjrP756SKRafWQ`
    );
    const { items, totalItems } = data;

    setData(items);

    if (page === 0) setTotalBooks(totalItems);
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  return (
    <>
      <div className={styles.coverBackground}></div>
      <div className={styles.covering}>
        <img
          className={styles.img1}
          src="/images/img1.svg"
          alt="girl and book"
        />
        <img className={styles.img2} src="/images/img2.svg" alt="bookshelf" />
        <span className={styles.logo}>
          Book<span>Finder</span>
        </span>
      </div>

      <Space className={styles.searchBar} direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
      <Space className={styles.content} direction="vertical">
        <Space
          className={styles.bookList}
          direction="horizontal"
          align="center"
          wrap
          size={12}
        >
          {data ? (
            data.map((item) => (
              <BookCard book={item.volumeInfo} showModal={showModal} />
            ))
          ) : (
            <Empty description={<span>No Image</span>} />
          )}
        </Space>
        <Pagination
          defaultCurrent={1}
          total={totalBooks}
          pageSize={20}
          showSizeChanger={false}
          style={{ marginTop: "1rem" }}
          onChange={(page, _) => setPage(page)}
        />
      </Space>
      <Footer className={styles.footer} />

      {/* MODAL INFO */}
      <BookModal
        book={modalCurrentBook}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
}
