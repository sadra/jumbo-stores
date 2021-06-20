import { SearchStoresInput } from '../inputs/SearchStores.input';
import { GetStoresInput } from '../inputs';
import { Store, StoreModel } from './Store.model';

export class StoreRepository {
  async getStores(searchInput: SearchStoresInput): Promise<Store[]> {
    const { limit = 10, offset = 0 } = searchInput;

    let query = [];

    if (searchInput.city) {
      query.push({
        $match: {
          city: searchInput.city,
        },
      });
    }

    query.push({ $skip: limit * offset }, { $limit: limit });

    const stores = await StoreModel.aggregate(query);

    return stores;
  }

  async getClosestStores(
    credentials: GetStoresInput,
    limit: number = 5,
  ): Promise<Store[]> {
    const stores = await StoreModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [credentials.latitude, credentials.longitude],
          },
        },
      },
    }).limit(limit);

    return stores;
  }
}
