/** Types generated for queries found in "src/queries/services/services_cost.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateServiceCost' parameters type */
export interface ICreateServiceCostParams {
  cost_category?: string | null | void;
  cost_id?: string | null | void;
  item_number?: string | null | void;
  multiplier?: number | null | void;
  service_code?: string | null | void;
}

/** 'CreateServiceCost' return type */
export interface ICreateServiceCostResult {
  cost_category: string;
  cost_id: string;
  item_number: string;
  multiplier: number | null;
  service_code: string;
}

/** 'CreateServiceCost' query type */
export interface ICreateServiceCostQuery {
  params: ICreateServiceCostParams;
  result: ICreateServiceCostResult;
}

const createServiceCostIR: any = {"usedParamSet":{"service_code":true,"item_number":true,"cost_category":true,"cost_id":true,"multiplier":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":102,"b":114}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":117,"b":128}]},{"name":"cost_category","required":false,"transform":{"type":"scalar"},"locs":[{"a":140,"b":153}]},{"name":"cost_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":168,"b":175}]},{"name":"multiplier","required":false,"transform":{"type":"scalar"},"locs":[{"a":178,"b":188}]}],"statement":"INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id, multiplier)\nVALUES (:service_code, :item_number, COALESCE(:cost_category, 'Product'), :cost_id, :multiplier)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id, multiplier)
 * VALUES (:service_code, :item_number, COALESCE(:cost_category, 'Product'), :cost_id, :multiplier)
 * RETURNING *
 * ```
 */
export const createServiceCost = new PreparedQuery<ICreateServiceCostParams,ICreateServiceCostResult>(createServiceCostIR);


/** 'GetAllServicesCost' parameters type */
export type IGetAllServicesCostParams = void;

/** 'GetAllServicesCost' return type */
export interface IGetAllServicesCostResult {
  cost_amount: string | null;
  cost_category: string;
  cost_id: string;
  description: string;
  item_number: string;
  minimum_qty: string | null;
  multiplier: number | null;
  service_code: string;
  unit_cost: string | null;
}

/** 'GetAllServicesCost' query type */
export interface IGetAllServicesCostQuery {
  params: IGetAllServicesCostParams;
  result: IGetAllServicesCostResult;
}

const getAllServicesCostIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT sc.*,\n    i.product_name AS description,\n    i.unit_cost,\n    i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,\n    i.miniumum_stock AS minimum_qty\nFROM bph_services_cost sc\nJOIN bph_inventory i ON i.product_id = sc.cost_id\nORDER BY sc.service_code, sc.item_number"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sc.*,
 *     i.product_name AS description,
 *     i.unit_cost,
 *     i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,
 *     i.miniumum_stock AS minimum_qty
 * FROM bph_services_cost sc
 * JOIN bph_inventory i ON i.product_id = sc.cost_id
 * ORDER BY sc.service_code, sc.item_number
 * ```
 */
export const getAllServicesCost = new PreparedQuery<IGetAllServicesCostParams,IGetAllServicesCostResult>(getAllServicesCostIR);


/** 'GetServiceCostByServiceCode' parameters type */
export interface IGetServiceCostByServiceCodeParams {
  service_code?: string | null | void;
}

/** 'GetServiceCostByServiceCode' return type */
export interface IGetServiceCostByServiceCodeResult {
  cost_amount: string | null;
  cost_category: string;
  cost_id: string;
  description: string;
  item_number: string;
  minimum_qty: string | null;
  multiplier: number | null;
  service_code: string;
  unit_cost: string | null;
}

/** 'GetServiceCostByServiceCode' query type */
export interface IGetServiceCostByServiceCodeQuery {
  params: IGetServiceCostByServiceCodeParams;
  result: IGetServiceCostByServiceCodeResult;
}

