export type BooksDataType = {
  books: {
    books: BookDataType[];
    isLoading: boolean;
  };
};

export type BooksTotalCount = {
  books: {
    total: number;
  };
};

export type BooksIsFull = {
  books: {
    isFull: boolean;
  };
};

export type BookDataType = {
  accessInfo: AccessInfoType;
  etag: string;
  id: string;
  kind: string;
  saleInfo: SaleInfoType;
  selfLink: string;
  volumeInfo: VolumeInfoType;
};

export type AccessInfoType = {
  accessViewStatus: string;
  country: string;
  embeddable: boolean;
  epub: { isAvailable: boolean };
  pdf: { isAvailable: boolean };
  publicDomain: boolean;
  quoteSharingAllowed: boolean;
  textToSpeechPermission: string;
  viewability: string;
  webReaderLink: string;
};

export type SaleInfoType = {
  country: string;
  isEbook: boolean;
  saleability: string;
};

export type VolumeInfoType = {
  allowAnonLogging: boolean;
  authors: string[];
  categories: string[];
  canonicalVolumeLink: string;
  contentVersion: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  industryIdentifiers: IndustryIdentifiersType[];
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  previewLink: string;
  printType: string;
  publishedDate: string;
  readingModes: { text: boolean; image: boolean };
  title: string;
};

export type IndustryIdentifiersType = {
  type: string;
  identifier: string;
};
