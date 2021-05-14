import styles from "../styles/Home.module.css";
import { Input, Space } from "antd";


const { Search } = Input;

const onSearch = value => console.log(value);

export default function Home() {
  return (
    <>
      <div className={styles.coverBackground}></div>
      <div className={styles.covering}>
        <img className={styles.img1} src="/images/img1.svg" alt="girl and book" />
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
    </>
  );
}
