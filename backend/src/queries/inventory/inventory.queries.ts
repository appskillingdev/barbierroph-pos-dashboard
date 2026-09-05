/** Types generated for queries found in "src/queries/inventory/inventory.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'CreateInventoryItem' parameters type */
export interface ICreateInventoryItemParams {
  category?: string | null | void;
  initial_stock?: NumberOrString | null | void;
  miniumum_stock?: NumberOrString | null | void;
  other_cost?: NumberOrString | null | void;
  other_discounts?: NumberOrString | null | void;
  product_id?: string | null | void;
  product_image?: string | null | void;
  product_name?: string | null | void;
  stock_cost?: NumberOrString | null | void;
  stock_price?: NumberOrString | null | void;
  stock_size?: NumberOrString | null | void;
  stock_size_uom?: string | null | void;
  stock_usage?: NumberOrString | null | void;
  stock_usage_uom?: string | null | void;
  stock_yields?: NumberOrString | null | void;
  unit_cost?: NumberOrString | null | void;
}

/** 'CreateInventoryItem' return type */
export type ICreateInventoryItemResult = void;

/** 'CreateInventoryItem' query type */
export interface ICreateInventoryItemQuery {
  params: ICreateInventoryItemParams;
  result: ICreateInventoryItemResult;
}

const createInventoryItemIR: any = {"usedParamSet":{"product_id":true,"category":true,"product_name":true,"product_image":true,"stock_price":true,"miniumum_stock":true,"initial_stock":true,"unit_cost":true,"stock_size":true,"stock_size_uom":true,"stock_usage":true,"stock_usage_uom":true,"stock_yields":true,"stock_cost":true,"other_cost":true,"other_discounts":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":254,"b":264}]},{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":267,"b":275}]},{"name":"product_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":278,"b":290}]},{"name":"product_image","required":false,"transform":{"type":"scalar"},"locs":[{"a":293,"b":306}]},{"name":"stock_price","required":false,"transform":{"type":"scalar"},"locs":[{"a":309,"b":320}]},{"name":"miniumum_stock","required":false,"transform":{"type":"scalar"},"locs":[{"a":323,"b":337}]},{"name":"initial_stock","required":false,"transform":{"type":"scalar"},"locs":[{"a":340,"b":353}]},{"name":"unit_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":356,"b":365}]},{"name":"stock_size","required":false,"transform":{"type":"scalar"},"locs":[{"a":368,"b":378}]},{"name":"stock_size_uom","required":false,"transform":{"type":"scalar"},"locs":[{"a":381,"b":395}]},{"name":"stock_usage","required":false,"transform":{"type":"scalar"},"locs":[{"a":398,"b":409}]},{"name":"stock_usage_uom","required":false,"transform":{"type":"scalar"},"locs":[{"a":412,"b":427}]},{"name":"stock_yields","required":false,"transform":{"type":"scalar"},"locs":[{"a":430,"b":442}]},{"name":"stock_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":445,"b":455}]},{"name":"other_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":458,"b":468}]},{"name":"other_discounts","required":false,"transform":{"type":"scalar"},"locs":[{"a":471,"b":486}]}],"statement":"INSERT INTO bph_inventory (product_id, category, product_name, product_image, stock_price, miniumum_stock, initial_stock, unit_cost, stock_size, stock_size_uom, stock_usage, stock_usage_uom, stock_yields, stock_cost, other_cost, other_discounts)\nVALUES (:product_id, :category, :product_name, :product_image, :stock_price, :miniumum_stock, :initial_stock, :unit_cost, :stock_size, :stock_size_uom, :stock_usage, :stock_usage_uom, :stock_yields, :stock_cost, :other_cost, :other_discounts)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_inventory (product_id, category, product_name, product_image, stock_price, miniumum_stock, initial_stock, unit_cost, stock_size, stock_size_uom, stock_usage, stock_usage_uom, stock_yields, stock_cost, other_cost, other_discounts)
 * VALUES (:product_id, :category, :product_name, :product_image, :stock_price, :miniumum_stock, :initial_stock, :unit_cost, :stock_size, :stock_size_uom, :stock_usage, :stock_usage_uom, :stock_yields, :stock_cost, :other_cost, :other_discounts)
 * ```
 */
export const createInventoryItem = new PreparedQuery<ICreateInventoryItemParams,ICreateInventoryItemResult>(createInventoryItemIR);


/** 'GetAllInventoryItems' parameters type */
export type IGetAllInventoryItemsParams = void;

/** 'GetAllInventoryItems' return type */
export interface IGetAllInventoryItemsResult {
  category: string | null;
  initial_stock: string | null;
  miniumum_stock: string | null;
  other_cost: string | null;
  other_discounts: string | null;
  product_id: string;
  product_image: string | null;
  product_name: string;
  stock_cost: string | null;
  stock_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  stock_usage: string | null;
  stock_usage_uom: string | null;
  stock_yields: string | null;
  unit_cost: string | null;
}

/** 'GetAllInventoryItems' query type */
export interface IGetAllInventoryItemsQuery {
  params: IGetAllInventoryItemsParams;
  result: IGetAllInventoryItemsResult;
}

const getAllInventoryItemsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_inventory ORDER BY product_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory ORDER BY product_name
 * ```
 */
