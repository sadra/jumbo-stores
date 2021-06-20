import { SearchStoresInput } from '../inputs/SearchStores.input';
import { GetClosestStoresInput } from '../inputs';
import { Store, StoreModel } from './Store.model';
import { SearchStoresDto } from '../dto/SearchStores.dto';

export class StoreRepository {
  async getStores(searchInput: SearchStoresInput): Promise<SearchStoresDto> {
    const { limit = 10, page = 1 } = searchInput;

    const query = this.getQuery(searchInput);
    const storesPipeline = this.getStorePipline(limit, page, query);
    const countPipeline = this.getCountPipline(query);

    const results = await StoreModel.aggregate([
      {
        $facet: {
          stores: storesPipeline,
          total: countPipeline,
        },
      },
    ]).exec();

    const { stores } = results[0];
    const total = results[0].total[0].count;
    const pages = Math.ceil(total / limit);

    return {
      stores,
      total,
      pages,
      page,
      limit,
    };
  }

  async getClosestStores(
    credentials: GetClosestStoresInput,
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

  private getStorePipline(limit: number, page: number, query?: object) {
    const storePipeLine: object[] = [
      { $skip: limit * (page - 1) },
      { $limit: limit },
    ];

    if (query) {
      storePipeLine.unshift({
        $match: query,
      });
    }

    return storePipeLine;
  }

  private getCountPipline(query?: object) {
    const countPipeline: object[] = [
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: '$count',
        },
      },
    ];

    if (query) {
      countPipeline.unshift({
        $match: query,
      });
    }

    return countPipeline;
  }

  private getQuery(searchInput: SearchStoresInput): object {
    let query: object = {};

    if (searchInput.city) {
      query = {
        ...query,
        city: searchInput.city,
      };
    }

    return query;
  }
}
