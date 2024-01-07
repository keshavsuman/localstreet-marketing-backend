import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

class Location {
  @Prop({ required: true, enum: ['Point'] })
  type: string;

  @Prop({ required: true })
  coordinates: number[];
}

const LocationSchema = SchemaFactory.createForClass(Location);

@Schema({ timestamps: false, _id: false })
export class CatalougeImage {
  @Prop()
  imageUrl: string;

  @Prop()
  id: string;
}

const CatalougeImageSchema = SchemaFactory.createForClass(CatalougeImage);

@Schema({ timestamps: true })
export class CatalougeDocument {
  @Prop({ required: true, trim: true, maxlength: 50 })
  title: string;

  @Prop({ required: true, default: 0 })
  order: number;

  @Prop({ required: true, trim: true, maxlength: 250 })
  description: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ trim: true })
  image: string;

  @Prop({ default: false })
  isOutofStock: boolean;

  @Prop({ type: [CatalougeImageSchema] })
  images: CatalougeImage[];
}

const CatalougeDocumentSchema = SchemaFactory.createForClass(CatalougeDocument);

@Schema({ timestamps: true })
export class ShopDoument {
  @Prop()
  name: string;

  @Prop({ required: true })
  category: mongoose.Schema.Types.ObjectId;

  @Prop()
  subCategory: Array<mongoose.Schema.Types.ObjectId>;

  @Prop()
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ trim: true, maxlength: 250 })
  manualAddress: string;

  @Prop({ trim: true, maxlength: 250 })
  address: string;

  @Prop({ required: true, trim: true, maxlength: 250 })
  coverImage: string;

  @Prop({ required: true, trim: true, maxlength: 250 })
  image: string;

  @Prop({ required: true, trim: true, maxlength: 10 })
  contactNumber: string;

  @Prop({ trim: true })
  catalogueImage: string;

  @Prop({ required: true })
  openingHour: Array<string>;

  @Prop({ required: true })
  closingHour: Array<string>;

  @Prop({
    required: true,
    trim: true,
  })
  nonWorkingDay: Array<string>;

  @Prop({
    required: true,
    enum: ['none', 'todayOffer', 'freeDelivery', 'freeTrial'],
    trim: true,
  })
  offerType: string;

  @Prop({ required: true })
  offerFlat: number;

  @Prop({ required: true })
  offerPrice: number;

  @Prop({ default: 1 })
  totalMembers: number;

  @Prop()
  totalRating: number;

  @Prop()
  averageRating: number;

  @Prop({ type: LocationSchema })
  location: Location;

  @Prop({ type: [CatalougeDocumentSchema] })
  catalogues: CatalougeDocument[];

  @Prop({
    trim: true,
    default: 'pending',
    enum: ['pending', 'active', 'inactive', 'rejected', 'accept'],
  })
  status: string;

  @Prop({ trim: true })
  city: string;

  @Prop({ trim: true })
  state: string;

  @Prop({ trim: true })
  zipcode: number;

  @Prop({ default: true })
  isOpen: boolean;
}

export type Shop = HydratedDocument<ShopDoument>;
export type Catalouge = HydratedDocument<CatalougeDocument>;

export const ShopSchema = SchemaFactory.createForClass(ShopDoument);

ShopSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

CatalougeDocumentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
