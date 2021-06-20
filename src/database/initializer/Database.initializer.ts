import { Store, StoreModel } from '../Store.model';
import * as fs from 'fs';

export const initialData = async () => {
  isAnyStoreData()
    .then((dataIsExist) => {
      if (!dataIsExist) maniuplateData();
      if (dataIsExist) queryFiveNeat();
    })
    .catch((error) => {
      console.error(`❗️[mongo-error] initialData: ${error}`);
    });
};

async function isAnyStoreData(): Promise<boolean> {
  const result = await StoreModel.find().limit(1);
  return result.length > 0;
}

function queryFiveNeat() {}

function maniuplateData() {
  console.log(`🚦 [mongo]: Seeding started.`);

  getSeedData()
    .then((seeds) => seedIntialData(seeds))
    .then((result) => {
      console.log(
        `🌱 [mongo]: Seeding is completed. Added ${result.length} new documents.`,
      );
    })
    .catch((error) => console.error(`❗️[mongo-error] seedingData: ${error}`));
}

async function getSeedData(): Promise<Store[]> {
  let rawdata = await fs.readFileSync(__dirname + '/seed.data.json', 'utf8');
  let data = JSON.parse(rawdata);
  return data.stores.map(
    (store: any) =>
      new StoreModel({
        ...store,
        _id: store['uuid'],
        location: {
          type: 'Point',
          coordinates: [store['latitude'], store['longitude']],
        },
      }),
  );
}

async function seedIntialData(data: Store[]): Promise<Store[]> {
  return await StoreModel.insertMany(data);
}