export const getAllInventoryItems = new PreparedQuery<IGetAllInventoryItemsParams,IGetAllInventoryItemsResult>(getAllInventoryItemsIR);


/** 'GetInventoryItemById' parameters type */
export interface IGetInventoryItemByIdParams {
  product_id?: string | null | void;
}

/** 'GetInventoryItemById' return type */
export interface IGetInventoryItemByIdResult {
  category: string | null;
  initial_stock: string | null;
  miniumum_stock: string | null;
  other_cost: string | null;
  other_discounts: string | null;
  product_id: string;
  product_image: string | null;
  product_name: string;
  stock_cost: string | null;
  stock_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  stock_usage: string | null;
  stock_usage_uom: string | null;
  stock_yields: string | null;
  unit_cost: string | null;
}

/** 'GetInventoryItemById' query type */
export interface IGetInventoryItemByIdQuery {
  params: IGetInventoryItemByIdParams;
  result: IGetInventoryItemByIdResult;
}

const getInventoryItemByIdIR: any = {"usedParamSet":{"product_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":57}]}],"statement":"SELECT * FROM bph_inventory WHERE product_id = :product_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory WHERE product_id = :product_id
 * ```
 */
export const getInventoryItemById = new PreparedQuery<IGetInventoryItemByIdParams,IGetInventoryItemByIdResult>(getInventoryItemByIdIR);


/** 'GetInventoryItemsByCategory' parameters type */
export interface IGetInventoryItemsByCategoryParams {
  category?: string | null | void;
}

/** 'GetInventoryItemsByCategory' return type */
export interface IGetInventoryItemsByCategoryResult {
  category: string | null;
  initial_stock: string | null;
  miniumum_stock: string | null;
  other_cost: string | null;
  other_discounts: string | null;
  product_id: string;
  product_image: string | null;
  product_name: string;
  stock_cost: string | null;
  stock_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  stock_usage: string | null;
  stock_usage_uom: string | null;
  stock_yields: string | null;
  unit_cost: string | null;
}

/** 'GetInventoryItemsByCategory' query type */
export interface IGetInventoryItemsByCategoryQuery {
  params: IGetInventoryItemsByCategoryParams;
  result: IGetInventoryItemsByCategoryResult;
}

const getInventoryItemsByCategoryIR: any = {"usedParamSet":{"category":true},"params":[{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":53}]}],"statement":"SELECT * FROM bph_inventory WHERE category = :category ORDER BY product_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory WHERE category = :category ORDER BY product_name
 * ```
 */
