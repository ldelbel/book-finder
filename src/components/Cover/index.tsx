import styles from './styles.module.scss';

export function Cover() {
  return (
    <>
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
    </>
  );
}
