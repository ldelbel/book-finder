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

const { Search } = Input;
const { Footer } = Layout;
const { Meta } = Card;

const onSearch = (value) => console.log(value);

const num = 199;

export default function Home() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalCurrentBook, setModalCurrentBook] = useState({
    volumeInfo: { title: "" },
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
      `volumes?q=lord+rings&maxResults=20&startIndex=${
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
              <Card
                hoverable
                style={{ width: num, height: "25rem", overflow: "hidden" }}
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
                    onClick={() => showModal(item)}
                  >
                    {item.volumeInfo.imageLinks ? (
                      <img
                        alt={item.volumeInfo.title}
                        src={item.volumeInfo.imageLinks.thumbnail}
                        width={num}
                      />
                    ) : (
                      <Empty />
                    )}
                  </div>
                }
              >
                <Meta
                  title={item.volumeInfo.title}
                  description={item.volumeInfo.subtitle}
                />
              </Card>
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
      <Modal
        title={modalCurrentBook?.volumeInfo?.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <strong>Descrição: </strong>
          {modalCurrentBook?.volumeInfo?.description}
        </p>
        <span>
          {modalCurrentBook.volumeInfo.authors?.length === 1 ? (
            <span>
              <strong>Autor:</strong> {modalCurrentBook?.volumeInfo?.authors}
            </span>
          ) : (
            <span>
              <strong>Autores:</strong>{" "}
              {modalCurrentBook.volumeInfo.authors &&
                modalCurrentBook?.volumeInfo?.authors[0]}
              ,{" "}
              {modalCurrentBook.volumeInfo.authors &&
                modalCurrentBook?.volumeInfo?.authors[1]}
            </span>
          )}
        </span>
        <div style={{ marginTop: 20}}>
          {" "}
          <Button type="primary" href={modalCurrentBook.volumeInfo.infoLink}>Ver na Google Store</Button>
        </div>
      </Modal>
    </>
  );
}