export const getInventoryItemsByCategory = new PreparedQuery<IGetInventoryItemsByCategoryParams,IGetInventoryItemsByCategoryResult>(getInventoryItemsByCategoryIR);


/** 'GetLowStockItems' parameters type */
export type IGetLowStockItemsParams = void;

/** 'GetLowStockItems' return type */
export interface IGetLowStockItemsResult {
  category: string | null;
  initial_stock: string | null;
  miniumum_stock: string | null;
  other_cost: string | null;
  other_discounts: string | null;
  product_id: string;
  product_image: string | null;
  product_name: string;
  stock_cost: string | null;
  stock_price: string | null;
  stock_size: string | null;
  stock_size_uom: string | null;
  stock_usage: string | null;
  stock_usage_uom: string | null;
  stock_yields: string | null;
  unit_cost: string | null;
}

/** 'GetLowStockItems' query type */
export interface IGetLowStockItemsQuery {
  params: IGetLowStockItemsParams;
  result: IGetLowStockItemsResult;
}

const getLowStockItemsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_inventory WHERE initial_stock <= miniumum_stock ORDER BY product_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory WHERE initial_stock <= miniumum_stock ORDER BY product_name
 * ```
 */
export const getLowStockItems = new PreparedQuery<IGetLowStockItemsParams,IGetLowStockItemsResult>(getLowStockItemsIR);


/** 'UpdateInventoryItem' parameters type */
export interface IUpdateInventoryItemParams {
  category?: string | null | void;
  initial_stock?: NumberOrString | null | void;
  miniumum_stock?: NumberOrString | null | void;
  other_cost?: NumberOrString | null | void;
  other_discounts?: NumberOrString | null | void;
  product_id?: string | null | void;
  product_image?: string | null | void;
  product_name?: string | null | void;
  stock_cost?: NumberOrString | null | void;
  stock_price?: NumberOrString | null | void;
  stock_size?: NumberOrString | null | void;
  stock_size_uom?: string | null | void;
  stock_usage?: NumberOrString | null | void;
  stock_usage_uom?: string | null | void;
  stock_yields?: NumberOrString | null | void;
  unit_cost?: NumberOrString | null | void;
}

/** 'UpdateInventoryItem' return type */
export type IUpdateInventoryItemResult = void;

/** 'UpdateInventoryItem' query type */
export interface IUpdateInventoryItemQuery {
  params: IUpdateInventoryItemParams;
  result: IUpdateInventoryItemResult;
}

const updateInventoryItemIR: any = {"usedParamSet":{"category":true,"product_name":true,"product_image":true,"stock_price":true,"miniumum_stock":true,"initial_stock":true,"unit_cost":true,"stock_size":true,"stock_size_uom":true,"stock_usage":true,"stock_usage_uom":true,"stock_yields":true,"stock_cost":true,"other_cost":true,"other_discounts":true,"product_id":true},"params":[{"name":"category","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":45}]},{"name":"product_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":79}]},{"name":"product_image","required":false,"transform":{"type":"scalar"},"locs":[{"a":102,"b":115}]},{"name":"stock_price","required":false,"transform":{"type":"scalar"},"locs":[{"a":136,"b":147}]},{"name":"miniumum_stock","required":false,"transform":{"type":"scalar"},"locs":[{"a":171,"b":185}]},{"name":"initial_stock","required":false,"transform":{"type":"scalar"},"locs":[{"a":208,"b":221}]},{"name":"unit_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":240,"b":249}]},{"name":"stock_size","required":false,"transform":{"type":"scalar"},"locs":[{"a":269,"b":279}]},{"name":"stock_size_uom","required":false,"transform":{"type":"scalar"},"locs":[{"a":303,"b":317}]},{"name":"stock_usage","required":false,"transform":{"type":"scalar"},"locs":[{"a":338,"b":349}]},{"name":"stock_usage_uom","required":false,"transform":{"type":"scalar"},"locs":[{"a":374,"b":389}]},{"name":"stock_yields","required":false,"transform":{"type":"scalar"},"locs":[{"a":411,"b":423}]},{"name":"stock_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":443,"b":453}]},{"name":"other_cost","required":false,"transform":{"type":"scalar"},"locs":[{"a":473,"b":483}]},{"name":"other_discounts","required":false,"transform":{"type":"scalar"},"locs":[{"a":508,"b":523}]},{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":544,"b":554}]}],"statement":"UPDATE bph_inventory \nSET category = :category,\n    product_name = :product_name,\n    product_image = :product_image,\n    stock_price = :stock_price,\n    miniumum_stock = :miniumum_stock,\n    initial_stock = :initial_stock,\n    unit_cost = :unit_cost,\n    stock_size = :stock_size,\n    stock_size_uom = :stock_size_uom,\n    stock_usage = :stock_usage,\n    stock_usage_uom = :stock_usage_uom,\n    stock_yields = :stock_yields,\n    stock_cost = :stock_cost,\n    other_cost = :other_cost,\n    other_discounts = :other_discounts\nWHERE product_id = :product_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_inventory 
 * SET category = :category,
 *     product_name = :product_name,
 *     product_image = :product_image,
 *     stock_price = :stock_price,
 *     miniumum_stock = :miniumum_stock,
 *     initial_stock = :initial_stock,
 *     unit_cost = :unit_cost,
 *     stock_size = :stock_size,
 *     stock_size_uom = :stock_size_uom,
 *     stock_usage = :stock_usage,
 *     stock_usage_uom = :stock_usage_uom,
 *     stock_yields = :stock_yields,
 *     stock_cost = :stock_cost,
 *     other_cost = :other_cost,
 *     other_discounts = :other_discounts
 * WHERE product_id = :product_id
 * ```
 */
