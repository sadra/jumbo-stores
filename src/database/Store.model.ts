import { Schema, model } from 'mongoose';

export interface Store {
  _id: string;
  city: string;
  postalCode: string;
  street: string;
  street2?: string;
  street3?: string;
  addressName: string;
  complexNumber: string;
  showWarningMessage: boolean;
  todayOpen: string;
  locationType: string;
  sapStoreID: string;
  todayClose: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

const StoreSchema = new Schema<Store>({
  _id: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  street: { type: String, required: true },
  street2: { type: String },
  street3: { type: String },
  addressName: { type: String, required: true },
  complexNumber: { type: String, required: true },
  showWarningMessage: { type: Boolean, required: true },
  todayOpen: { type: String, required: true },
  locationType: { type: String, required: true },
  sapStoreID: { type: String, required: true },
  todayClose: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

StoreSchema.index({ location: '2dsphere' });

export const StoreModel = model<Store>('Store', StoreSchema);
