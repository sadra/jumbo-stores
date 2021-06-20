'use strict';
import { UserInputError } from 'apollo-server-express';
import { isGeographicalParam } from '../common/geographical';
import { GetStoresInput } from '../inputs';
import { IResolver } from '../interfaces';

const stores = [
  {
    city: 'Bladel',
    postalCode: '5531 CP',
    street: 'Gindrapassage',
    street2: '18',
    street3: '',
    addressName: 'Jumbo Bladel Gindrapassage',
    uuid: 'a.QKYx4XsDgAAAFVPsV.Ky1c',
    longitude: '5.218227',
    latitude: '51.366486',
    complexNumber: '32012',
    showWarningMessage: true,
    todayOpen: '08:00',
    locationType: 'Supermarkt',
    sapStoreID: '4728',
    todayClose: '20:00',
  },
  {
    city: 'Bleiswijk',
    postalCode: '2665 BG',
    street: 'Dorpsstraat',
    street2: '39',
    street3: '',
    addressName: 'Jumbo Bleiswijk Dorpsstraat',
    uuid: 'JAoKYx4XUvkAAAFZaYxOXLRK',
    longitude: '4.530442',
    latitude: '52.010304',
    complexNumber: '33006',
    showWarningMessage: true,
    todayOpen: '08:00',
    locationType: 'Supermarkt',
    sapStoreID: '3176',
    todayClose: '20:00',
  },
  {
    city: 'Blerick',
    postalCode: '5921 GD',
    street: 'Wieënpassage',
    street2: '40',
    street3: '',
    addressName: 'Jumbo Blerick Jumbo de Wieën',
    uuid: '3_kKYx4XSH8AAAFLIVQai5Wx',
    longitude: '6.149932',
    latitude: '51.368237',
    complexNumber: '33204',
    showWarningMessage: true,
    todayOpen: '08:00',
    locationType: 'SupermarktPuP',
    collectionPoint: true,
    sapStoreID: '3437',
    todayClose: '20:00',
  },
  {
    city: 'Bodegraven',
    postalCode: '2411 LG',
    street: 'Vromade',
    street2: '27',
    street3: '',
    addressName: 'Jumbo Bodegraven Langerak Broekvelden',
    uuid: 'yBgKYx4XNk0AAAFJqAcYZ4CR',
    longitude: '4.751117',
    latitude: '52.076824',
    complexNumber: '33045',
    showWarningMessage: true,
    todayOpen: '08:00',
    locationType: 'Supermarkt',
    sapStoreID: '3554',
    todayClose: '21:00',
  },
];

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
    return stores;
  }

  private closestStores(_: any, getStoreInput: GetStoresInput) {
    this.checkIfGeoIsCorrect(getStoreInput);

    return stores;
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
