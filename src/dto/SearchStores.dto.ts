import { Store } from '../database/Store.model';

export interface SearchStoresDto {
  list: Store[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
