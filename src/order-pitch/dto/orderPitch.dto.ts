import { IsEmail, IsEnum, IsString } from 'class-validator';
export enum ShopCategory {
  BeautyServices = 'Beauty Services',
  MedicalHealthcare = 'Medical Healthcare',
  FitnessCentre = 'Fitness Centre',
  GiftShop = 'Gift Shop',
  VegetableFruits = 'Vegetable Fruits',
  KiranaStore = 'Kirana Store',
  MenFashion = 'Men Fashion',
  WomenAccessories = 'Women Accessories',
  Restaurant = 'Restaurant',
  FastfoodCafe = 'Fastfood & Cafe',
  CakeShop = 'Cake Shop',
  Electronics = 'Electronics',
  NamkeenSweets = 'Namkeen Sweets',
  Laundry = 'Laundry',
  HomemadeSnacks = 'Homemade Snacks',
  EducationTraining = 'Education Training',
  Hotel = 'Hotel',
  Housing = 'Housing',
  DairyShop = 'Dairy Shop',
  FinancialServices = 'Financial Services',
  EventOrganiser = 'Event Organiser',
  WomenClothing = 'Women Clothing',
  Footwear = 'Footwear',
  KidsFashion = 'Kids Fashion',
  Kitchenware = 'Kitchenware',
  HomeDecor = 'Home Decor',
  TourTravel = 'Tour & Travel',
}

export enum ConsumerCategory {
  YoungMothers = 'Young mothers',
  OfficeGoingBachelor = 'Office going Bachelor',
  WorkingCouple = 'Working couple',
  StudentsWhoCook = 'Students who cook',
  OlderPeople = 'Older people',
  FitnessFreaks = 'Fitness freaks',
  ShopOwners = 'Shop owners',
  Housewife = 'Housewife',
  FemaleShopOwners = 'Female shop owners',
}

export class CreateOrderPitchDto {
  @IsString()
  team_lead: string;

  @IsString()
  user_name: string;

  @IsString()
  @IsEmail()
  user_email: string;

  @IsString()
  @IsEnum(ShopCategory)
  shop_category: ShopCategory;

  @IsString()
  @IsEnum(ConsumerCategory)
  consumer_category: ConsumerCategory;

  @IsString()
  notes: string;

  @IsString()
  orderId: string;

  @IsString()
  orderMongoId: string;
}

export class FetchRecentOrders {
  @IsString()
  orderId: string;
}
