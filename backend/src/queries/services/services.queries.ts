/** Types generated for queries found in "src/queries/services/services.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'CreateService' parameters type */
export interface ICreateServiceParams {
  category?: string | null | void;
  cluster?: string | null | void;
  icon?: Buffer | null | void;
  is_promo?: boolean | null | void;
  service_amount?: NumberOrString | null | void;
  service_code?: string | null | void;
  service_description?: string | null | void;
  service_name?: string | null | void;
}

/** 'CreateService' return type */
export type ICreateServiceResult = void;

/** 'CreateService' query type */
export interface ICreateServiceQuery {
  params: ICreateServiceParams;
  result: ICreateServiceResult;
}

const createServiceIR: any = {"usedParamSet":{"service_code":true,"category":true,"cluster":true,"service_name":true,"service_description":true,"service_amount":true,"icon":true,"is_promo":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":134,"b":146}]},{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":149,"b":157}]},{"name":"cluster","required":false,"transform":{"type":"scalar"},"locs":[{"a":160,"b":167}]},{"name":"service_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":170,"b":182}]},{"name":"service_description","required":false,"transform":{"type":"scalar"},"locs":[{"a":185,"b":204}]},{"name":"service_amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":207,"b":221}]},{"name":"icon","required":false,"transform":{"type":"scalar"},"locs":[{"a":224,"b":228}]},{"name":"is_promo","required":false,"transform":{"type":"scalar"},"locs":[{"a":231,"b":239}]}],"statement":"INSERT INTO bph_services (service_code, category, cluster, service_name, service_description, service_amount, icon, is_promo)\nVALUES (:service_code, :category, :cluster, :service_name, :service_description, :service_amount, :icon, :is_promo)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_services (service_code, category, cluster, service_name, service_description, service_amount, icon, is_promo)
 * VALUES (:service_code, :category, :cluster, :service_name, :service_description, :service_amount, :icon, :is_promo)
 * ```
 */
export const createService = new PreparedQuery<ICreateServiceParams,ICreateServiceResult>(createServiceIR);


/** 'GetAllServices' parameters type */
export type IGetAllServicesParams = void;

/** 'GetAllServices' return type */
export interface IGetAllServicesResult {
  category: string | null;
  cluster: string | null;
  icon: Buffer | null;
  is_promo: boolean;
  service_amount: string;
  service_code: string;
  service_description: string | null;
  service_name: string;
}

/** 'GetAllServices' query type */
export interface IGetAllServicesQuery {
  params: IGetAllServicesParams;
  result: IGetAllServicesResult;
}

const getAllServicesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_services ORDER BY service_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_services ORDER BY service_name
 * ```
 */
export const getAllServices = new PreparedQuery<IGetAllServicesParams,IGetAllServicesResult>(getAllServicesIR);


/** 'GetServiceByCode' parameters type */
export interface IGetServiceByCodeParams {
  service_code?: string | null | void;
}

/** 'GetServiceByCode' return type */
export interface IGetServiceByCodeResult {
  category: string | null;
  cluster: string | null;
  icon: Buffer | null;
  is_promo: boolean;
  service_amount: string;
  service_code: string;
  service_description: string | null;
  service_name: string;
}

/** 'GetServiceByCode' query type */
export interface IGetServiceByCodeQuery {
  params: IGetServiceByCodeParams;
  result: IGetServiceByCodeResult;
}

