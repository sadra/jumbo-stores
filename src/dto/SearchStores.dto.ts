import { Store } from '../database/Store.model';

export interface SearchStoresDto {
  stores: Store[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
