import { Paginated, client } from '../api';

interface Filter {
  type: string;
  values: string[];
}

interface BooksParams {
  page: number;
  itemsPerPage: number;
  filters: Filter[];
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
  itemsPerPage = 20,
  filters
}: BooksParams): Promise<Paginated<BooksServerData>> => {
  const response = await client.post('/books', {
    page,
    itemsPerPage,
    filters
  });

  const offset = itemsPerPage * page;

  return { items: response.data, moreItems: offset >= response.data.count };
};

export default {
  postBooks
};
