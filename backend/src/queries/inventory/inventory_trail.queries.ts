/** Types generated for queries found in "src/queries/inventory/inventory_trail.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'CreateInventoryTrail' parameters type */
export interface ICreateInventoryTrailParams {
  additional_notes?: string | null | void;
  category?: string | null | void;
  created_date?: DateOrString | null | void;
  id?: string | null | void;
  movement_type?: string | null | void;
  product_id?: string | null | void;
  product_name?: string | null | void;
  quantity?: NumberOrString | null | void;
  quantity_price?: NumberOrString | null | void;
  stock_size?: NumberOrString | null | void;
  stock_size_uom?: string | null | void;
  unit_cost?: NumberOrString | null | void;
  unit_price?: NumberOrString | null | void;
}

/** 'CreateInventoryTrail' return type */
export type ICreateInventoryTrailResult = void;

/** 'CreateInventoryTrail' query type */
export interface ICreateInventoryTrailQuery {
  params: ICreateInventoryTrailParams;
  result: ICreateInventoryTrailResult;
}

const createInventoryTrailIR: any = {"usedParamSet":{"id":true,"product_id":true,"category":true,"product_name":true,"movement_type":true,"created_date":true,"quantity":true,"quantity_price":true,"stock_size":true,"stock_size_uom":true,"unit_price":true,"unit_cost":true,"additional_notes":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":205,"b":207}]},{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":210,"b":220}]},{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":223,"b":231}]},{"name":"product_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":234,"b":246}]},{"name":"movement_type","required":false,"transform":{"type":"scalar"},"locs":[{"a":249,"b":262}]},{"name":"created_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":265,"b":277}]},{"name":"quantity","required":false,"transform":{"type":"scalar"},"locs":[{"a":280,"b":288}]},{"name":"quantity_price","required":false,"transform":{"type":"scalar"},"locs":[{"a":291,"b":305}]},{"name":"stock_size","required":false,"transform":{"type":"scalar"},"locs":[{"a":308,"b":318}]},{"name":"stock_size_uom","required":false,"transform":{"type":"scalar"},"locs":[{"a":321,"b":335}]},{"name":"unit_price","required":false,"transform":{"type":"scalar"},"locs":[{"a":338,"b":348}]},{"name":"unit_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":351,"b":360}]},{"name":"additional_notes","required":false,"transform":{"type":"scalar"},"locs":[{"a":363,"b":379}]}],"statement":"INSERT INTO bph_inventory_trail (id, product_id, category, product_name, movement_type, created_date, quantity, quantity_price, stock_size, stock_size_uom, unit_price, unit_cost, additional_notes)\nVALUES (:id, :product_id, :category, :product_name, :movement_type, :created_date, :quantity, :quantity_price, :stock_size, :stock_size_uom, :unit_price, :unit_cost, :additional_notes)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_inventory_trail (id, product_id, category, product_name, movement_type, created_date, quantity, quantity_price, stock_size, stock_size_uom, unit_price, unit_cost, additional_notes)
 * VALUES (:id, :product_id, :category, :product_name, :movement_type, :created_date, :quantity, :quantity_price, :stock_size, :stock_size_uom, :unit_price, :unit_cost, :additional_notes)
 * ```
 */
export const createInventoryTrail = new PreparedQuery<ICreateInventoryTrailParams,ICreateInventoryTrailResult>(createInventoryTrailIR);


/** 'GetAllInventoryTrail' parameters type */
export type IGetAllInventoryTrailParams = void;

/** 'GetAllInventoryTrail' return type */
export interface IGetAllInventoryTrailResult {
  additional_notes: string | null;
  category: string | null;
  created_date: Date;
  id: string;
  movement_type: string;
  product_id: string;
  product_name: string;
  quantity: string | null;
  quantity_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  unit_cost: string | null;
  unit_price: string | null;
}

/** 'GetAllInventoryTrail' query type */
export interface IGetAllInventoryTrailQuery {
  params: IGetAllInventoryTrailParams;
  result: IGetAllInventoryTrailResult;
}

const getAllInventoryTrailIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_inventory_trail ORDER BY created_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory_trail ORDER BY created_date DESC
 * ```
 */
export const getAllInventoryTrail = new PreparedQuery<IGetAllInventoryTrailParams,IGetAllInventoryTrailResult>(getAllInventoryTrailIR);


/** 'GetInventoryTrailById' parameters type */
export interface IGetInventoryTrailByIdParams {
  id?: string | null | void;
}

/** 'GetInventoryTrailById' return type */
export interface IGetInventoryTrailByIdResult {
  additional_notes: string | null;
  category: string | null;
  created_date: Date;
  id: string;
  movement_type: string;
  product_id: string;
  product_name: string;
  quantity: string | null;
  quantity_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  unit_cost: string | null;
  unit_price: string | null;
}

/** 'GetInventoryTrailById' query type */
export interface IGetInventoryTrailByIdQuery {
  params: IGetInventoryTrailByIdParams;
  result: IGetInventoryTrailByIdResult;
}

const getInventoryTrailByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":47}]}],"statement":"SELECT * FROM bph_inventory_trail WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory_trail WHERE id = :id
 * ```
 */
export const getInventoryTrailById = new PreparedQuery<IGetInventoryTrailByIdParams,IGetInventoryTrailByIdResult>(getInventoryTrailByIdIR);


/** 'GetInventoryTrailByProductId' parameters type */
export interface IGetInventoryTrailByProductIdParams {
  product_id?: string | null | void;
}

/** 'GetInventoryTrailByProductId' return type */
export interface IGetInventoryTrailByProductIdResult {
  additional_notes: string | null;
  category: string | null;
  created_date: Date;
  id: string;
  movement_type: string;
  product_id: string;
  product_name: string;
  quantity: string | null;
  quantity_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  unit_cost: string | null;
  unit_price: string | null;
}

/** 'GetInventoryTrailByProductId' query type */
export interface IGetInventoryTrailByProductIdQuery {
  params: IGetInventoryTrailByProductIdParams;
  result: IGetInventoryTrailByProductIdResult;
}

const getInventoryTrailByProductIdIR: any = {"usedParamSet":{"product_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":63}]}],"statement":"SELECT * FROM bph_inventory_trail WHERE product_id = :product_id ORDER BY created_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory_trail WHERE product_id = :product_id ORDER BY created_date DESC
 * ```
 */
export const getInventoryTrailByProductId = new PreparedQuery<IGetInventoryTrailByProductIdParams,IGetInventoryTrailByProductIdResult>(getInventoryTrailByProductIdIR);


/** 'GetInventoryTrailByMovementType' parameters type */
export interface IGetInventoryTrailByMovementTypeParams {
  movement_type?: string | null | void;
}

/** 'GetInventoryTrailByMovementType' return type */
export interface IGetInventoryTrailByMovementTypeResult {
  additional_notes: string | null;
  category: string | null;
  created_date: Date;
  id: string;
  movement_type: string;
  product_id: string;
  product_name: string;
  quantity: string | null;
  quantity_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  unit_cost: string | null;
  unit_price: string | null;
}

/** 'GetInventoryTrailByMovementType' query type */
export interface IGetInventoryTrailByMovementTypeQuery {
  params: IGetInventoryTrailByMovementTypeParams;
  result: IGetInventoryTrailByMovementTypeResult;
}

const getInventoryTrailByMovementTypeIR: any = {"usedParamSet":{"movement_type":true},"params":[{"name":"movement_type","required":false,"transform":{"type":"scalar"},"locs":[{"a":56,"b":69}]}],"statement":"SELECT * FROM bph_inventory_trail WHERE movement_type = :movement_type ORDER BY created_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory_trail WHERE movement_type = :movement_type ORDER BY created_date DESC
 * ```
 */
export const getInventoryTrailByMovementType = new PreparedQuery<IGetInventoryTrailByMovementTypeParams,IGetInventoryTrailByMovementTypeResult>(getInventoryTrailByMovementTypeIR);


/** 'GetInventoryTrailByDateRange' parameters type */
export interface IGetInventoryTrailByDateRangeParams {
  end_date?: DateOrString | null | void;
  start_date?: DateOrString | null | void;
}

/** 'GetInventoryTrailByDateRange' return type */
export interface IGetInventoryTrailByDateRangeResult {
  additional_notes: string | null;
  category: string | null;
  created_date: Date;
  id: string;
  movement_type: string;
  product_id: string;
  product_name: string;
  quantity: string | null;
  quantity_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  unit_cost: string | null;
  unit_price: string | null;
}

/** 'GetInventoryTrailByDateRange' query type */
export interface IGetInventoryTrailByDateRangeQuery {
  params: IGetInventoryTrailByDateRangeParams;
  result: IGetInventoryTrailByDateRangeResult;
}

const getInventoryTrailByDateRangeIR: any = {"usedParamSet":{"start_date":true,"end_date":true},"params":[{"name":"start_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":71}]},{"name":"end_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":77,"b":85}]}],"statement":"SELECT * FROM bph_inventory_trail WHERE created_date BETWEEN :start_date AND :end_date ORDER BY created_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory_trail WHERE created_date BETWEEN :start_date AND :end_date ORDER BY created_date DESC
 * ```
 */
export const getInventoryTrailByDateRange = new PreparedQuery<IGetInventoryTrailByDateRangeParams,IGetInventoryTrailByDateRangeResult>(getInventoryTrailByDateRangeIR);


/** 'UpdateInventoryTrail' parameters type */
export interface IUpdateInventoryTrailParams {
  additional_notes?: string | null | void;
  category?: string | null | void;
  created_date?: DateOrString | null | void;
  id?: string | null | void;
  movement_type?: string | null | void;
  product_id?: string | null | void;
  product_name?: string | null | void;
  quantity?: NumberOrString | null | void;
  quantity_price?: NumberOrString | null | void;
  stock_size?: NumberOrString | null | void;
  stock_size_uom?: string | null | void;
  unit_cost?: NumberOrString | null | void;
  unit_price?: NumberOrString | null | void;
}

/** 'UpdateInventoryTrail' return type */
export type IUpdateInventoryTrailResult = void;

/** 'UpdateInventoryTrail' query type */
export interface IUpdateInventoryTrailQuery {
  params: IUpdateInventoryTrailParams;
  result: IUpdateInventoryTrailResult;
}

const updateInventoryTrailIR: any = {"usedParamSet":{"product_id":true,"category":true,"product_name":true,"movement_type":true,"created_date":true,"quantity":true,"quantity_price":true,"stock_size":true,"stock_size_uom":true,"unit_price":true,"unit_cost":true,"additional_notes":true,"id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":55}]},{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":73,"b":81}]},{"name":"product_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":103,"b":115}]},{"name":"movement_type","required":false,"transform":{"type":"scalar"},"locs":[{"a":138,"b":151}]},{"name":"created_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":173,"b":185}]},{"name":"quantity","required":false,"transform":{"type":"scalar"},"locs":[{"a":203,"b":211}]},{"name":"quantity_price","required":false,"transform":{"type":"scalar"},"locs":[{"a":235,"b":249}]},{"name":"stock_size","required":false,"transform":{"type":"scalar"},"locs":[{"a":269,"b":279}]},{"name":"stock_size_uom","required":false,"transform":{"type":"scalar"},"locs":[{"a":303,"b":317}]},{"name":"unit_price","required":false,"transform":{"type":"scalar"},"locs":[{"a":337,"b":347}]},{"name":"unit_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":366,"b":375}]},{"name":"additional_notes","required":false,"transform":{"type":"scalar"},"locs":[{"a":401,"b":417}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":430,"b":432}]}],"statement":"UPDATE bph_inventory_trail \nSET product_id = :product_id,\n    category = :category,\n    product_name = :product_name,\n    movement_type = :movement_type,\n    created_date = :created_date,\n    quantity = :quantity,\n    quantity_price = :quantity_price,\n    stock_size = :stock_size,\n    stock_size_uom = :stock_size_uom,\n    unit_price = :unit_price,\n    unit_cost = :unit_cost,\n    additional_notes = :additional_notes\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_inventory_trail 
 * SET product_id = :product_id,
 *     category = :category,
 *     product_name = :product_name,
 *     movement_type = :movement_type,
 *     created_date = :created_date,
 *     quantity = :quantity,
 *     quantity_price = :quantity_price,
 *     stock_size = :stock_size,
 *     stock_size_uom = :stock_size_uom,
 *     unit_price = :unit_price,
 *     unit_cost = :unit_cost,
 *     additional_notes = :additional_notes
 * WHERE id = :id
 * ```
 */
export const updateInventoryTrail = new PreparedQuery<IUpdateInventoryTrailParams,IUpdateInventoryTrailResult>(updateInventoryTrailIR);


/** 'DeleteInventoryTrail' parameters type */
export interface IDeleteInventoryTrailParams {
  id?: string | null | void;
}

/** 'DeleteInventoryTrail' return type */
export type IDeleteInventoryTrailResult = void;

/** 'DeleteInventoryTrail' query type */
export interface IDeleteInventoryTrailQuery {
  params: IDeleteInventoryTrailParams;
  result: IDeleteInventoryTrailResult;
}

const deleteInventoryTrailIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":43,"b":45}]}],"statement":"DELETE FROM bph_inventory_trail WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_inventory_trail WHERE id = :id
 * ```
 */
export const deleteInventoryTrail = new PreparedQuery<IDeleteInventoryTrailParams,IDeleteInventoryTrailResult>(deleteInventoryTrailIR);


