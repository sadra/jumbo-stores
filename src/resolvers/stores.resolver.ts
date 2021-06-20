import { StoreRepository } from './../database/Store.repository';
import { UserInputError } from 'apollo-server-express';
import { isGeographicalParam } from '../common/geographical';
import { GetStoresInput } from '../inputs';
import { Store } from '../database/Store.model';

export class SotresResolver {
  constructor(private storeRepository: StoreRepository) {
    this.stores = this.stores.bind(this);
    this.closestStores = this.closestStores.bind(this);
  }

  resolvers(): object {
    return {
      stores: this.stores,
      closestStores: this.closestStores,
    };
  }

  private stores() {
    return [];
  }

  private async closestStores(
    _: void,
    getStoreInput: GetStoresInput,
  ): Promise<Store[]> {
    this.checkIfGeoIsCorrect(getStoreInput);

    const result = await this.storeRepository.getStores(getStoreInput);

    return result;
  }

  private checkIfGeoIsCorrect(getStoreInput: GetStoresInput) {
    if (
      !isGeographicalParam(getStoreInput.latitude) ||
      !isGeographicalParam(getStoreInput.longitude)
    ) {
      throw new UserInputError(
        'Latitude or Longtitude format is wrong. e.g. 22.12345678',
        {
          getStoreInput,
        },
      );
    }
  }
}
