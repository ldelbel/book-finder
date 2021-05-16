export interface IWholeBook {
  id: string;
  volumeInfo: IBookInfo;
}

export interface IBookInfo {
  authors: [string];
  title: string;
  imageLinks: {
    thumbnail: string;
  };
  description: string;
  infoLink: string;
  categories: [string];
  averageRating: number;
  publisher: string;
  subtitle: string;
  publishedDate: string;
  language: string;
  pageCount: number;
  ratingsCount: number;
}

export interface IBookmark {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  }
}
