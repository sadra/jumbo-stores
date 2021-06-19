import { Schema, model } from 'mongoose';

export interface Store {
  _id: string;
  city: string;
  postalCode: string;
  street: string;
  street2?: string;
  street3?: string;
  addressName: string;
  longitude: string;
  latitude: string;
  complexNumber: string;
  showWarningMessage: boolean;
  todayOpen: string;
  locationType: string;
  sapStoreID: string;
  todayClose: string;
}

const schema = new Schema<Store>({
  _id: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  street: { type: String, required: true },
  street2: { type: String },
  street3: { type: String },
  addressName: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  complexNumber: { type: String, required: true },
  showWarningMessage: { type: Boolean, required: true },
  todayOpen: { type: String, required: true },
  locationType: { type: String, required: true },
  sapStoreID: { type: String, required: true },
  todayClose: { type: String, required: true },
});

export const StoreModel = model<Store>('Store', schema);
