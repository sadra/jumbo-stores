import { GetStoresInput } from '../inputs';
import { Store, StoreModel } from './Store.model';

export class StoreRepository {
  async getStores(
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
