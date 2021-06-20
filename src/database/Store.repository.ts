import { SearchStoresInput } from '../inputs/SearchStores.input';
import { GetStoresInput } from '../inputs';
import { Store, StoreModel } from './Store.model';

export class StoreRepository {
  async getStores(searchInput: SearchStoresInput): Promise<Store[]> {
    const { limit = 10, offset = 0 } = searchInput;

    const stores = await StoreModel.aggregate([
      { $skip: limit * offset },
      { $limit: limit },
    ]);

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