const getServiceCostByServiceCodeIR: any = {"usedParamSet":{"service_code":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":262,"b":274}]}],"statement":"SELECT sc.*,\n    i.product_name AS description,\n    i.unit_cost,\n    i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,\n    i.miniumum_stock AS minimum_qty\nFROM bph_services_cost sc\nJOIN bph_inventory i ON i.product_id = sc.cost_id\nWHERE sc.service_code = :service_code\nORDER BY sc.item_number"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sc.*,
 *     i.product_name AS description,
 *     i.unit_cost,
 *     i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,
 *     i.miniumum_stock AS minimum_qty
 * FROM bph_services_cost sc
 * JOIN bph_inventory i ON i.product_id = sc.cost_id
 * WHERE sc.service_code = :service_code
 * ORDER BY sc.item_number
 * ```
 */
export const getServiceCostByServiceCode = new PreparedQuery<IGetServiceCostByServiceCodeParams,IGetServiceCostByServiceCodeResult>(getServiceCostByServiceCodeIR);


/** 'GetServiceCostByCostId' parameters type */
export interface IGetServiceCostByCostIdParams {
  cost_id?: string | null | void;
}

/** 'GetServiceCostByCostId' return type */
export interface IGetServiceCostByCostIdResult {
  cost_amount: string | null;
  cost_category: string;
  cost_id: string;
  description: string;
  item_number: string;
  minimum_qty: string | null;
  multiplier: number | null;
  service_code: string;
  unit_cost: string | null;
}

/** 'GetServiceCostByCostId' query type */
export interface IGetServiceCostByCostIdQuery {
  params: IGetServiceCostByCostIdParams;
  result: IGetServiceCostByCostIdResult;
}

const getServiceCostByCostIdIR: any = {"usedParamSet":{"cost_id":true},"params":[{"name":"cost_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":257,"b":264}]}],"statement":"SELECT sc.*,\n    i.product_name AS description,\n    i.unit_cost,\n    i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,\n    i.miniumum_stock AS minimum_qty\nFROM bph_services_cost sc\nJOIN bph_inventory i ON i.product_id = sc.cost_id\nWHERE sc.cost_id = :cost_id\nORDER BY sc.service_code, sc.item_number"};

/**
 * Query generated from SQL:
 * ```
 * SELECT sc.*,
 *     i.product_name AS description,
 *     i.unit_cost,
 *     i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,
 *     i.miniumum_stock AS minimum_qty
 * FROM bph_services_cost sc
 * JOIN bph_inventory i ON i.product_id = sc.cost_id
 * WHERE sc.cost_id = :cost_id
 * ORDER BY sc.service_code, sc.item_number
 * ```
 */
export const getServiceCostByCostId = new PreparedQuery<IGetServiceCostByCostIdParams,IGetServiceCostByCostIdResult>(getServiceCostByCostIdIR);


/** 'UpdateServiceCost' parameters type */
export interface IUpdateServiceCostParams {
  cost_category?: string | null | void;
  cost_id?: string | null | void;
  item_number?: string | null | void;
  multiplier?: number | null | void;
  service_code?: string | null | void;
}

/** 'UpdateServiceCost' return type */
export interface IUpdateServiceCostResult {
  cost_category: string;
  cost_id: string;
  item_number: string;
  multiplier: number | null;
  service_code: string;
}

/** 'UpdateServiceCost' query type */
export interface IUpdateServiceCostQuery {
  params: IUpdateServiceCostParams;
  result: IUpdateServiceCostResult;
}

const updateServiceCostIR: any = {"usedParamSet":{"cost_category":true,"multiplier":true,"service_code":true,"item_number":true,"cost_id":true},"params":[{"name":"cost_category","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":68}]},{"name":"multiplier","required":false,"transform":{"type":"scalar"},"locs":[{"a":100,"b":110}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":133,"b":145}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":165,"b":176}]},{"name":"cost_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":192,"b":199}]}],"statement":"UPDATE bph_services_cost \nSET cost_category = COALESCE(:cost_category, 'Product'),\n    multiplier = :multiplier\nWHERE service_code = :service_code AND item_number = :item_number AND cost_id = :cost_id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_services_cost 
 * SET cost_category = COALESCE(:cost_category, 'Product'),
 *     multiplier = :multiplier
 * WHERE service_code = :service_code AND item_number = :item_number AND cost_id = :cost_id
 * RETURNING *
 * ```
 */
export const updateServiceCost = new PreparedQuery<IUpdateServiceCostParams,IUpdateServiceCostResult>(updateServiceCostIR);


/** 'DeleteServiceCost' parameters type */
export interface IDeleteServiceCostParams {
  cost_id?: string | null | void;
  item_number?: string | null | void;
  service_code?: string | null | void;
}

/** 'DeleteServiceCost' return type */
export interface IDeleteServiceCostResult {
  cost_category: string;
  cost_id: string;
  item_number: string;
  multiplier: number | null;
  service_code: string;
}

/** 'DeleteServiceCost' query type */
export interface IDeleteServiceCostQuery {
  params: IDeleteServiceCostParams;
  result: IDeleteServiceCostResult;
}

const deleteServiceCostIR: any = {"usedParamSet":{"service_code":true,"item_number":true,"cost_id":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":52,"b":64}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":95}]},{"name":"cost_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":111,"b":118}]}],"statement":"DELETE FROM bph_services_cost \nWHERE service_code = :service_code AND item_number = :item_number AND cost_id = :cost_id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_services_cost 
 * WHERE service_code = :service_code AND item_number = :item_number AND cost_id = :cost_id
 * RETURNING *
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


