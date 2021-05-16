import styles from "../styles/Home.module.scss";
import { Input, Space, Empty, Pagination, Layout, Spin } from "antd";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  addBookmark,
  removeBookmark,
  getBookmarks,
} from "../services/bookmark";
import { BookModal } from "../components/BookModal";
import { BookCard } from "../components/BookCard";
import { Cover } from "../components/Cover";
import { BookmarkDrawer } from "../components/BookmarkDrawer";
import { BookmarkButton } from "../components/BookmarkButton";
import { IBookInfo, IBookmark, IWholeBook } from "../utils/types";

const { Search } = Input;
const { Footer } = Layout;

export default function Home() {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [modalCurrentBook, setModalCurrentBook] = useState({} as IBookInfo);

  const handleAddBookmark = (book: IBookmark) => {
    const newBookmarks = addBookmark(book);
    setBookmarks(newBookmarks);
  };

  const handleRemoveBookmark = (book: IBookmark) => {
    const newBookmarks = removeBookmark(book);
    setBookmarks(newBookmarks);
  };

  const onSearch = () => {
    fetchBooks(page);
    setPage(0);
  };

  const showModal = (item: IBookInfo) => {
    setModalCurrentBook(item);
    setIsModalVisible(true);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchBooks = async (page = 0) => {
    setIsLoading(true);
    const searchTerms = searchTerm.split(" ").join("+");
    if (searchTerms) {
      const { data } = await api.get(
        `volumes?q=${searchTerms}&maxResults=20&startIndex=${page * 20}&key=${
          process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
        }`
      );

      const { items, totalItems } = data;
      setData(items);
      if (page === 0) setTotalBooks(0.75 * totalItems);
    } else {
      setData(null);
      setTotalBooks(0);
    }
    setIsLoading(false);
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

  useEffect(() => {
    const books = getBookmarks();
    setBookmarks(books);
  }, []);

  return (
    <>
      <Cover />
      <BookmarkButton showDrawer={showDrawer} count={bookmarks.length} />
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
      <div className={styles.paginationInfo}>
        Mostrando resultados {page * 20 + data ? 1 : 0}-
        {page * 20 + (data && data.length)} de {Math.floor(totalBooks)}
      </div>
      <Space className={styles.content} direction="vertical">
        <Spin spinning={isLoading}>
          <Space
            className={styles.bookList}
            direction="horizontal"
            align="center"
            style={{ justifyContent: "center" }}
            wrap
            size={12}
          >
            {data ? (
              data.map((item: IWholeBook) =>
                bookmarks.map((book) => book.id).includes(item.id) ? (
                  <BookCard
                    book={item}
                    showModal={showModal}
                    action={handleRemoveBookmark}
                    key={item.id}
                    bookmarked
                  />
                ) : (
                  <BookCard
                    book={item}
                    showModal={showModal}
                    action={handleAddBookmark}
                    key={item.id}
                  />
                )
              )
            ) : (
              <Empty
                description={
                  <span style={{ color: "#666" }}>
                    Ops! Não tem livro aqui não.
                  </span>
                }
              />
            )}
          </Space>
        </Spin>

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
      <Footer className={styles.footer}>
        <span>
          ©Copyright - Built and Designed by{" "}
          <a
            href="https://www.lucasdelbel.com/"
            target="_blank"
            style={{ color: "rgb(45, 190, 45)"}}
          >
            <span style={{ marginTop: '-5px'}}>Lucas Delbel</span>
          </a>
        </span>
      </Footer>

      {/* MODAL INFO */}
      <BookModal
        book={modalCurrentBook}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      {/* DRAWER INFO */}
      <BookmarkDrawer
        onClose={onDrawerClose}
        visible={isDrawerVisible}
        bookmarks={bookmarks}
        showModal={showModal}
        removeBookmark={handleRemoveBookmark}
      />
    </>
  );
}
