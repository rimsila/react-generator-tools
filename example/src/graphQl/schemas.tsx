export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddressInfoInput = {
  provinceId: Scalars['ID'];
  districtId: Scalars['ID'];
  communeId: Scalars['ID'];
  villageId?: Maybe<Scalars['ID']>;
  streetNo?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type AddressInfoType = {
  __typename?: 'AddressInfoType';
  provinceId: Scalars['ID'];
  province?: Maybe<ProvinceType>;
  districtId?: Maybe<Scalars['ID']>;
  district?: Maybe<DistrictType>;
  communeId?: Maybe<Scalars['ID']>;
  commune?: Maybe<CommuneType>;
  villageId?: Maybe<Scalars['ID']>;
  village?: Maybe<VillageType>;
  streetNo?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type AdminInput = {
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: GenderEnum;
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  mobileDetail: MobileDetailInput;
};

export type AdminType = {
  __typename?: 'AdminType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  mobileDetail: MobileDetails;
  mobileNumber: Scalars['String'];
  accessKey: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type AdminUpdate = {
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderEnum>;
  dob?: Maybe<Scalars['DateTime']>;
  mobileDetail?: Maybe<MobileDetailInput>;
  status?: Maybe<StatusEnum>;
};

export type AuthType = {
  __typename?: 'AuthType';
  apiKey: Scalars['String'];
};

export type CalculateSaleOrderInput = {
  orderId: Scalars['ID'];
  paymentReceived: Array<PaymentReceivedInput>;
  paymentMethod?: Maybe<PaymentTypeEnum>;
  discountId?: Maybe<Scalars['ID']>;
};

export type CalculateSaleOrderType = {
  __typename?: 'CalculateSaleOrderType';
  totalAmount: Scalars['Float'];
  vatAmount: Scalars['Float'];
  subAmount: Scalars['Float'];
  changedAmount: Scalars['Float'];
  discountAmount: Scalars['Float'];
  exchangedRateAmount?: Maybe<Array<ExchangedRateAmountType>>;
};

export type CategoriesFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type CategoriesInput = {
  name: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type CategoriesType = {
  __typename?: 'CategoriesType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type CategoriesUpdate = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
};

export type CdnFilter = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type CdnInput = {
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type CdnType = {
  __typename?: 'CdnType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type CdnUpdate = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type CommuneFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  provinceId?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['String']>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
};

export type CommuneSuggestedFilter = {
  provinceId?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CommuneType = {
  __typename?: 'CommuneType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  uId?: Maybe<Scalars['String']>;
  provinceId?: Maybe<Scalars['String']>;
  province?: Maybe<ProvinceType>;
  districtId?: Maybe<Scalars['String']>;
  district?: Maybe<DistrictType>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type CommuneUpdate = {
  id: Scalars['ID'];
  nameKh: Scalars['String'];
  nameEn: Scalars['String'];
  status?: Maybe<StatusEnum>;
};

export type CompanyBranchInput = {
  nameKh: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
};

export type CompanyBranchType = {
  __typename?: 'CompanyBranchType';
  id: Scalars['ID'];
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
};

export type CompanyDetailInput = {
  countryId?: Maybe<Scalars['String']>;
  provinceId?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['String']>;
  communeId?: Maybe<Scalars['String']>;
  villageId?: Maybe<Scalars['String']>;
  mobileNumber: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  webUrl?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
};

export type CompanyDetailType = {
  __typename?: 'CompanyDetailType';
  countryId?: Maybe<Scalars['ID']>;
  country?: Maybe<CountryType>;
  provinceId?: Maybe<Scalars['ID']>;
  province?: Maybe<ProvinceType>;
  districtId?: Maybe<Scalars['ID']>;
  district?: Maybe<DistrictType>;
  communeId?: Maybe<Scalars['ID']>;
  commune?: Maybe<CommuneType>;
  villageId?: Maybe<Scalars['ID']>;
  village?: Maybe<VillageType>;
  streetNo?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  mobileNumber?: Maybe<Scalars['String']>;
  webUrl?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
};

export type CompanyFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['ID']>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  isExistedBranch?: Maybe<Scalars['Boolean']>;
};

export type CompanyInput = {
  userId: Scalars['ID'];
  nameKh: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
  profile: CompanyDetailInput;
  branches?: Maybe<Array<CompanyBranchInput>>;
};

export type CompanyProfileInput = {
  nameKh: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
  countryId?: Maybe<Scalars['ID']>;
  provinceId?: Maybe<Scalars['ID']>;
  districtId?: Maybe<Scalars['ID']>;
  communeId?: Maybe<Scalars['ID']>;
  villageId?: Maybe<Scalars['ID']>;
  streetNo?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['ID']>;
  mobileNumber?: Maybe<Scalars['ID']>;
  postalCode?: Maybe<Scalars['ID']>;
};

export type CompanyType = {
  __typename?: 'CompanyType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user?: Maybe<VendorType>;
  nameKh: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
  isExistedBranch: Scalars['Boolean'];
  status?: Maybe<Scalars['String']>;
  profile?: Maybe<CompanyDetailType>;
  branches?: Maybe<Array<CompanyBranchType>>;
};

export type CompanyUpdate = {
  id: Scalars['ID'];
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
};

export type ConclusionPaymentType = {
  __typename?: 'ConclusionPaymentType';
  userId?: Maybe<Scalars['ID']>;
  user?: Maybe<RoomUserType>;
  totalPaid?: Maybe<Scalars['Float']>;
  receivedOrOwedAmount?: Maybe<Scalars['Float']>;
};

export type CountryFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
};

export type CountryType = {
  __typename?: 'CountryType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type CountryUpdate = {
  id: Scalars['ID'];
  nameKh: Scalars['String'];
  nameEn: Scalars['String'];
  status?: Maybe<StatusEnum>;
};

export enum CurrencyCodeEnum {
  Usd = 'USD',
  Khr = 'KHR',
}

export type CurrencyFilter = {
  id?: Maybe<Scalars['ID']>;
  code?: Maybe<CurrencyCodeEnum>;
  name?: Maybe<Scalars['String']>;
  roundType?: Maybe<RoundTypeEnum>;
  status?: Maybe<Array<StatusEnum>>;
};

export type CurrencyInput = {
  code?: Maybe<CurrencyCodeEnum>;
  name: Scalars['String'];
  roundType?: Maybe<RoundTypeEnum>;
  decimal: Scalars['Float'];
};

export type CurrencyRateFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  baseCurrencyCode?: Maybe<CurrencyCodeEnum>;
  exchangeCurrencyCode?: Maybe<CurrencyCodeEnum>;
};

export type CurrencyRateInput = {
  baseCurrencyCode: CurrencyCodeEnum;
  exchangeCurrencyCode: CurrencyCodeEnum;
  rate: Scalars['Float'];
};

export type CurrencyRateType = {
  __typename?: 'CurrencyRateType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  baseCurrencyCode: Scalars['String'];
  exchangeCurrencyCode: Scalars['String'];
  rate: Scalars['Float'];
  status?: Maybe<Scalars['String']>;
};

export type CurrencyRateUpdate = {
  id: Scalars['ID'];
  baseCurrencyCode?: Maybe<CurrencyCodeEnum>;
  exchangeCurrencyCode?: Maybe<CurrencyCodeEnum>;
  rate?: Maybe<Scalars['Float']>;
  status?: Maybe<StatusEnum>;
};

export type CurrencyType = {
  __typename?: 'CurrencyType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  roundType: Scalars['String'];
  decimal: Scalars['Float'];
  isDefault: Scalars['Boolean'];
  status?: Maybe<Scalars['String']>;
};

export type CurrencyUpdate = {
  id: Scalars['ID'];
  code?: Maybe<CurrencyCodeEnum>;
  name: Scalars['String'];
  roundType?: Maybe<RoundTypeEnum>;
  decimal?: Maybe<Scalars['Float']>;
  status?: Maybe<StatusEnum>;
};

export type CustomerInput = {
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: GenderEnum;
  mobileDetail: MobileDetailInput;
};

export type CustomerType = {
  __typename?: 'CustomerType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  mobileDetail: MobileDetails;
  mobileNumber: Scalars['String'];
  accessKey: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type CustomerUpdate = {
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderEnum>;
  mobileDetail?: Maybe<MobileDetailInput>;
  status?: Maybe<StatusEnum>;
};

export type DeveloperVerifyCodeInput = {
  verifyCode?: Maybe<Scalars['Int']>;
  verifyUrl?: Maybe<Scalars['String']>;
};

export type DevelopersInput = {
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: GenderEnum;
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  mobileDetail: MobileDetailInput;
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type DevelopersType = {
  __typename?: 'DevelopersType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  gender: Scalars['String'];
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  mobileDetail: MobileDetails;
  authKey: Scalars['String'];
  accessKey: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type DevelopersUpdate = {
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderEnum>;
  dob?: Maybe<Scalars['DateTime']>;
  mobileDetail?: Maybe<MobileDetailInput>;
  status?: Maybe<StatusEnum>;
};

export type DiscountFilter = {
  type?: Maybe<DiscountTypeEnum>;
  title?: Maybe<Scalars['String']>;
};

export type DiscountType = {
  __typename?: 'DiscountType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  type: Scalars['String'];
  title: Scalars['String'];
  value: Scalars['Float'];
  isDefault: Scalars['Boolean'];
  status?: Maybe<Scalars['String']>;
};

export enum DiscountTypeEnum {
  Percentage = 'PERCENTAGE',
  Price = 'PRICE',
}

export type DiscountUpdate = {
  id: Scalars['ID'];
  type?: Maybe<DiscountTypeEnum>;
  title: Scalars['String'];
  value: Scalars['Float'];
  status?: Maybe<StatusEnum>;
};

export type DistrictFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  provinceId?: Maybe<Scalars['String']>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
};

export type DistrictSuggestedFilter = {
  provinceId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type DistrictType = {
  __typename?: 'DistrictType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  uId: Scalars['String'];
  provinceId: Scalars['String'];
  province?: Maybe<ProvinceType>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type DistrictUpdate = {
  id: Scalars['ID'];
  nameKh: Scalars['String'];
  nameEn: Scalars['String'];
  status?: Maybe<StatusEnum>;
};

export type EmployeeFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  mobileNumber?: Maybe<Scalars['String']>;
};

export type EmployeeInfoInput = {
  companyId: Scalars['ID'];
  companyBranchId?: Maybe<Scalars['ID']>;
  jobId: Scalars['ID'];
  hiredAt?: Maybe<Scalars['DateTime']>;
};

export type EmployeeInfoType = {
  __typename?: 'EmployeeInfoType';
  companyId: Scalars['ID'];
  company?: Maybe<CompanyType>;
  companyBranchId?: Maybe<Scalars['ID']>;
  companyBranch?: Maybe<CompanyBranchType>;
  jobId?: Maybe<Scalars['ID']>;
  job?: Maybe<JobType>;
  hiredAt?: Maybe<Scalars['DateTime']>;
};

export type EmployeeInput = {
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: GenderEnum;
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  mobileDetail: MobileDetailInput;
  employee: EmployeeInfoInput;
  addressInfo: AddressInfoInput;
};

export type EmployeeType = {
  __typename?: 'EmployeeType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  mobileDetail: MobileDetails;
  employee?: Maybe<EmployeeInfoType>;
  addressInfo?: Maybe<AddressInfoType>;
  accessKey: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type EmployeeUpdate = {
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderEnum>;
  dob?: Maybe<Scalars['DateTime']>;
  mobileDetail?: Maybe<MobileDetailInput>;
  employee?: Maybe<EmployeeInfoInput>;
  addressInfo?: Maybe<AddressInfoInput>;
  status?: Maybe<StatusEnum>;
};

export type ExchangedRateAmountType = {
  __typename?: 'ExchangedRateAmountType';
  baseCurrencyCode: Scalars['String'];
  exchangedCurrencyCode: Scalars['String'];
  exchangeRate: Scalars['Float'];
  changedAmount: Scalars['Float'];
  subAmount: Scalars['Float'];
};

export enum GenderEnum {
  Male = 'MALE',
  Female = 'FEMALE',
}

export type GroupSizeQntType = {
  __typename?: 'GroupSizeQntType';
  size?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type GroupSizeUnitPriceType = {
  __typename?: 'GroupSizeUnitPriceType';
  size?: Maybe<Scalars['String']>;
  unitPrice?: Maybe<Scalars['Int']>;
};

export type GroupWeightQntType = {
  __typename?: 'GroupWeightQntType';
  weight?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type GroupWeightUnitPriceType = {
  __typename?: 'GroupWeightUnitPriceType';
  weight?: Maybe<Scalars['Float']>;
  unitPrice?: Maybe<Scalars['Float']>;
};

export type HistoryType = {
  __typename?: 'HistoryType';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type JobFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type JobInput = {
  title: Scalars['String'];
  grossSalary: Scalars['Float'];
  status?: Maybe<StatusEnum>;
};

export type JobType = {
  __typename?: 'JobType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  grossSalary: Scalars['Float'];
  status?: Maybe<Scalars['String']>;
};

export type JobUpdate = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  grossSalary?: Maybe<Scalars['Float']>;
  status?: Maybe<StatusEnum>;
};

export type LoginType = {
  __typename?: 'LoginType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  avatar: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  mobileDetail: MobileDetails;
  mobileNumber: Scalars['String'];
  accessKey: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type MemberInput = {
  userId: Scalars['ID'];
};

export type MemberType = {
  __typename?: 'MemberType';
  userId: Scalars['ID'];
  user?: Maybe<RoomUserType>;
};

export type Metadata = {
  __typename?: 'Metadata';
  total: Scalars['Int'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type MobileDetailInput = {
  countryCode: Scalars['String'];
  localNumber: Scalars['String'];
};

export type MobileDetails = {
  __typename?: 'MobileDetails';
  countryCode?: Maybe<Scalars['String']>;
  localNumber?: Maybe<Scalars['String']>;
  mobileNumber?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerDeveloper: DevelopersType;
  verifyCodeOrUrlDeveloper: Scalars['Boolean'];
  loginDeveloper: DevelopersType;
  updateDeveloper: DevelopersType;
  logoutDeveloper: Scalars['Boolean'];
  createNewAdmin: AdminType;
  updateAdmin: AdminType;
  requestApiKey: AuthType;
  createCdn: CdnType;
  updateCdn: CdnType;
  deleteCdn: Scalars['Boolean'];
  updateProvince: ProvinceType;
  updateDistrict: DistrictType;
  updateCommune: CommuneType;
  updateCountry: CountryType;
  updateVillage: VillageType;
  createVendor: VendorType;
  updateVendor: VendorType;
  addVendorCompany: Scalars['Boolean'];
  removeVendorCompany: Scalars['Boolean'];
  createCompany: CompanyType;
  updateCompany: CompanyType;
  addBranchCompany: Scalars['Boolean'];
  updateBranchCompany: Scalars['Boolean'];
  removeBranchCompany: Scalars['Boolean'];
  deleteCompany: Scalars['Boolean'];
  createCurrencyRate: CurrencyRateType;
  updateCurrencyRate: CurrencyRateType;
  deleteCurrencyRate: CurrencyRateType;
  createCurrency: CurrencyType;
  updateCurrency: CurrencyType;
  setDefaultCurrency: Scalars['Boolean'];
  deleteCurrency: Scalars['Boolean'];
  createNewCustomer: CustomerType;
  updateCustomer: CustomerType;
  updateDiscount: Scalars['Boolean'];
  setDefaultDiscount: Scalars['Boolean'];
  createJob: JobType;
  updateJob: Scalars['Boolean'];
  deleteJob: Scalars['Boolean'];
  createEmployee: EmployeeType;
  updateEmployee: EmployeeType;
  removeEmployee: Scalars['Boolean'];
  updateRoomUserProfile: RoomUserType;
  setDefaultAdmin: Scalars['Boolean'];
  login: LoginType;
  logout: Scalars['Boolean'];
  registerVendor: VendorType;
  verifyAccount: Scalars['Boolean'];
  registerRoomUser: RoomUserType;
  verifyRoomUserAccount: Scalars['Boolean'];
  loginRoomUser: RoomUserType;
  createPaymentMethod: PaymentMethodType;
  updatePaymentMethod: Scalars['Boolean'];
  setDefaultPaymentMethod: Scalars['Boolean'];
  deletePaymentMethod: Scalars['Boolean'];
  createProductSupplier: ProductSupplierType;
  updateProductSupplier: ProductSupplierType;
  deleteProductSupplier: Scalars['Boolean'];
  createCategory: CategoriesType;
  updateCategory: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  createTax: TaxesType;
  updateTax: TaxesType;
  deleteTax: Scalars['Boolean'];
  createProduct: Scalars['Boolean'];
  updateProduct: Scalars['Boolean'];
  removeProduct: Scalars['Boolean'];
  removeProductImage: Scalars['Boolean'];
  removeProductThumbnail: Scalars['Boolean'];
  addProductRecorder: Scalars['Boolean'];
  updateProductRecorder: Scalars['Boolean'];
  removeProductRecorder: Scalars['Boolean'];
  inDecreaseProductRecorderStock: Scalars['Boolean'];
  createSaleOrder: Scalars['Boolean'];
  calculateSaleOrder: CalculateSaleOrderType;
  cancelSaleOrder: Scalars['Boolean'];
  holdSaleOrder: Scalars['Boolean'];
  updateProfile: ProfileType;
  createRoomCategory: RoomCategoryType;
  updateRoomCategory: Scalars['Boolean'];
  deleteRoomCategory: Scalars['Boolean'];
  createRoom: RoomType;
  updateRoom: Scalars['Boolean'];
  addMemberRoom: Scalars['Boolean'];
  deleteRoom: Scalars['Boolean'];
  createRoomTransaction: Scalars['Boolean'];
  deleteRoomTransaction: Scalars['Boolean'];
  confirmPaymentRoomTransaction: Scalars['Boolean'];
  createTime: TimeType;
  updateTime: TimeType;
  deleteTime: TimeType;
  createSalePayment: TransactionType;
};

export type MutationRegisterDeveloperArgs = {
  input: DevelopersInput;
};

export type MutationVerifyCodeOrUrlDeveloperArgs = {
  input: DeveloperVerifyCodeInput;
};

export type MutationLoginDeveloperArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationUpdateDeveloperArgs = {
  input: DevelopersUpdate;
  accessKey: Scalars['String'];
};

export type MutationLogoutDeveloperArgs = {
  accessKey: Scalars['String'];
};

export type MutationCreateNewAdminArgs = {
  input: AdminInput;
};

export type MutationUpdateAdminArgs = {
  input: AdminUpdate;
  id: Scalars['String'];
};

export type MutationRequestApiKeyArgs = {
  authKey: Scalars['String'];
};

export type MutationCreateCdnArgs = {
  input: CdnInput;
};

export type MutationUpdateCdnArgs = {
  input: CdnUpdate;
};

export type MutationDeleteCdnArgs = {
  id: Scalars['String'];
};

export type MutationUpdateProvinceArgs = {
  input: ProvinceUpdate;
};

export type MutationUpdateDistrictArgs = {
  input: DistrictUpdate;
};

export type MutationUpdateCommuneArgs = {
  input: CommuneUpdate;
};

export type MutationUpdateCountryArgs = {
  input: CountryUpdate;
};

export type MutationUpdateVillageArgs = {
  input: VillageUpdate;
};

export type MutationCreateVendorArgs = {
  input: VendorInput;
};

export type MutationUpdateVendorArgs = {
  input: VendorUpdate;
  id: Scalars['String'];
};

export type MutationAddVendorCompanyArgs = {
  company: VendorCompanyInput;
  id: Scalars['String'];
};

export type MutationRemoveVendorCompanyArgs = {
  id: Scalars['String'];
};

export type MutationCreateCompanyArgs = {
  input: CompanyInput;
};

export type MutationUpdateCompanyArgs = {
  input: CompanyUpdate;
};

export type MutationAddBranchCompanyArgs = {
  companyBranch: Array<CompanyBranchInput>;
  id: Scalars['String'];
};

export type MutationUpdateBranchCompanyArgs = {
  companyBranch: CompanyBranchInput;
  id: Scalars['String'];
};

export type MutationRemoveBranchCompanyArgs = {
  id: Scalars['String'];
};

export type MutationDeleteCompanyArgs = {
  id: Scalars['String'];
};

export type MutationCreateCurrencyRateArgs = {
  input: CurrencyRateInput;
};

export type MutationUpdateCurrencyRateArgs = {
  input: CurrencyRateUpdate;
};

export type MutationDeleteCurrencyRateArgs = {
  id: Scalars['String'];
};

export type MutationCreateCurrencyArgs = {
  input: CurrencyInput;
};

export type MutationUpdateCurrencyArgs = {
  input: CurrencyUpdate;
};

export type MutationSetDefaultCurrencyArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteCurrencyArgs = {
  id: Scalars['String'];
};

export type MutationCreateNewCustomerArgs = {
  input: CustomerInput;
};

export type MutationUpdateCustomerArgs = {
  input: CustomerUpdate;
  id: Scalars['String'];
};

export type MutationUpdateDiscountArgs = {
  input: DiscountUpdate;
};

export type MutationSetDefaultDiscountArgs = {
  id: Scalars['ID'];
};

export type MutationCreateJobArgs = {
  input: JobInput;
};

export type MutationUpdateJobArgs = {
  input: JobUpdate;
};

export type MutationDeleteJobArgs = {
  id: Scalars['String'];
};

export type MutationCreateEmployeeArgs = {
  input: EmployeeInput;
};

export type MutationUpdateEmployeeArgs = {
  input: EmployeeUpdate;
  id: Scalars['String'];
};

export type MutationRemoveEmployeeArgs = {
  id: Scalars['String'];
};

export type MutationUpdateRoomUserProfileArgs = {
  input: RoomUserUpdate;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLogoutArgs = {
  accessKey: Scalars['String'];
};

export type MutationRegisterVendorArgs = {
  input: VendorRegisterInput;
};

export type MutationVerifyAccountArgs = {
  input: VerifyAccountInput;
};

export type MutationRegisterRoomUserArgs = {
  input: RoomUserRegisterInput;
};

export type MutationVerifyRoomUserAccountArgs = {
  verifyCode: Scalars['String'];
};

export type MutationLoginRoomUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationCreatePaymentMethodArgs = {
  input: PaymentMethodInput;
};

export type MutationUpdatePaymentMethodArgs = {
  input: PaymentMethodUpdate;
};

export type MutationSetDefaultPaymentMethodArgs = {
  id: Scalars['ID'];
};

export type MutationDeletePaymentMethodArgs = {
  id: Scalars['String'];
};

export type MutationCreateProductSupplierArgs = {
  input: ProductSupplierInput;
};

export type MutationUpdateProductSupplierArgs = {
  input: ProductSupplierUpdate;
};

export type MutationDeleteProductSupplierArgs = {
  id: Scalars['String'];
};

export type MutationCreateCategoryArgs = {
  input: CategoriesInput;
};

export type MutationUpdateCategoryArgs = {
  input: CategoriesUpdate;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};

export type MutationCreateTaxArgs = {
  input: TaxesInput;
};

export type MutationUpdateTaxArgs = {
  input: TaxesUpdate;
};

export type MutationDeleteTaxArgs = {
  id: Scalars['String'];
};

export type MutationCreateProductArgs = {
  input: ProductInput;
};

export type MutationUpdateProductArgs = {
  input: ProductUpdate;
};

export type MutationRemoveProductArgs = {
  id: Scalars['String'];
};

export type MutationRemoveProductImageArgs = {
  input: RemoveProductImageInput;
};

export type MutationRemoveProductThumbnailArgs = {
  input: RemoveProductImageInput;
};

export type MutationAddProductRecorderArgs = {
  recorders: Array<RecorderInput>;
  productId: Scalars['ID'];
};

export type MutationUpdateProductRecorderArgs = {
  input: ProductRecorderUpdate;
};

export type MutationRemoveProductRecorderArgs = {
  id: Scalars['ID'];
};

export type MutationInDecreaseProductRecorderStockArgs = {
  quantity: Scalars['Int'];
  id: Scalars['ID'];
};

export type MutationCreateSaleOrderArgs = {
  input: SaleOrderInput;
};

export type MutationCalculateSaleOrderArgs = {
  input: CalculateSaleOrderInput;
};

export type MutationCancelSaleOrderArgs = {
  id: Scalars['String'];
};

export type MutationHoldSaleOrderArgs = {
  id: Scalars['String'];
};

export type MutationUpdateProfileArgs = {
  input: ProfileUpdate;
  accessKey: Scalars['String'];
};

export type MutationCreateRoomCategoryArgs = {
  input: RoomCategoryInput;
};

export type MutationUpdateRoomCategoryArgs = {
  input: RoomCategoryUpdate;
};

export type MutationDeleteRoomCategoryArgs = {
  id: Scalars['String'];
};

export type MutationCreateRoomArgs = {
  input: RoomInput;
};

export type MutationUpdateRoomArgs = {
  input: RoomUpdate;
};

export type MutationAddMemberRoomArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationDeleteRoomArgs = {
  id: Scalars['String'];
};

export type MutationCreateRoomTransactionArgs = {
  input: RoomTransactionInput;
};

export type MutationDeleteRoomTransactionArgs = {
  id: Scalars['String'];
};

export type MutationConfirmPaymentRoomTransactionArgs = {
  input: RoomTransactionConfirmPaymentInput;
};

export type MutationCreateTimeArgs = {
  input: TimeInput;
};

export type MutationUpdateTimeArgs = {
  input: TimeUpdate;
};

export type MutationDeleteTimeArgs = {
  id: Scalars['String'];
};

export type MutationCreateSalePaymentArgs = {
  input: SaleTransactionInput;
};

export type NameType = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type NameTypes = {
  __typename?: 'NameTypes';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type OrderDetailType = {
  __typename?: 'OrderDetailType';
  productRecorderId: Scalars['ID'];
  productRecorder: ProductRecorderType;
  productId: Scalars['ID'];
  product: ProductType;
  quantity: Scalars['Int'];
  totalAmount: Scalars['Float'];
  vatAmount: Scalars['Float'];
  subAmount: Scalars['Float'];
};

export type OrderType = {
  __typename?: 'OrderType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  userId?: Maybe<Scalars['ID']>;
  user?: Maybe<CustomerType>;
  currencyCode?: Maybe<Scalars['String']>;
  totalAmount: Scalars['Float'];
  vatAmount: Scalars['Float'];
  subAmount: Scalars['Float'];
  orderDetails: Array<OrderDetailType>;
  status?: Maybe<Scalars['String']>;
};

export type PaginatedCategoryType = {
  __typename?: 'PaginatedCategoryType';
  records?: Maybe<Array<CategoriesType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedCommuneType = {
  __typename?: 'PaginatedCommuneType';
  records?: Maybe<Array<CommuneType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedCompanyType = {
  __typename?: 'PaginatedCompanyType';
  records?: Maybe<Array<CompanyType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedCountryType = {
  __typename?: 'PaginatedCountryType';
  records?: Maybe<Array<CountryType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedDistrictType = {
  __typename?: 'PaginatedDistrictType';
  records?: Maybe<Array<DistrictType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedEmployeeType = {
  __typename?: 'PaginatedEmployeeType';
  records?: Maybe<Array<EmployeeType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedJobType = {
  __typename?: 'PaginatedJobType';
  records?: Maybe<Array<JobType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedProductSupplierType = {
  __typename?: 'PaginatedProductSupplierType';
  records?: Maybe<Array<ProductSupplierType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedProductType = {
  __typename?: 'PaginatedProductType';
  records?: Maybe<Array<ProductType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedProvinceType = {
  __typename?: 'PaginatedProvinceType';
  records?: Maybe<Array<ProvinceType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedRoomType = {
  __typename?: 'PaginatedRoomType';
  records?: Maybe<Array<RoomType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedTaxType = {
  __typename?: 'PaginatedTaxType';
  records?: Maybe<Array<TaxesType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedTimeType = {
  __typename?: 'PaginatedTimeType';
  records?: Maybe<Array<TimeType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedVendorType = {
  __typename?: 'PaginatedVendorType';
  records?: Maybe<Array<VendorType>>;
  metadata?: Maybe<Metadata>;
};

export type PaginatedVillageType = {
  __typename?: 'PaginatedVillageType';
  records?: Maybe<Array<VillageType>>;
  metadata?: Maybe<Metadata>;
};

export type PaymentMethodFilter = {
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<PaymentTypeEnum>;
  title?: Maybe<Scalars['String']>;
  status?: Maybe<Array<StatusEnum>>;
};

export type PaymentMethodInput = {
  type?: Maybe<PaymentTypeEnum>;
  title: Scalars['String'];
};

export type PaymentMethodType = {
  __typename?: 'PaymentMethodType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  type: Scalars['String'];
  title: Scalars['String'];
  isDefault: Scalars['Boolean'];
  status?: Maybe<Scalars['String']>;
};

export type PaymentMethodUpdate = {
  id: Scalars['ID'];
  type?: Maybe<PaymentTypeEnum>;
  title: Scalars['String'];
  status?: Maybe<StatusEnum>;
};

export type PaymentReceivedInput = {
  currencyCode: CurrencyCodeEnum;
  amount: Scalars['Float'];
};

export type PaymentReceivedType = {
  __typename?: 'PaymentReceivedType';
  currencyCode: CurrencyCodeEnum;
  amount: Scalars['Float'];
};

export enum PaymentTypeEnum {
  Cash = 'CASH',
  Aba = 'ABA',
}

export type ProductFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  alternativeName?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type ProductImageInput = {
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type ProductInput = {
  name: Scalars['String'];
  alternativeName?: Maybe<Scalars['String']>;
  categoryId: Scalars['ID'];
  taxId: Scalars['ID'];
  thumbnails?: Maybe<Array<ProductImageInput>>;
  images?: Maybe<Array<ProductImageInput>>;
  suppliers: Array<ProductSupplyingInput>;
  shortDescription?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  recorders: Array<RecorderInput>;
  status?: Maybe<StatusEnum>;
};

export type ProductRecorderFilter = {
  productId: Scalars['ID'];
  barcode?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['String']>;
};

export type ProductRecorderType = {
  __typename?: 'ProductRecorderType';
  id: Scalars['ID'];
  productId: Scalars['ID'];
  product?: Maybe<ProductType>;
  barcode?: Maybe<Scalars['String']>;
  priceBuy: Scalars['Float'];
  priceSale: Scalars['Float'];
  unitPrice: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['String']>;
  producedDate?: Maybe<Scalars['DateTime']>;
  expiredDate?: Maybe<Scalars['DateTime']>;
  stock?: Maybe<StockType>;
  status?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
};

export type ProductRecorderUpdate = {
  id: Scalars['ID'];
  barcode?: Maybe<Scalars['String']>;
  modifyQuantity?: Maybe<Scalars['Int']>;
  priceBuy?: Maybe<Scalars['Float']>;
  priceSale?: Maybe<Scalars['Float']>;
  unitPrice?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['String']>;
  producedDate?: Maybe<Scalars['DateTime']>;
  expiredDate?: Maybe<Scalars['DateTime']>;
};

export type ProductSaleFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type ProductSalePaginatedType = {
  __typename?: 'ProductSalePaginatedType';
  records?: Maybe<Array<ProductType>>;
  metadata?: Maybe<Metadata>;
};

export type ProductSupplierFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  companyName?: Maybe<Scalars['String']>;
};

export type ProductSupplierInput = {
  userId?: Maybe<Scalars['String']>;
  companyName: Scalars['String'];
  contactInfo: SupplierContactInfoInput;
  addressInfo?: Maybe<SupplierAddressInfoInput>;
  description?: Maybe<Scalars['String']>;
};

export type ProductSupplierType = {
  __typename?: 'ProductSupplierType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  companyName: Scalars['String'];
  contactInfo: SupplierContactInfoType;
  addressInfo?: Maybe<SupplierAddressInfoType>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type ProductSupplierUpdate = {
  id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  contactInfo?: Maybe<SupplierContactInfoInput>;
  addressInfo?: Maybe<SupplierAddressInfoInput>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
};

export type ProductSupplyingInput = {
  supplierId: Scalars['ID'];
  quantity: Scalars['Int'];
  orderedDate?: Maybe<Scalars['DateTime']>;
  arriveDate?: Maybe<Scalars['DateTime']>;
  isArrived?: Maybe<Scalars['Boolean']>;
};

export type ProductType = {
  __typename?: 'ProductType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  alternativeName?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
  category?: Maybe<CategoriesType>;
  taxId?: Maybe<Scalars['String']>;
  tax?: Maybe<TaxesType>;
  quantity: Scalars['Int'];
  images?: Maybe<Array<ProductImage>>;
  thumbnails?: Maybe<Array<ProductImage>>;
  shortDescription?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  suppliers?: Maybe<Array<SupplyingType>>;
  recorders?: Maybe<Array<ProductRecorderType>>;
  groupWeightQuantity?: Maybe<Array<GroupWeightQntType>>;
  groupSizeQuantity?: Maybe<Array<GroupSizeQntType>>;
  groupWightUnitPrice?: Maybe<Array<GroupWeightUnitPriceType>>;
  groupSizeUnitPrice?: Maybe<Array<GroupSizeUnitPriceType>>;
  status?: Maybe<Scalars['String']>;
};

export type ProductUpdate = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  alternativeName?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['ID']>;
  taxId?: Maybe<Scalars['ID']>;
  thumbnails?: Maybe<Array<ProductImageInput>>;
  images?: Maybe<Array<ProductImageInput>>;
  suppliers?: Maybe<Array<ProductSupplyingInput>>;
  shortDescription?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
};

export type ProfileType = {
  __typename?: 'ProfileType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  type: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  mobileDetail: MobileDetails;
  vendors: Array<Maybe<Vendor>>;
  employee?: Maybe<EmployeeInfoType>;
  addressInfo?: Maybe<AddressInfoType>;
  accessKey: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type ProfileUpdate = {
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderEnum>;
  dob?: Maybe<Scalars['DateTime']>;
  mobileDetail?: Maybe<MobileDetailInput>;
  employee?: Maybe<EmployeeInfoInput>;
  addressInfo?: Maybe<AddressInfoInput>;
};

export type ProvinceFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  uId?: Maybe<Scalars['String']>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
};

export type ProvinceType = {
  __typename?: 'ProvinceType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  uId: Scalars['String'];
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type ProvinceUpdate = {
  id: Scalars['ID'];
  nameKh: Scalars['String'];
  nameEn: Scalars['String'];
  status?: Maybe<StatusEnum>;
};

export type Query = {
  __typename?: 'Query';
  getCdn: CdnType;
  getCdns: Array<CdnType>;
  getProvince: ProvinceType;
  getProvinces: PaginatedProvinceType;
  getSuggestedProvinces: Array<ProvinceType>;
  getActiveProvinces: Array<ProvinceType>;
  getDistrict: DistrictType;
  getDistricts: PaginatedDistrictType;
  getActiveDistricts: Array<DistrictType>;
  getSuggestedDistricts: Array<DistrictType>;
  getCommune: CommuneType;
  getCommunes: PaginatedCommuneType;
  getActiveCommunes: Array<CommuneType>;
  getSuggestedCommunes: Array<CommuneType>;
  getCountry: CountryType;
  getCountries: PaginatedCountryType;
  getActiveCountries: Array<CountryType>;
  getSuggestedCountries: Array<CountryType>;
  getVillage: VillageType;
  getVillages: PaginatedVillageType;
  getActiveVillages: Array<VillageType>;
  getSuggestedVillages: Array<VillageType>;
  getVendors: PaginatedVendorType;
  getCompanyVendor: VendorType;
  getCompany: CompanyType;
  getCompanies: PaginatedCompanyType;
  getActiveCompanies: Array<CompanyType>;
  getCurrencyRate: CurrencyRateType;
  getCurrencyRates: Array<CurrencyRateType>;
  getActiveCurrencyRates: Array<CurrencyRateType>;
  getCurrency: CurrencyType;
  getCurrencies: Array<CurrencyType>;
  getActiveCurrencies: Array<CurrencyType>;
  getDiscounts: Array<DiscountType>;
  getActiveDiscounts: Array<DiscountType>;
  getJob: JobType;
  getJobs: PaginatedJobType;
  getActiveJobs: Array<JobType>;
  getEmployees: PaginatedEmployeeType;
  getRoomUserProfile: RoomUserType;
  getRoomUserList: Array<RoomUserType>;
  getPaymentMethod: PaymentMethodType;
  getPaymentMethods: Array<PaymentMethodType>;
  getActivePaymentMethods: Array<PaymentMethodType>;
  getProductSupplier: ProductSupplierType;
  getProductSuppliers: PaginatedProductSupplierType;
  getActiveProductSuppliers: Array<ProductSupplierType>;
  getCategory: CategoriesType;
  getCategories: PaginatedCategoryType;
  getActiveCategories: Array<CategoriesType>;
  getTax: TaxesType;
  getTaxes: PaginatedTaxType;
  getActiveTaxes: Array<TaxesType>;
  getProduct: ProductType;
  getProducts: PaginatedProductType;
  getProductRecorders: Array<ProductRecorderType>;
  getProductRecorder: ProductRecorderType;
  getPendingOrder: OrderType;
  getProfile: ProfileType;
  getRoomCategory: RoomCategoryType;
  getRoomCategories: Array<RoomCategoryType>;
  getRoom: RoomType;
  getRooms: PaginatedRoomType;
  getUserByRoomId: Array<MemberType>;
  getDailyTransactions: Array<RoomTransactionGroupType>;
  getMonthlyTransactions: Array<RoomTransactionGroupByMonthType>;
  getRoomTransactionReport: Array<RoomTransactionReportType>;
  getProductSales: ProductSalePaginatedType;
  getTime: TimeType;
  getTimes: PaginatedTimeType;
  getActiveTimes: Array<TimeType>;
};

export type QueryGetCdnArgs = {
  id: Scalars['String'];
};

export type QueryGetCdnsArgs = {
  filter: CdnFilter;
};

export type QueryGetProvinceArgs = {
  id: Scalars['String'];
};

export type QueryGetProvincesArgs = {
  filter: ProvinceFilter;
};

export type QueryGetSuggestedProvincesArgs = {
  name: Scalars['String'];
};

export type QueryGetActiveProvincesArgs = {
  filter: ProvinceFilter;
};

export type QueryGetDistrictArgs = {
  id: Scalars['String'];
};

export type QueryGetDistrictsArgs = {
  filter: DistrictFilter;
};

export type QueryGetActiveDistrictsArgs = {
  filter: DistrictFilter;
};

export type QueryGetSuggestedDistrictsArgs = {
  filter: DistrictSuggestedFilter;
};

export type QueryGetCommuneArgs = {
  id: Scalars['String'];
};

export type QueryGetCommunesArgs = {
  filter: CommuneFilter;
};

export type QueryGetActiveCommunesArgs = {
  filter: CommuneFilter;
};

export type QueryGetSuggestedCommunesArgs = {
  filter: CommuneSuggestedFilter;
};

export type QueryGetCountryArgs = {
  id: Scalars['String'];
};

export type QueryGetCountriesArgs = {
  filter: CountryFilter;
};

export type QueryGetActiveCountriesArgs = {
  filter: CountryFilter;
};

export type QueryGetSuggestedCountriesArgs = {
  name: Scalars['String'];
};

export type QueryGetVillageArgs = {
  id: Scalars['String'];
};

export type QueryGetVillagesArgs = {
  filter: VillageFilter;
};

export type QueryGetActiveVillagesArgs = {
  filter: VillageFilter;
};

export type QueryGetSuggestedVillagesArgs = {
  filter: VillageSuggestedFilter;
};

export type QueryGetVendorsArgs = {
  filter: VendorFilter;
};

export type QueryGetCompanyVendorArgs = {
  id: Scalars['String'];
};

export type QueryGetCompanyArgs = {
  id: Scalars['ID'];
};

export type QueryGetCompaniesArgs = {
  filter: CompanyFilter;
};

export type QueryGetActiveCompaniesArgs = {
  filter: CompanyFilter;
};

export type QueryGetCurrencyRateArgs = {
  id: Scalars['String'];
};

export type QueryGetCurrencyRatesArgs = {
  filter: CurrencyRateFilter;
};

export type QueryGetActiveCurrencyRatesArgs = {
  filter: CurrencyRateFilter;
};

export type QueryGetCurrencyArgs = {
  id: Scalars['String'];
};

export type QueryGetCurrenciesArgs = {
  filter: CurrencyFilter;
};

export type QueryGetActiveCurrenciesArgs = {
  filter: CurrencyFilter;
};

export type QueryGetDiscountsArgs = {
  filter: DiscountFilter;
};

export type QueryGetJobArgs = {
  id: Scalars['String'];
};

export type QueryGetJobsArgs = {
  filter: JobFilter;
};

export type QueryGetActiveJobsArgs = {
  filter: JobFilter;
};

export type QueryGetEmployeesArgs = {
  filter: EmployeeFilter;
};

export type QueryGetRoomUserProfileArgs = {
  accessKey: Scalars['String'];
};

export type QueryGetPaymentMethodArgs = {
  id: Scalars['String'];
};

export type QueryGetPaymentMethodsArgs = {
  filter: PaymentMethodFilter;
};

export type QueryGetActivePaymentMethodsArgs = {
  filter: PaymentMethodFilter;
};

export type QueryGetProductSupplierArgs = {
  id: Scalars['String'];
};

export type QueryGetProductSuppliersArgs = {
  filter: ProductSupplierFilter;
};

export type QueryGetActiveProductSuppliersArgs = {
  filter: ProductSupplierFilter;
};

export type QueryGetCategoryArgs = {
  id: Scalars['String'];
};

export type QueryGetCategoriesArgs = {
  filter: CategoriesFilter;
};

export type QueryGetActiveCategoriesArgs = {
  filter: CategoriesFilter;
};

export type QueryGetTaxArgs = {
  id: Scalars['String'];
};

export type QueryGetTaxesArgs = {
  filter: TaxesFilter;
};

export type QueryGetActiveTaxesArgs = {
  filter: TaxesFilter;
};

export type QueryGetProductArgs = {
  id: Scalars['String'];
};

export type QueryGetProductsArgs = {
  filter: ProductFilter;
};

export type QueryGetProductRecordersArgs = {
  filter: ProductRecorderFilter;
};

export type QueryGetProductRecorderArgs = {
  id: Scalars['String'];
};

export type QueryGetRoomCategoryArgs = {
  id: Scalars['String'];
};

export type QueryGetRoomCategoriesArgs = {
  filter: RoomCategoryFilter;
};

export type QueryGetRoomArgs = {
  id: Scalars['String'];
};

export type QueryGetRoomsArgs = {
  filter: RoomFilter;
};

export type QueryGetUserByRoomIdArgs = {
  roomId: Scalars['String'];
};

export type QueryGetDailyTransactionsArgs = {
  filter: RoomTransactionGroupFilter;
};

export type QueryGetMonthlyTransactionsArgs = {
  filter: RoomTransactionGroupFilter;
};

export type QueryGetRoomTransactionReportArgs = {
  filter: RoomTransactionGroupFilter;
};

export type QueryGetProductSalesArgs = {
  filter: ProductSaleFilter;
};

export type QueryGetTimeArgs = {
  filter: TimeFilter;
};

export type QueryGetTimesArgs = {
  filter: TimeFilter;
};

export type QueryGetActiveTimesArgs = {
  filter: TimeFilter;
};

export type RecorderInput = {
  barcode?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  priceBuy: Scalars['Float'];
  priceSale: Scalars['Float'];
  unitPrice: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['String']>;
  producedDate?: Maybe<Scalars['DateTime']>;
  expiredDate?: Maybe<Scalars['DateTime']>;
};

export type RemoveProductImageInput = {
  productId: Scalars['ID'];
  imageId: Scalars['ID'];
};

export enum RoomAccountTypeEnum {
  Cash = 'CASH',
  Aba = 'ABA',
  CreditCard = 'CREDIT_CARD',
}

export type RoomCategoryFilter = {
  name?: Maybe<Scalars['String']>;
};

export type RoomCategoryInput = {
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};

export type RoomCategoryType = {
  __typename?: 'RoomCategoryType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type RoomCategoryUpdate = {
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
};

export enum RoomCurrencyCodeEnum {
  Usd = 'USD',
  Khr = 'KHR',
}

export type RoomFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type RoomInput = {
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  exchangeRate: Scalars['Float'];
  members: Array<MemberInput>;
  description?: Maybe<Scalars['String']>;
};

export type RoomTransactionConfirmPaymentInput = {
  roomId: Scalars['ID'];
  year: Scalars['Int'];
  month: Scalars['Int'];
};

export type RoomTransactionGroupByMonthType = {
  __typename?: 'RoomTransactionGroupByMonthType';
  year: Scalars['Int'];
  month: Scalars['Int'];
  amount: Scalars['Float'];
  total: Scalars['Int'];
};

export type RoomTransactionGroupFilter = {
  roomId: Scalars['ID'];
  startedAt?: Maybe<Scalars['DateTime']>;
  endedAt?: Maybe<Scalars['DateTime']>;
};

export type RoomTransactionGroupType = {
  __typename?: 'RoomTransactionGroupType';
  transactionDate: Scalars['DateTime'];
  month: Scalars['Int'];
  amount: Scalars['Float'];
  transactions: Array<RoomTransactionType>;
  total: Scalars['Int'];
};

export type RoomTransactionInput = {
  roomId?: Maybe<Scalars['ID']>;
  categoryId: Scalars['ID'];
  createdTransactionAt?: Maybe<Scalars['DateTime']>;
  accountType?: Maybe<RoomAccountTypeEnum>;
  type: RoomTransactionTypeEnum;
  currencyCode: RoomCurrencyCodeEnum;
  amount: Scalars['Float'];
  shareWith: Array<Maybe<ShareWithInput>>;
  shareFor?: Maybe<Array<Scalars['String']>>;
  image?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type RoomTransactionReportType = {
  __typename?: 'RoomTransactionReportType';
  year: Scalars['Int'];
  month: Scalars['Int'];
  amount: Scalars['Float'];
  count: Scalars['Int'];
  size: Scalars['Int'];
  conclusionPayments: Array<ConclusionPaymentType>;
};

export type RoomTransactionType = {
  __typename?: 'RoomTransactionType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  roomId?: Maybe<Scalars['ID']>;
  categoryId: Scalars['ID'];
  category?: Maybe<RoomCategoryType>;
  createdTransactionAt: Scalars['DateTime'];
  accountType: Scalars['String'];
  type: Scalars['String'];
  currencyCode: Scalars['String'];
  amount: Scalars['Float'];
  shareWith?: Maybe<Array<ShareWithType>>;
  shareFor?: Maybe<Array<ShareForType>>;
  note?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isApproved?: Maybe<Scalars['Boolean']>;
  isReturned?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export enum RoomTransactionTypeEnum {
  Sharing = 'SHARING',
  Borrowing = 'BORROWING',
  Returning = 'RETURNING',
}

export type RoomType = {
  __typename?: 'RoomType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  members: Array<MemberType>;
  exchangeRate: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type RoomUpdate = {
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  exchangeRate?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  status?: Maybe<StatusEnum>;
};

export type RoomUserRegisterInput = {
  avatar?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type RoomUserType = {
  __typename?: 'RoomUserType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type RoomUserUpdate = {
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
};

export enum RoundTypeEnum {
  Up = 'UP',
  Down = 'DOWN',
  Default = 'DEFAULT',
}

export type SaleOrderInput = {
  userId?: Maybe<Scalars['ID']>;
  productRecorderId: Scalars['String'];
  quantity: Scalars['Int'];
};

export type SaleTransactionInput = {
  orderId: Scalars['ID'];
  paymentReceived: Array<PaymentReceivedInput>;
  paymentMethod?: Maybe<PaymentTypeEnum>;
  discountId?: Maybe<Scalars['ID']>;
};

export type ShareForType = {
  __typename?: 'ShareForType';
  userId?: Maybe<Scalars['ID']>;
  user?: Maybe<RoomUserType>;
};

export type ShareWithInput = {
  userId: Scalars['ID'];
  amount: Scalars['Float'];
};

export type ShareWithType = {
  __typename?: 'ShareWithType';
  userId?: Maybe<Scalars['ID']>;
  user?: Maybe<RoomUserType>;
  amount?: Maybe<Scalars['Float']>;
};

export enum StatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Deleted = 'DELETED',
}

export type StockType = {
  __typename?: 'StockType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  productRecorderId: Scalars['ID'];
  productRecorder?: Maybe<ProductRecorderType>;
  quantity: Scalars['Int'];
  histories?: Maybe<Array<HistoryType>>;
};

export type SupplierAddressInfoInput = {
  country?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  commune?: Maybe<Scalars['String']>;
  village?: Maybe<Scalars['String']>;
  streetNo?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type SupplierAddressInfoType = {
  __typename?: 'SupplierAddressInfoType';
  countryId?: Maybe<Scalars['ID']>;
  country?: Maybe<CountryType>;
  provinceId?: Maybe<Scalars['ID']>;
  province?: Maybe<ProvinceType>;
  districtId?: Maybe<Scalars['ID']>;
  district?: Maybe<DistrictType>;
  communeId?: Maybe<Scalars['ID']>;
  commune?: Maybe<CommuneType>;
  villageId?: Maybe<Scalars['ID']>;
  village?: Maybe<VillageType>;
  streetNo?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type SupplierContactInfoInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mobileNumber: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type SupplierContactInfoType = {
  __typename?: 'SupplierContactInfoType';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  mobileNumber: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type SupplyingType = {
  __typename?: 'SupplyingType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  supplierId: Scalars['ID'];
  supplier?: Maybe<ProductSupplierType>;
  quantity: Scalars['Int'];
  orderedAt?: Maybe<Scalars['DateTime']>;
  arriveAt?: Maybe<Scalars['DateTime']>;
  isArrived?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
};

export enum TaxTypeEnum {
  Inclusive = 'INCLUSIVE',
  Exclusive = 'EXCLUSIVE',
}

export type TaxesFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  type?: Maybe<TaxTypeEnum>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type TaxesInput = {
  type: TaxTypeEnum;
  name: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
  decimal: Scalars['Float'];
};

export type TaxesType = {
  __typename?: 'TaxesType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  type: Scalars['String'];
  name: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
  decimal: Scalars['Float'];
  status?: Maybe<Scalars['String']>;
};

export type TaxesUpdate = {
  id: Scalars['ID'];
  type?: Maybe<TaxTypeEnum>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  decimal?: Maybe<Scalars['Float']>;
  status?: Maybe<StatusEnum>;
};

export type TimeFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type TimeInput = {
  otherId: Scalars['String'];
  name: Scalars['String'];
  startedTime?: Maybe<Scalars['String']>;
  endedTime: Scalars['String'];
  releasedTime: Scalars['String'];
  status?: Maybe<StatusEnum>;
  nameType: NameType;
  nameTypes: Array<NameType>;
};

export type TimeType = {
  __typename?: 'TimeType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  startedTime?: Maybe<Scalars['String']>;
  endedTime: Scalars['String'];
  releasedTime: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  nameType: NameTypes;
  nameTypes: Array<NameTypes>;
};

export type TimeUpdate = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  startedTime?: Maybe<Scalars['String']>;
  endedTime?: Maybe<Scalars['String']>;
  releasedTime?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
};

export type TransactionType = {
  __typename?: 'TransactionType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  receiptNo: Scalars['Int'];
  orderId: Scalars['ID'];
  order?: Maybe<OrderType>;
  userId?: Maybe<Scalars['ID']>;
  user?: Maybe<CustomerType>;
  taxId?: Maybe<Scalars['ID']>;
  tax?: Maybe<TaxesType>;
  discountId?: Maybe<Scalars['ID']>;
  discount?: Maybe<DiscountType>;
  currencyCode?: Maybe<Scalars['String']>;
  paymentMethod: Scalars['String'];
  totalAmount: Scalars['Float'];
  vatAmount: Scalars['Float'];
  discountAmount: Scalars['Float'];
  subAmount: Scalars['Float'];
  receivedAmount?: Maybe<Array<PaymentReceivedType>>;
  exchangedRateAmount?: Maybe<Array<ExchangedRateAmountType>>;
  paymentStatus?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

export type Vendor = {
  __typename?: 'Vendor';
  id: Scalars['ID'];
  companyId: Scalars['String'];
  company?: Maybe<CompanyType>;
};

export type VendorCompanyInput = {
  nameKh: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
  profile: CompanyDetailInput;
  branches?: Maybe<Array<CompanyBranchInput>>;
};

export type VendorFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  mobileNumber?: Maybe<Scalars['String']>;
};

export type VendorInput = {
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: GenderEnum;
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  mobileDetail: MobileDetailInput;
  companyProfile: VendorCompanyInput;
};

export type VendorRegisterInput = {
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: GenderEnum;
  dob: Scalars['DateTime'];
  email: Scalars['String'];
  mobileDetail: MobileDetailInput;
  companyProfile?: Maybe<CompanyProfileInput>;
};

export type VendorType = {
  __typename?: 'VendorType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  mobileDetail?: Maybe<MobileDetails>;
  vendors: Array<Maybe<Vendor>>;
  accessKey: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};

export type VendorUpdate = {
  avatar?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<GenderEnum>;
  dob?: Maybe<Scalars['DateTime']>;
  mobileDetail?: Maybe<MobileDetailInput>;
  status?: Maybe<StatusEnum>;
};

export type VerifyAccountInput = {
  verifyCode?: Maybe<Scalars['Int']>;
  verifyUrl?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type VillageFilter = {
  status?: Maybe<Array<StatusEnum>>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  provinceId?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['String']>;
  communeId?: Maybe<Scalars['String']>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
};

export type VillageSuggestedFilter = {
  provinceId?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['String']>;
  communeId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type VillageType = {
  __typename?: 'VillageType';
  createdBy?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  uId: Scalars['String'];
  provinceId: Scalars['String'];
  province?: Maybe<ProvinceType>;
  districtId: Scalars['String'];
  district?: Maybe<DistrictType>;
  communeId: Scalars['String'];
  commune?: Maybe<CommuneType>;
  nameKh?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type VillageUpdate = {
  id: Scalars['ID'];
  nameKh: Scalars['String'];
  nameEn: Scalars['String'];
  status?: Maybe<StatusEnum>;
};
