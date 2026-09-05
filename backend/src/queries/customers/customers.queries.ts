/** Types generated for queries found in "src/queries/customers/customers.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'CreateCustomer' parameters type */
export interface ICreateCustomerParams {
  contact_number?: string | null | void;
  customer_address?: string | null | void;
  customer_id?: string | null | void;
  customer_name?: string | null | void;
  email_address?: string | null | void;
  social_media?: string | null | void;
  visit_count?: number | null | void;
}

/** 'CreateCustomer' return type */
export type ICreateCustomerResult = void;

/** 'CreateCustomer' query type */
export interface ICreateCustomerQuery {
  params: ICreateCustomerParams;
  result: ICreateCustomerResult;
}

const createCustomerIR: any = {"usedParamSet":{"customer_id":true,"customer_name":true,"customer_address":true,"social_media":true,"contact_number":true,"email_address":true,"visit_count":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":139,"b":150}]},{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":153,"b":166}]},{"name":"customer_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":169,"b":185}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":188,"b":200}]},{"name":"contact_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":203,"b":217}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":220,"b":233}]},{"name":"visit_count","required":false,"transform":{"type":"scalar"},"locs":[{"a":236,"b":247}]}],"statement":"INSERT INTO bph_customers (customer_id, customer_name, customer_address, social_media, contact_number, email_address, visit_count)\nVALUES (:customer_id, :customer_name, :customer_address, :social_media, :contact_number, :email_address, :visit_count)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_customers (customer_id, customer_name, customer_address, social_media, contact_number, email_address, visit_count)
 * VALUES (:customer_id, :customer_name, :customer_address, :social_media, :contact_number, :email_address, :visit_count)
 * ```
 */
export const createCustomer = new PreparedQuery<ICreateCustomerParams,ICreateCustomerResult>(createCustomerIR);


/** 'GetAllCustomers' parameters type */
export type IGetAllCustomersParams = void;

/** 'GetAllCustomers' return type */
export interface IGetAllCustomersResult {
  contact_number: string | null;
  customer_address: string | null;
  customer_id: string;
  customer_name: string;
  email_address: string | null;
  social_media: string | null;
  visit_count: number | null;
}

/** 'GetAllCustomers' query type */
export interface IGetAllCustomersQuery {
  params: IGetAllCustomersParams;
  result: IGetAllCustomersResult;
}

const getAllCustomersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_customers ORDER BY customer_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_customers ORDER BY customer_name
 * ```
 */
export const getAllCustomers = new PreparedQuery<IGetAllCustomersParams,IGetAllCustomersResult>(getAllCustomersIR);


/** 'GetCustomerById' parameters type */
export interface IGetCustomerByIdParams {
  customer_id?: string | null | void;
}

/** 'GetCustomerById' return type */
export interface IGetCustomerByIdResult {
  contact_number: string | null;
  customer_address: string | null;
  customer_id: string;
  customer_name: string;
  email_address: string | null;
  social_media: string | null;
  visit_count: number | null;
}

/** 'GetCustomerById' query type */
export interface IGetCustomerByIdQuery {
  params: IGetCustomerByIdParams;
  result: IGetCustomerByIdResult;
}

const getCustomerByIdIR: any = {"usedParamSet":{"customer_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":59}]}],"statement":"SELECT * FROM bph_customers WHERE customer_id = :customer_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_customers WHERE customer_id = :customer_id
 * ```
 */
export const getCustomerById = new PreparedQuery<IGetCustomerByIdParams,IGetCustomerByIdResult>(getCustomerByIdIR);


/** 'GetCustomersByName' parameters type */
export interface IGetCustomersByNameParams {
  customer_name?: string | null | void;
}

/** 'GetCustomersByName' return type */
export interface IGetCustomersByNameResult {
  contact_number: string | null;
  customer_address: string | null;
  customer_id: string;
  customer_name: string;
  email_address: string | null;
  social_media: string | null;
  visit_count: number | null;
}

/** 'GetCustomersByName' query type */
export interface IGetCustomersByNameQuery {
  params: IGetCustomersByNameParams;
  result: IGetCustomersByNameResult;
}

const getCustomersByNameIR: any = {"usedParamSet":{"customer_name":true},"params":[{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":67}]}],"statement":"SELECT * FROM bph_customers WHERE customer_name ILIKE :customer_name ORDER BY customer_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_customers WHERE customer_name ILIKE :customer_name ORDER BY customer_name
 * ```
 */
export const getCustomersByName = new PreparedQuery<IGetCustomersByNameParams,IGetCustomersByNameResult>(getCustomersByNameIR);


