export const USERNAME_REGEX = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,12}[a-zA-Z0-9]$/i;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])[a-z0-9]{5,15}$/i;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes/';

export const BOOKS_COUNT = 5;

export const GENRES = ['Art', 'Biography', 'Business', 'Chick Lit', 'Children\'s',
  'Christian', 'Classics', 'Comics', 'Contemporary', 'Cookbooks', 'Crime', 'Ebooks',
  'Fantasy', 'Fiction', 'Graphic Novels', 'Historical Fiction', 'History', 'Horror',
  'Humor and Comedy', 'Manga', 'Memoir', 'Music', 'Mystery', 'Nonfiction', 'Paranormal',
  'Philosophy', 'Poetry', 'Psychology', 'Religion', 'Romance', 'Science', 'Science Fiction',
  'Self Help', 'Spirituality', 'Sports', 'Suspense', 'Thriller', 'Travel', 'Young Adult'
];
