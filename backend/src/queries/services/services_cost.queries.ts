/** Types generated for queries found in "src/queries/services/services_cost.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateServiceCost' parameters type */
export interface ICreateServiceCostParams {
  cost_category?: string | null | void;
  cost_id?: string | null | void;
  item_number?: string | null | void;
  service_code?: string | null | void;
}

/** 'CreateServiceCost' return type */
export type ICreateServiceCostResult = void;

/** 'CreateServiceCost' query type */
export interface ICreateServiceCostQuery {
  params: ICreateServiceCostParams;
  result: ICreateServiceCostResult;
}

const createServiceCostIR: any = {"usedParamSet":{"service_code":true,"item_number":true,"cost_category":true,"cost_id":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":90,"b":102}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":105,"b":116}]},{"name":"cost_category","required":false,"transform":{"type":"scalar"},"locs":[{"a":119,"b":132}]},{"name":"cost_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":135,"b":142}]}],"statement":"INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id)\nVALUES (:service_code, :item_number, :cost_category, :cost_id)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id)
 * VALUES (:service_code, :item_number, :cost_category, :cost_id)
 * ```
 */
export const createServiceCost = new PreparedQuery<ICreateServiceCostParams,ICreateServiceCostResult>(createServiceCostIR);


/** 'GetAllServicesCost' parameters type */
export type IGetAllServicesCostParams = void;

/** 'GetAllServicesCost' return type */
export interface IGetAllServicesCostResult {
  cost_category: string;
  cost_id: string;
  item_number: string;
  service_code: string;
}

/** 'GetAllServicesCost' query type */
export interface IGetAllServicesCostQuery {
  params: IGetAllServicesCostParams;
  result: IGetAllServicesCostResult;
}

const getAllServicesCostIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_services_cost ORDER BY service_code"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_services_cost ORDER BY service_code
 * ```
 */
export const getAllServicesCost = new PreparedQuery<IGetAllServicesCostParams,IGetAllServicesCostResult>(getAllServicesCostIR);


/** 'GetServiceCostByServiceCode' parameters type */
export interface IGetServiceCostByServiceCodeParams {
  service_code?: string | null | void;
}

/** 'GetServiceCostByServiceCode' return type */
export interface IGetServiceCostByServiceCodeResult {
  cost_category: string;
  cost_id: string;
  item_number: string;
  service_code: string;
}

/** 'GetServiceCostByServiceCode' query type */
export interface IGetServiceCostByServiceCodeQuery {
  params: IGetServiceCostByServiceCodeParams;
  result: IGetServiceCostByServiceCodeResult;
}

const getServiceCostByServiceCodeIR: any = {"usedParamSet":{"service_code":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":65}]}],"statement":"SELECT * FROM bph_services_cost WHERE service_code = :service_code"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_services_cost WHERE service_code = :service_code
 * ```
 */
export const getServiceCostByServiceCode = new PreparedQuery<IGetServiceCostByServiceCodeParams,IGetServiceCostByServiceCodeResult>(getServiceCostByServiceCodeIR);


/** 'GetServiceCostByCostId' parameters type */
export interface IGetServiceCostByCostIdParams {
  cost_id?: string | null | void;
}

/** 'GetServiceCostByCostId' return type */
export interface IGetServiceCostByCostIdResult {
  cost_category: string;
  cost_id: string;
  item_number: string;
  service_code: string;
}

/** 'GetServiceCostByCostId' query type */
export interface IGetServiceCostByCostIdQuery {
  params: IGetServiceCostByCostIdParams;
  result: IGetServiceCostByCostIdResult;
}

const getServiceCostByCostIdIR: any = {"usedParamSet":{"cost_id":true},"params":[{"name":"cost_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":55}]}],"statement":"SELECT * FROM bph_services_cost WHERE cost_id = :cost_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_services_cost WHERE cost_id = :cost_id
 * ```
 */
export const getServiceCostByCostId = new PreparedQuery<IGetServiceCostByCostIdParams,IGetServiceCostByCostIdResult>(getServiceCostByCostIdIR);


/** 'UpdateServiceCost' parameters type */
export interface IUpdateServiceCostParams {
  cost_category?: string | null | void;
  cost_id?: string | null | void;
  item_number?: string | null | void;
  service_code?: string | null | void;
}

/** 'UpdateServiceCost' return type */
export type IUpdateServiceCostResult = void;

/** 'UpdateServiceCost' query type */
export interface IUpdateServiceCostQuery {
  params: IUpdateServiceCostParams;
  result: IUpdateServiceCostResult;
}

const updateServiceCostIR: any = {"usedParamSet":{"cost_category":true,"cost_id":true,"service_code":true,"item_number":true},"params":[{"name":"cost_category","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":59}]},{"name":"cost_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":83}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":106,"b":118}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":138,"b":149}]}],"statement":"UPDATE bph_services_cost \nSET cost_category = :cost_category,\n    cost_id = :cost_id\nWHERE service_code = :service_code AND item_number = :item_number"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_services_cost 
 * SET cost_category = :cost_category,
 *     cost_id = :cost_id
 * WHERE service_code = :service_code AND item_number = :item_number
 * ```
 */
export const updateServiceCost = new PreparedQuery<IUpdateServiceCostParams,IUpdateServiceCostResult>(updateServiceCostIR);


/** 'DeleteServiceCost' parameters type */
export interface IDeleteServiceCostParams {
  item_number?: string | null | void;
  service_code?: string | null | void;
}

/** 'DeleteServiceCost' return type */
export type IDeleteServiceCostResult = void;

/** 'DeleteServiceCost' query type */
export interface IDeleteServiceCostQuery {
  params: IDeleteServiceCostParams;
  result: IDeleteServiceCostResult;
}

const deleteServiceCostIR: any = {"usedParamSet":{"service_code":true,"item_number":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":63}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":83,"b":94}]}],"statement":"DELETE FROM bph_services_cost WHERE service_code = :service_code AND item_number = :item_number"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_services_cost WHERE service_code = :service_code AND item_number = :item_number
 * ```
 */
export const deleteServiceCost = new PreparedQuery<IDeleteServiceCostParams,IDeleteServiceCostResult>(deleteServiceCostIR);


/** 'DeleteServiceCostByServiceCode' parameters type */
export interface IDeleteServiceCostByServiceCodeParams {
  service_code?: string | null | void;
}

/** 'DeleteServiceCostByServiceCode' return type */
export type IDeleteServiceCostByServiceCodeResult = void;

/** 'DeleteServiceCostByServiceCode' query type */
export interface IDeleteServiceCostByServiceCodeQuery {
  params: IDeleteServiceCostByServiceCodeParams;
  result: IDeleteServiceCostByServiceCodeResult;
}

const deleteServiceCostByServiceCodeIR: any = {"usedParamSet":{"service_code":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":63}]}],"statement":"DELETE FROM bph_services_cost WHERE service_code = :service_code"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_services_cost WHERE service_code = :service_code
 * ```
 */
export const deleteServiceCostByServiceCode = new PreparedQuery<IDeleteServiceCostByServiceCodeParams,IDeleteServiceCostByServiceCodeResult>(deleteServiceCostByServiceCodeIR);