const getServiceByCodeIR: any = {"usedParamSet":{"service_code":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":60}]}],"statement":"SELECT * FROM bph_services WHERE service_code = :service_code"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_services WHERE service_code = :service_code
 * ```
 */
export const getServiceByCode = new PreparedQuery<IGetServiceByCodeParams,IGetServiceByCodeResult>(getServiceByCodeIR);


/** 'GetServicesByCategory' parameters type */
export interface IGetServicesByCategoryParams {
  category?: string | null | void;
}

/** 'GetServicesByCategory' return type */
export interface IGetServicesByCategoryResult {
  category: string | null;
  cluster: string | null;
  icon: Buffer | null;
  is_promo: boolean;
  service_amount: string;
  service_code: string;
  service_description: string | null;
  service_name: string;
}

/** 'GetServicesByCategory' query type */
export interface IGetServicesByCategoryQuery {
  params: IGetServicesByCategoryParams;
  result: IGetServicesByCategoryResult;
}

const getServicesByCategoryIR: any = {"usedParamSet":{"category":true},"params":[{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":44,"b":52}]}],"statement":"SELECT * FROM bph_services WHERE category = :category ORDER BY service_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_services WHERE category = :category ORDER BY service_name
 * ```
 */
export const getServicesByCategory = new PreparedQuery<IGetServicesByCategoryParams,IGetServicesByCategoryResult>(getServicesByCategoryIR);


/** 'GetPromoServices' parameters type */
export type IGetPromoServicesParams = void;

/** 'GetPromoServices' return type */
export interface IGetPromoServicesResult {
  category: string | null;
  cluster: string | null;
  icon: Buffer | null;
  is_promo: boolean;
  service_amount: string;
  service_code: string;
  service_description: string | null;
  service_name: string;
}

/** 'GetPromoServices' query type */
export interface IGetPromoServicesQuery {
  params: IGetPromoServicesParams;
  result: IGetPromoServicesResult;
}

const getPromoServicesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_services WHERE is_promo = true ORDER BY service_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_services WHERE is_promo = true ORDER BY service_name
 * ```
 */
export const getPromoServices = new PreparedQuery<IGetPromoServicesParams,IGetPromoServicesResult>(getPromoServicesIR);


/** 'UpdateService' parameters type */
export interface IUpdateServiceParams {
  category?: string | null | void;
  cluster?: string | null | void;
  icon?: Buffer | null | void;
  is_promo?: boolean | null | void;
  service_amount?: NumberOrString | null | void;
  service_code?: string | null | void;
  service_description?: string | null | void;
  service_name?: string | null | void;
}

/** 'UpdateService' return type */
export type IUpdateServiceResult = void;

/** 'UpdateService' query type */
export interface IUpdateServiceQuery {
  params: IUpdateServiceParams;
  result: IUpdateServiceResult;
}

const updateServiceIR: any = {"usedParamSet":{"category":true,"cluster":true,"service_name":true,"service_description":true,"service_amount":true,"icon":true,"is_promo":true,"service_code":true},"params":[{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":36,"b":44}]},{"name":"cluster","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":68}]},{"name":"service_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":90,"b":102}]},{"name":"service_description","required":false,"transform":{"type":"scalar"},"locs":[{"a":131,"b":150}]},{"name":"service_amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":174,"b":188}]},{"name":"icon","required":false,"transform":{"type":"scalar"},"locs":[{"a":202,"b":206}]},{"name":"is_promo","required":false,"transform":{"type":"scalar"},"locs":[{"a":224,"b":232}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":255,"b":267}]}],"statement":"UPDATE bph_services \nSET category = :category,\n    cluster = :cluster,\n    service_name = :service_name,\n    service_description = :service_description,\n    service_amount = :service_amount,\n    icon = :icon,\n    is_promo = :is_promo\nWHERE service_code = :service_code"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_services 
 * SET category = :category,
 *     cluster = :cluster,
 *     service_name = :service_name,
 *     service_description = :service_description,
 *     service_amount = :service_amount,
 *     icon = :icon,
 *     is_promo = :is_promo
 * WHERE service_code = :service_code
 * ```
 */
export const updateService = new PreparedQuery<IUpdateServiceParams,IUpdateServiceResult>(updateServiceIR);


/** 'DeleteService' parameters type */
export interface IDeleteServiceParams {
  service_code?: string | null | void;
}

/** 'DeleteService' return type */
export type IDeleteServiceResult = void;

/** 'DeleteService' query type */
export interface IDeleteServiceQuery {
  params: IDeleteServiceParams;
  result: IDeleteServiceResult;
}

const deleteServiceIR: any = {"usedParamSet":{"service_code":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":58}]}],"statement":"DELETE FROM bph_services WHERE service_code = :service_code"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_services WHERE service_code = :service_code
 * ```
 */
export const deleteService = new PreparedQuery<IDeleteServiceParams,IDeleteServiceResult>(deleteServiceIR);


