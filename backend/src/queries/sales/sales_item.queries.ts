/** Types generated for queries found in "src/queries/sales/sales_item.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'CreateSaleItem' parameters type */
export interface ICreateSaleItemParams {
  amount?: NumberOrString | null | void;
  barber_id?: string | null | void;
  item_number?: string | null | void;
  service_code?: string | null | void;
  transaction_id?: string | null | void;
}

/** 'CreateSaleItem' return type */
export interface ICreateSaleItemResult {
  amount: string;
  barber_id: string;
  item_number: string;
  service_code: string;
  transaction_id: string;
}

/** 'CreateSaleItem' query type */
export interface ICreateSaleItemQuery {
  params: ICreateSaleItemParams;
  result: ICreateSaleItemResult;
}

const createSaleItemIR: any = {"usedParamSet":{"transaction_id":true,"item_number":true,"service_code":true,"barber_id":true,"amount":true},"params":[{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":103,"b":117}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":125,"b":136}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":144,"b":156},{"a":261,"b":273}]},{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":164,"b":173}]},{"name":"amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":190,"b":196}]}],"statement":"INSERT INTO bph_sales_item (transaction_id, item_number, service_code, barber_id, amount)\nVALUES (\n    :transaction_id, \n    :item_number, \n    :service_code, \n    :barber_id, \n    COALESCE(:amount, (SELECT service_amount FROM bph_services WHERE service_code = :service_code))\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_sales_item (transaction_id, item_number, service_code, barber_id, amount)
 * VALUES (
 *     :transaction_id, 
 *     :item_number, 
 *     :service_code, 
 *     :barber_id, 
 *     COALESCE(:amount, (SELECT service_amount FROM bph_services WHERE service_code = :service_code))
 * )
 * RETURNING *
 * ```
 */
export const createSaleItem = new PreparedQuery<ICreateSaleItemParams,ICreateSaleItemResult>(createSaleItemIR);


/** 'GetSaleItemsByTransactionId' parameters type */
export interface IGetSaleItemsByTransactionIdParams {
  transaction_id?: string | null | void;
}

/** 'GetSaleItemsByTransactionId' return type */
export interface IGetSaleItemsByTransactionIdResult {
  amount: string;
  barber_id: string;
  item_number: string;
  service_code: string;
  transaction_id: string;
}

/** 'GetSaleItemsByTransactionId' query type */
export interface IGetSaleItemsByTransactionIdQuery {
  params: IGetSaleItemsByTransactionIdParams;
  result: IGetSaleItemsByTransactionIdResult;
}

const getSaleItemsByTransactionIdIR: any = {"usedParamSet":{"transaction_id":true},"params":[{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":52,"b":66}]}],"statement":"SELECT * FROM bph_sales_item WHERE transaction_id = :transaction_id ORDER BY item_number"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales_item WHERE transaction_id = :transaction_id ORDER BY item_number
 * ```
 */
export const getSaleItemsByTransactionId = new PreparedQuery<IGetSaleItemsByTransactionIdParams,IGetSaleItemsByTransactionIdResult>(getSaleItemsByTransactionIdIR);


/** 'GetSaleItemsByBarber' parameters type */
export interface IGetSaleItemsByBarberParams {
  barber_id?: string | null | void;
}

/** 'GetSaleItemsByBarber' return type */
export interface IGetSaleItemsByBarberResult {
  amount: string;
  barber_id: string;
  item_number: string;
  service_code: string;
  transaction_id: string;
}

/** 'GetSaleItemsByBarber' query type */
export interface IGetSaleItemsByBarberQuery {
  params: IGetSaleItemsByBarberParams;
  result: IGetSaleItemsByBarberResult;
}

const getSaleItemsByBarberIR: any = {"usedParamSet":{"barber_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":56}]}],"statement":"SELECT * FROM bph_sales_item WHERE barber_id = :barber_id ORDER BY transaction_id, item_number"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales_item WHERE barber_id = :barber_id ORDER BY transaction_id, item_number
 * ```
 */
export const getSaleItemsByBarber = new PreparedQuery<IGetSaleItemsByBarberParams,IGetSaleItemsByBarberResult>(getSaleItemsByBarberIR);


/** 'UpdateSaleItem' parameters type */
export interface IUpdateSaleItemParams {
  amount?: NumberOrString | null | void;
  barber_id?: string | null | void;
  item_number?: string | null | void;
  service_code?: string | null | void;
  transaction_id?: string | null | void;
}

/** 'UpdateSaleItem' return type */
export interface IUpdateSaleItemResult {
  amount: string;
  barber_id: string;
  item_number: string;
  service_code: string;
  transaction_id: string;
}

/** 'UpdateSaleItem' query type */
export interface IUpdateSaleItemQuery {
  params: IUpdateSaleItemParams;
  result: IUpdateSaleItemResult;
}

const updateSaleItemIR: any = {"usedParamSet":{"service_code":true,"barber_id":true,"amount":true,"transaction_id":true,"item_number":true},"params":[{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":54},{"a":178,"b":190}]},{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":73,"b":82}]},{"name":"amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":107,"b":113}]},{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":217,"b":231}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":251,"b":262}]}],"statement":"UPDATE bph_sales_item \nSET service_code = :service_code,\n    barber_id = :barber_id,\n    amount = COALESCE(:amount, (SELECT service_amount FROM bph_services WHERE service_code = :service_code))\nWHERE transaction_id = :transaction_id AND item_number = :item_number\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_sales_item 
 * SET service_code = :service_code,
 *     barber_id = :barber_id,
 *     amount = COALESCE(:amount, (SELECT service_amount FROM bph_services WHERE service_code = :service_code))
 * WHERE transaction_id = :transaction_id AND item_number = :item_number
 * RETURNING *
 * ```
 */
export const updateSaleItem = new PreparedQuery<IUpdateSaleItemParams,IUpdateSaleItemResult>(updateSaleItemIR);


/** 'DeleteSaleItem' parameters type */
export interface IDeleteSaleItemParams {
  item_number?: string | null | void;
  transaction_id?: string | null | void;
}

/** 'DeleteSaleItem' return type */
export interface IDeleteSaleItemResult {
  amount: string;
  barber_id: string;
  item_number: string;
  service_code: string;
  transaction_id: string;
}

/** 'DeleteSaleItem' query type */
export interface IDeleteSaleItemQuery {
  params: IDeleteSaleItemParams;
  result: IDeleteSaleItemResult;
}

const deleteSaleItemIR: any = {"usedParamSet":{"transaction_id":true,"item_number":true},"params":[{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":64}]},{"name":"item_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":95}]}],"statement":"DELETE FROM bph_sales_item WHERE transaction_id = :transaction_id AND item_number = :item_number\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_sales_item WHERE transaction_id = :transaction_id AND item_number = :item_number
 * RETURNING *
 * ```
 */
export const deleteSaleItem = new PreparedQuery<IDeleteSaleItemParams,IDeleteSaleItemResult>(deleteSaleItemIR);


