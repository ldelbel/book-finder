import styles from "../styles/Home.module.css";
import { Input, Space, Empty, Pagination, Layout } from "antd";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { BookModal } from "../components/BookModal";
import { BookCard } from "../components/BookCard";
import { Cover } from "../components/Cover";

const { Search } = Input;
const { Footer } = Layout;

export default function Home() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalCurrentBook, setModalCurrentBook] = useState({
    title: "",
  });

  const onSearch = () => {
    fetchBooks(page);
    setPage(0);
  };

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
    const searchTerms = searchTerm.split(" ").join("+");
    if (searchTerms) {
      const { data } = await api.get(
        `volumes?q=${searchTerms}&maxResults=20&startIndex=${page * 20}&key=${
          process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
        }`
      );

      const { items, totalItems } = data;
      setData(items);
      console.log(totalItems);
      if (page === 0) setTotalBooks(0.7 * totalItems);
      console.log(totalBooks);
      console.log("------");
    } else {
      setData(null)
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks(page);
      setPage(0);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  return (
    <>
      <Cover styles={styles} />
      <div className={styles.pageHeader}>
        <span>Encontre informações de seus livros preferidos!</span>
      </div>
      <Space className={styles.searchBar} direction="vertical">
        <Search
          placeholder="Faça sua busca"
          onSearch={onSearch}
          enterButton
          allowClear
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Space>
      <Space className={styles.content} direction="vertical">
        <Space
          className={styles.bookList}
          direction="horizontal"
          align="center"
          style={{ justifyContent: "center" }}
          wrap
          size={12}
        >
          {data ? (
            data.map((item) => (
              <BookCard book={item.volumeInfo} showModal={showModal} />
            ))
          ) : (
            <Empty description={<span>Ops! Não tem livro aqui não.</span>} />
          )}
        </Space>
        <Pagination
          defaultCurrent={0}
          total={totalBooks}
          pageSize={20}
          showSizeChanger={false}
          current={page + 1}
          style={{ marginTop: "1rem" }}
          onChange={(page, _) => setPage(page - 1)}
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
