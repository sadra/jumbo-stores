'use strict';
import { UserInputError } from 'apollo-server-express';
import { isGeographicalParam } from '../common/geographical';
import { GetStoresInput } from '../inputs';
import { IResolver } from '../interfaces';

export class SotresResolver implements IResolver {
  constructor() {
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

  private closestStores(_: any, getStoreInput: GetStoresInput) {
    this.checkIfGeoIsCorrect(getStoreInput);

    return [];
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
