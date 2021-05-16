import { IBookmark } from "../utils/types";

export function addBookmark(book: IBookmark) {
  const bookmarks = JSON.parse(
    localStorage.getItem("@book-finder:bookmarks") || "[]"
  );
  if (bookmarks === null) {
    localStorage.setItem("@book-finder:bookmarks", JSON.stringify([book]));
  } else {
    bookmarks.push(book);
    localStorage.setItem("@book-finder:bookmarks", JSON.stringify(bookmarks));
  }
  return bookmarks;
}

export function removeBookmark(book: IBookmark) {
  const bookmarks = JSON.parse(localStorage.getItem("@book-finder:bookmarks"));
  if (bookmarks !== null) {
    const newBookmarks = bookmarks.filter(
      (oldbook: IBookmark) => oldbook.id !== book.id
    );
    localStorage.setItem(
      "@book-finder:bookmarks",
      JSON.stringify(newBookmarks)
    );

    return newBookmarks;
  }
}

export function getBookmarks() {
  return JSON.parse(localStorage.getItem("@book-finder:bookmarks") || "[]");
}