/** 'GetTopCustomers' parameters type */
export interface IGetTopCustomersParams {
  limit?: NumberOrString | null | void;
}

/** 'GetTopCustomers' return type */
export interface IGetTopCustomersResult {
  contact_number: string | null;
  customer_address: string | null;
  customer_id: string;
  customer_name: string;
  email_address: string | null;
  social_media: string | null;
  visit_count: number | null;
}

/** 'GetTopCustomers' query type */
export interface IGetTopCustomersQuery {
  params: IGetTopCustomersParams;
  result: IGetTopCustomersResult;
}

const getTopCustomersIR: any = {"usedParamSet":{"limit":true},"params":[{"name":"limit","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":65}]}],"statement":"SELECT * FROM bph_customers ORDER BY visit_count DESC LIMIT :limit"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_customers ORDER BY visit_count DESC LIMIT :limit
 * ```
 */
export const getTopCustomers = new PreparedQuery<IGetTopCustomersParams,IGetTopCustomersResult>(getTopCustomersIR);


/** 'UpdateCustomer' parameters type */
export interface IUpdateCustomerParams {
  contact_number?: string | null | void;
  customer_address?: string | null | void;
  customer_id?: string | null | void;
  customer_name?: string | null | void;
  email_address?: string | null | void;
  social_media?: string | null | void;
  visit_count?: number | null | void;
}

/** 'UpdateCustomer' return type */
export type IUpdateCustomerResult = void;

/** 'UpdateCustomer' query type */
export interface IUpdateCustomerQuery {
  params: IUpdateCustomerParams;
  result: IUpdateCustomerResult;
}

const updateCustomerIR: any = {"usedParamSet":{"customer_name":true,"customer_address":true,"social_media":true,"contact_number":true,"email_address":true,"visit_count":true,"customer_id":true},"params":[{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":55}]},{"name":"customer_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":81,"b":97}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":119,"b":131}]},{"name":"contact_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":155,"b":169}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":192,"b":205}]},{"name":"visit_count","required":false,"transform":{"type":"scalar"},"locs":[{"a":226,"b":237}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":259,"b":270}]}],"statement":"UPDATE bph_customers \nSET customer_name = :customer_name,\n    customer_address = :customer_address,\n    social_media = :social_media,\n    contact_number = :contact_number,\n    email_address = :email_address,\n    visit_count = :visit_count\nWHERE customer_id = :customer_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_customers 
 * SET customer_name = :customer_name,
 *     customer_address = :customer_address,
 *     social_media = :social_media,
 *     contact_number = :contact_number,
 *     email_address = :email_address,
 *     visit_count = :visit_count
 * WHERE customer_id = :customer_id
 * ```
 */
export const updateCustomer = new PreparedQuery<IUpdateCustomerParams,IUpdateCustomerResult>(updateCustomerIR);


/** 'IncrementCustomerVisitCount' parameters type */
export interface IIncrementCustomerVisitCountParams {
  customer_id?: string | null | void;
}

/** 'IncrementCustomerVisitCount' return type */
export type IIncrementCustomerVisitCountResult = void;

/** 'IncrementCustomerVisitCount' query type */
export interface IIncrementCustomerVisitCountQuery {
  params: IIncrementCustomerVisitCountParams;
  result: IIncrementCustomerVisitCountResult;
}

const incrementCustomerVisitCountIR: any = {"usedParamSet":{"customer_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":89,"b":100}]}],"statement":"UPDATE bph_customers \nSET visit_count = COALESCE(visit_count, 0) + 1\nWHERE customer_id = :customer_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_customers 
 * SET visit_count = COALESCE(visit_count, 0) + 1
 * WHERE customer_id = :customer_id
 * ```
 */
export const incrementCustomerVisitCount = new PreparedQuery<IIncrementCustomerVisitCountParams,IIncrementCustomerVisitCountResult>(incrementCustomerVisitCountIR);


/** 'DeleteCustomer' parameters type */
export interface IDeleteCustomerParams {
  customer_id?: string | null | void;
}

/** 'DeleteCustomer' return type */
export type IDeleteCustomerResult = void;

/** 'DeleteCustomer' query type */
export interface IDeleteCustomerQuery {
  params: IDeleteCustomerParams;
  result: IDeleteCustomerResult;
}

const deleteCustomerIR: any = {"usedParamSet":{"customer_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":57}]}],"statement":"DELETE FROM bph_customers WHERE customer_id = :customer_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_customers WHERE customer_id = :customer_id
 * ```
 */
export const deleteCustomer = new PreparedQuery<IDeleteCustomerParams,IDeleteCustomerResult>(deleteCustomerIR);


