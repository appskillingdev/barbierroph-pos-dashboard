/** Types generated for queries found in "src/queries/inventory/inventory_category.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateInventoryCategory' parameters type */
export interface ICreateInventoryCategoryParams {
  category_description?: string | null | void;
  category_id?: string | null | void;
}

/** 'CreateInventoryCategory' return type */
export type ICreateInventoryCategoryResult = void;

/** 'CreateInventoryCategory' query type */
export interface ICreateInventoryCategoryQuery {
  params: ICreateInventoryCategoryParams;
  result: ICreateInventoryCategoryResult;
}

const createInventoryCategoryIR: any = {"usedParamSet":{"category_id":true,"category_description":true},"params":[{"name":"category_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":79,"b":90}]},{"name":"category_description","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":113}]}],"statement":"INSERT INTO bph_inventory_category (category_id, category_description)\nVALUES (:category_id, :category_description)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_inventory_category (category_id, category_description)
 * VALUES (:category_id, :category_description)
 * ```
 */
export const createInventoryCategory = new PreparedQuery<ICreateInventoryCategoryParams,ICreateInventoryCategoryResult>(createInventoryCategoryIR);


/** 'GetAllInventoryCategories' parameters type */
export type IGetAllInventoryCategoriesParams = void;

/** 'GetAllInventoryCategories' return type */
export interface IGetAllInventoryCategoriesResult {
  category_description: string;
  category_id: string;
}

/** 'GetAllInventoryCategories' query type */
export interface IGetAllInventoryCategoriesQuery {
  params: IGetAllInventoryCategoriesParams;
  result: IGetAllInventoryCategoriesResult;
}

const getAllInventoryCategoriesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_inventory_category ORDER BY category_description"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory_category ORDER BY category_description
 * ```
 */
export const getAllInventoryCategories = new PreparedQuery<IGetAllInventoryCategoriesParams,IGetAllInventoryCategoriesResult>(getAllInventoryCategoriesIR);


/** 'GetInventoryCategoryById' parameters type */
export interface IGetInventoryCategoryByIdParams {
  category_id?: string | null | void;
}

/** 'GetInventoryCategoryById' return type */
export interface IGetInventoryCategoryByIdResult {
  category_description: string;
  category_id: string;
}

/** 'GetInventoryCategoryById' query type */
export interface IGetInventoryCategoryByIdQuery {
  params: IGetInventoryCategoryByIdParams;
  result: IGetInventoryCategoryByIdResult;
}

const getInventoryCategoryByIdIR: any = {"usedParamSet":{"category_id":true},"params":[{"name":"category_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":68}]}],"statement":"SELECT * FROM bph_inventory_category WHERE category_id = :category_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_inventory_category WHERE category_id = :category_id
 * ```
 */
export const getInventoryCategoryById = new PreparedQuery<IGetInventoryCategoryByIdParams,IGetInventoryCategoryByIdResult>(getInventoryCategoryByIdIR);


/** 'UpdateInventoryCategory' parameters type */
export interface IUpdateInventoryCategoryParams {
  category_description?: string | null | void;
  category_id?: string | null | void;
}

/** 'UpdateInventoryCategory' return type */
export type IUpdateInventoryCategoryResult = void;

/** 'UpdateInventoryCategory' query type */
export interface IUpdateInventoryCategoryQuery {
  params: IUpdateInventoryCategoryParams;
  result: IUpdateInventoryCategoryResult;
}

const updateInventoryCategoryIR: any = {"usedParamSet":{"category_description":true,"category_id":true},"params":[{"name":"category_description","required":false,"transform":{"type":"scalar"},"locs":[{"a":58,"b":78}]},{"name":"category_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":100,"b":111}]}],"statement":"UPDATE bph_inventory_category \nSET category_description = :category_description\nWHERE category_id = :category_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_inventory_category 
 * SET category_description = :category_description
 * WHERE category_id = :category_id
 * ```
 */
export const updateInventoryCategory = new PreparedQuery<IUpdateInventoryCategoryParams,IUpdateInventoryCategoryResult>(updateInventoryCategoryIR);


/** 'DeleteInventoryCategory' parameters type */
export interface IDeleteInventoryCategoryParams {
  category_id?: string | null | void;
}

/** 'DeleteInventoryCategory' return type */
export type IDeleteInventoryCategoryResult = void;

/** 'DeleteInventoryCategory' query type */
export interface IDeleteInventoryCategoryQuery {
  params: IDeleteInventoryCategoryParams;
  result: IDeleteInventoryCategoryResult;
}

const deleteInventoryCategoryIR: any = {"usedParamSet":{"category_id":true},"params":[{"name":"category_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":66}]}],"statement":"DELETE FROM bph_inventory_category WHERE category_id = :category_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_inventory_category WHERE category_id = :category_id
 * ```
 */
export const deleteInventoryCategory = new PreparedQuery<IDeleteInventoryCategoryParams,IDeleteInventoryCategoryResult>(deleteInventoryCategoryIR);