export const updateInventoryItem = new PreparedQuery<IUpdateInventoryItemParams,IUpdateInventoryItemResult>(updateInventoryItemIR);


/** 'UpdateInventoryStock' parameters type */
export interface IUpdateInventoryStockParams {
  initial_stock?: NumberOrString | null | void;
  product_id?: string | null | void;
}

/** 'UpdateInventoryStock' return type */
export type IUpdateInventoryStockResult = void;

/** 'UpdateInventoryStock' query type */
export interface IUpdateInventoryStockQuery {
  params: IUpdateInventoryStockParams;
  result: IUpdateInventoryStockResult;
}

const updateInventoryStockIR: any = {"usedParamSet":{"initial_stock":true,"product_id":true},"params":[{"name":"initial_stock","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":55}]},{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":86}]}],"statement":"UPDATE bph_inventory \nSET initial_stock = :initial_stock\nWHERE product_id = :product_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_inventory 
 * SET initial_stock = :initial_stock
 * WHERE product_id = :product_id
 * ```
 */
export const updateInventoryStock = new PreparedQuery<IUpdateInventoryStockParams,IUpdateInventoryStockResult>(updateInventoryStockIR);


/** 'DeleteInventoryItem' parameters type */
export interface IDeleteInventoryItemParams {
  product_id?: string | null | void;
}

/** 'DeleteInventoryItem' return type */
export type IDeleteInventoryItemResult = void;

/** 'DeleteInventoryItem' query type */
export interface IDeleteInventoryItemQuery {
  params: IDeleteInventoryItemParams;
  result: IDeleteInventoryItemResult;
}

const deleteInventoryItemIR: any = {"usedParamSet":{"product_id":true},"params":[{"name":"product_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":55}]}],"statement":"DELETE FROM bph_inventory WHERE product_id = :product_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_inventory WHERE product_id = :product_id
 * ```
 */
export const deleteInventoryItem = new PreparedQuery<IDeleteInventoryItemParams,IDeleteInventoryItemResult>(deleteInventoryItemIR);


