import { Paginated, client } from '../api';

interface BooksParams {
  page: number;
  itemsPerPage: number;
}

interface Books {
  id: 1;
  book_author: string[];
  book_title: string;
  book_publication_year: string;
  book_publication_country: string;
  book_publication_city: string;
  book_pages: number;
}

export interface BooksServerData {
  books: Books[];
  count: number;
}

const postBooks = async ({
  page = 1,
  itemsPerPage = 20
}: BooksParams): Promise<Paginated<BooksServerData>> => {
  const response = await client.post('/books', {
    page,
    itemsPerPage
  });
  return { items: response.data, moreItems: true };
};

export default {
  postBooks
};
