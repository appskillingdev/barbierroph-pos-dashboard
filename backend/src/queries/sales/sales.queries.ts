/** Types generated for queries found in "src/queries/sales/sales.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'CreateSale' parameters type */
export interface ICreateSaleParams {
  barber_id?: string | null | void;
  branch_id?: string | null | void;
  count_1?: number | null | void;
  count_10?: number | null | void;
  count_100?: number | null | void;
  count_1000?: number | null | void;
  count_20?: number | null | void;
  count_200?: number | null | void;
  count_5?: number | null | void;
  count_50?: number | null | void;
  count_500?: number | null | void;
  created_by?: string | null | void;
  customer_id?: string | null | void;
  payment_method?: string | null | void;
  reference_no?: string | null | void;
  service_code?: string | null | void;
  total_amount?: NumberOrString | null | void;
  transaction_date?: DateOrString | null | void;
  transaction_id?: string | null | void;
}

/** 'CreateSale' return type */
export type ICreateSaleResult = void;

/** 'CreateSale' query type */
export interface ICreateSaleQuery {
  params: ICreateSaleParams;
  result: ICreateSaleResult;
}

const createSaleIR: any = {"usedParamSet":{"transaction_id":true,"transaction_date":true,"customer_id":true,"branch_id":true,"barber_id":true,"service_code":true,"total_amount":true,"payment_method":true,"reference_no":true,"count_1":true,"count_5":true,"count_10":true,"count_20":true,"count_50":true,"count_100":true,"count_200":true,"count_500":true,"count_1000":true,"created_by":true},"params":[{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":364,"b":378}]},{"name":"transaction_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":386,"b":402}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":410,"b":421}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":429,"b":438}]},{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":446,"b":455}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":463,"b":475}]},{"name":"total_amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":483,"b":495}]},{"name":"payment_method","required":false,"transform":{"type":"scalar"},"locs":[{"a":503,"b":517}]},{"name":"reference_no","required":false,"transform":{"type":"scalar"},"locs":[{"a":525,"b":537}]},{"name":"count_1","required":false,"transform":{"type":"scalar"},"locs":[{"a":545,"b":552}]},{"name":"count_5","required":false,"transform":{"type":"scalar"},"locs":[{"a":560,"b":567}]},{"name":"count_10","required":false,"transform":{"type":"scalar"},"locs":[{"a":575,"b":583}]},{"name":"count_20","required":false,"transform":{"type":"scalar"},"locs":[{"a":591,"b":599}]},{"name":"count_50","required":false,"transform":{"type":"scalar"},"locs":[{"a":607,"b":615}]},{"name":"count_100","required":false,"transform":{"type":"scalar"},"locs":[{"a":623,"b":632}]},{"name":"count_200","required":false,"transform":{"type":"scalar"},"locs":[{"a":640,"b":649}]},{"name":"count_500","required":false,"transform":{"type":"scalar"},"locs":[{"a":657,"b":666}]},{"name":"count_1000","required":false,"transform":{"type":"scalar"},"locs":[{"a":674,"b":684}]},{"name":"created_by","required":false,"transform":{"type":"scalar"},"locs":[{"a":692,"b":702}]}],"statement":"INSERT INTO bph_sales (\n    transaction_id, \n    transaction_date, \n    customer_id, \n    branch_id, \n    barber_id, \n    service_code, \n    total_amount, \n    payment_method, \n    reference_no, \n    count_1, \n    count_5, \n    count_10, \n    count_20, \n    count_50, \n    count_100, \n    count_200, \n    count_500, \n    count_1000, \n    created_by\n)\nVALUES (\n    :transaction_id, \n    :transaction_date, \n    :customer_id, \n    :branch_id, \n    :barber_id, \n    :service_code, \n    :total_amount, \n    :payment_method, \n    :reference_no, \n    :count_1, \n    :count_5, \n    :count_10, \n    :count_20, \n    :count_50, \n    :count_100, \n    :count_200, \n    :count_500, \n    :count_1000, \n    :created_by\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_sales (
 *     transaction_id, 
 *     transaction_date, 
 *     customer_id, 
 *     branch_id, 
 *     barber_id, 
 *     service_code, 
 *     total_amount, 
 *     payment_method, 
 *     reference_no, 
 *     count_1, 
 *     count_5, 
 *     count_10, 
 *     count_20, 
 *     count_50, 
 *     count_100, 
 *     count_200, 
 *     count_500, 
 *     count_1000, 
 *     created_by
 * )
 * VALUES (
 *     :transaction_id, 
 *     :transaction_date, 
 *     :customer_id, 
 *     :branch_id, 
 *     :barber_id, 
 *     :service_code, 
 *     :total_amount, 
 *     :payment_method, 
 *     :reference_no, 
 *     :count_1, 
 *     :count_5, 
 *     :count_10, 
 *     :count_20, 
 *     :count_50, 
 *     :count_100, 
 *     :count_200, 
 *     :count_500, 
 *     :count_1000, 
 *     :created_by
 * )
 * ```
 */
export const createSale = new PreparedQuery<ICreateSaleParams,ICreateSaleResult>(createSaleIR);


/** 'GetLatestSales' parameters type */
export type IGetLatestSalesParams = void;

/** 'GetLatestSales' return type */
export interface IGetLatestSalesResult {
  barber_id: string;
  branch_id: string;
  count_1: number | null;
  count_10: number | null;
  count_100: number | null;
  count_1000: number | null;
  count_20: number | null;
  count_200: number | null;
  count_5: number | null;
  count_50: number | null;
  count_500: number | null;
  created_by: string | null;
  customer_id: string;
  payment_method: string;
  reference_no: string | null;
  service_code: string;
  total_amount: string;
  transaction_date: Date;
  transaction_id: string;
}

/** 'GetLatestSales' query type */
export interface IGetLatestSalesQuery {
  params: IGetLatestSalesParams;
  result: IGetLatestSalesResult;
}

const getLatestSalesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_sales ORDER BY transaction_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales ORDER BY transaction_date DESC
 * ```
 */
export const getLatestSales = new PreparedQuery<IGetLatestSalesParams,IGetLatestSalesResult>(getLatestSalesIR);


/** 'GetSalesByTransactionId' parameters type */
export interface IGetSalesByTransactionIdParams {
  transaction_id?: string | null | void;
}

/** 'GetSalesByTransactionId' return type */
export interface IGetSalesByTransactionIdResult {
  barber_id: string;
  branch_id: string;
  count_1: number | null;
  count_10: number | null;
  count_100: number | null;
  count_1000: number | null;
  count_20: number | null;
  count_200: number | null;
  count_5: number | null;
  count_50: number | null;
  count_500: number | null;
  created_by: string | null;
  customer_id: string;
  payment_method: string;
  reference_no: string | null;
  service_code: string;
  total_amount: string;
  transaction_date: Date;
  transaction_id: string;
}

/** 'GetSalesByTransactionId' query type */
export interface IGetSalesByTransactionIdQuery {
  params: IGetSalesByTransactionIdParams;
  result: IGetSalesByTransactionIdResult;
}

const getSalesByTransactionIdIR: any = {"usedParamSet":{"transaction_id":true},"params":[{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":61}]}],"statement":"SELECT * FROM bph_sales WHERE transaction_id = :transaction_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales WHERE transaction_id = :transaction_id
 * ```
 */
export const getSalesByTransactionId = new PreparedQuery<IGetSalesByTransactionIdParams,IGetSalesByTransactionIdResult>(getSalesByTransactionIdIR);


/** 'GetSalesByDateRange' parameters type */
export interface IGetSalesByDateRangeParams {
  end_date?: DateOrString | null | void;
  start_date?: DateOrString | null | void;
}

/** 'GetSalesByDateRange' return type */
export interface IGetSalesByDateRangeResult {
  barber_id: string;
  branch_id: string;
  count_1: number | null;
  count_10: number | null;
  count_100: number | null;
  count_1000: number | null;
  count_20: number | null;
  count_200: number | null;
  count_5: number | null;
  count_50: number | null;
  count_500: number | null;
  created_by: string | null;
  customer_id: string;
  payment_method: string;
  reference_no: string | null;
  service_code: string;
  total_amount: string;
  transaction_date: Date;
  transaction_id: string;
}

/** 'GetSalesByDateRange' query type */
export interface IGetSalesByDateRangeQuery {
  params: IGetSalesByDateRangeParams;
  result: IGetSalesByDateRangeResult;
}

const getSalesByDateRangeIR: any = {"usedParamSet":{"start_date":true,"end_date":true},"params":[{"name":"start_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":65}]},{"name":"end_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":71,"b":79}]}],"statement":"SELECT * FROM bph_sales WHERE transaction_date BETWEEN :start_date AND :end_date ORDER BY transaction_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales WHERE transaction_date BETWEEN :start_date AND :end_date ORDER BY transaction_date DESC
 * ```
 */
export const getSalesByDateRange = new PreparedQuery<IGetSalesByDateRangeParams,IGetSalesByDateRangeResult>(getSalesByDateRangeIR);


/** 'GetSalesByCustomer' parameters type */
export interface IGetSalesByCustomerParams {
  customer_id?: string | null | void;
}

/** 'GetSalesByCustomer' return type */
export interface IGetSalesByCustomerResult {
  barber_id: string;
  branch_id: string;
  count_1: number | null;
  count_10: number | null;
  count_100: number | null;
  count_1000: number | null;
  count_20: number | null;
  count_200: number | null;
  count_5: number | null;
  count_50: number | null;
  count_500: number | null;
  created_by: string | null;
  customer_id: string;
  payment_method: string;
  reference_no: string | null;
  service_code: string;
  total_amount: string;
  transaction_date: Date;
  transaction_id: string;
}

/** 'GetSalesByCustomer' query type */
export interface IGetSalesByCustomerQuery {
  params: IGetSalesByCustomerParams;
  result: IGetSalesByCustomerResult;
}

const getSalesByCustomerIR: any = {"usedParamSet":{"customer_id":true},"params":[{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":44,"b":55}]}],"statement":"SELECT * FROM bph_sales WHERE customer_id = :customer_id ORDER BY transaction_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales WHERE customer_id = :customer_id ORDER BY transaction_date DESC
 * ```
 */
export const getSalesByCustomer = new PreparedQuery<IGetSalesByCustomerParams,IGetSalesByCustomerResult>(getSalesByCustomerIR);


/** 'GetSalesByBranch' parameters type */
export interface IGetSalesByBranchParams {
  branch_id?: string | null | void;
}

/** 'GetSalesByBranch' return type */
export interface IGetSalesByBranchResult {
  barber_id: string;
  branch_id: string;
  count_1: number | null;
  count_10: number | null;
  count_100: number | null;
  count_1000: number | null;
  count_20: number | null;
  count_200: number | null;
  count_5: number | null;
  count_50: number | null;
  count_500: number | null;
  created_by: string | null;
  customer_id: string;
  payment_method: string;
  reference_no: string | null;
  service_code: string;
  total_amount: string;
  transaction_date: Date;
  transaction_id: string;
}

/** 'GetSalesByBranch' query type */
export interface IGetSalesByBranchQuery {
  params: IGetSalesByBranchParams;
  result: IGetSalesByBranchResult;
}

const getSalesByBranchIR: any = {"usedParamSet":{"branch_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":51}]}],"statement":"SELECT * FROM bph_sales WHERE branch_id = :branch_id ORDER BY transaction_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales WHERE branch_id = :branch_id ORDER BY transaction_date DESC
 * ```
 */
export const getSalesByBranch = new PreparedQuery<IGetSalesByBranchParams,IGetSalesByBranchResult>(getSalesByBranchIR);


/** 'GetSalesByBarber' parameters type */
export interface IGetSalesByBarberParams {
  barber_id?: string | null | void;
}

/** 'GetSalesByBarber' return type */
export interface IGetSalesByBarberResult {
  barber_id: string;
  branch_id: string;
  count_1: number | null;
  count_10: number | null;
  count_100: number | null;
  count_1000: number | null;
  count_20: number | null;
  count_200: number | null;
  count_5: number | null;
  count_50: number | null;
  count_500: number | null;
  created_by: string | null;
  customer_id: string;
  payment_method: string;
  reference_no: string | null;
  service_code: string;
  total_amount: string;
  transaction_date: Date;
  transaction_id: string;
}

/** 'GetSalesByBarber' query type */
export interface IGetSalesByBarberQuery {
  params: IGetSalesByBarberParams;
  result: IGetSalesByBarberResult;
}

const getSalesByBarberIR: any = {"usedParamSet":{"barber_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":51}]}],"statement":"SELECT * FROM bph_sales WHERE barber_id = :barber_id ORDER BY transaction_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales WHERE barber_id = :barber_id ORDER BY transaction_date DESC
 * ```
 */
export const getSalesByBarber = new PreparedQuery<IGetSalesByBarberParams,IGetSalesByBarberResult>(getSalesByBarberIR);


/** 'GetSalesByPaymentMethod' parameters type */
export interface IGetSalesByPaymentMethodParams {
  payment_method?: string | null | void;
}

/** 'GetSalesByPaymentMethod' return type */
export interface IGetSalesByPaymentMethodResult {
  barber_id: string;
  branch_id: string;
  count_1: number | null;
  count_10: number | null;
  count_100: number | null;
  count_1000: number | null;
  count_20: number | null;
  count_200: number | null;
  count_5: number | null;
  count_50: number | null;
  count_500: number | null;
  created_by: string | null;
  customer_id: string;
  payment_method: string;
  reference_no: string | null;
  service_code: string;
  total_amount: string;
  transaction_date: Date;
  transaction_id: string;
}

/** 'GetSalesByPaymentMethod' query type */
export interface IGetSalesByPaymentMethodQuery {
  params: IGetSalesByPaymentMethodParams;
  result: IGetSalesByPaymentMethodResult;
}

const getSalesByPaymentMethodIR: any = {"usedParamSet":{"payment_method":true},"params":[{"name":"payment_method","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":61}]}],"statement":"SELECT * FROM bph_sales WHERE payment_method = :payment_method ORDER BY transaction_date DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_sales WHERE payment_method = :payment_method ORDER BY transaction_date DESC
 * ```
 */
export const getSalesByPaymentMethod = new PreparedQuery<IGetSalesByPaymentMethodParams,IGetSalesByPaymentMethodResult>(getSalesByPaymentMethodIR);


/** 'UpdateSale' parameters type */
export interface IUpdateSaleParams {
  barber_id?: string | null | void;
  branch_id?: string | null | void;
  count_1?: number | null | void;
  count_10?: number | null | void;
  count_100?: number | null | void;
  count_1000?: number | null | void;
  count_20?: number | null | void;
  count_200?: number | null | void;
  count_5?: number | null | void;
  count_50?: number | null | void;
  count_500?: number | null | void;
  created_by?: string | null | void;
  customer_id?: string | null | void;
  payment_method?: string | null | void;
  reference_no?: string | null | void;
  service_code?: string | null | void;
  total_amount?: NumberOrString | null | void;
  transaction_date?: DateOrString | null | void;
  transaction_id?: string | null | void;
}

/** 'UpdateSale' return type */
export type IUpdateSaleResult = void;

/** 'UpdateSale' query type */
export interface IUpdateSaleQuery {
  params: IUpdateSaleParams;
  result: IUpdateSaleResult;
}

const updateSaleIR: any = {"usedParamSet":{"total_amount":true,"payment_method":true,"reference_no":true,"count_1":true,"count_5":true,"count_10":true,"count_20":true,"count_50":true,"count_100":true,"count_200":true,"count_500":true,"count_1000":true,"created_by":true,"transaction_id":true,"transaction_date":true,"customer_id":true,"branch_id":true,"barber_id":true,"service_code":true},"params":[{"name":"total_amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":49}]},{"name":"payment_method","required":false,"transform":{"type":"scalar"},"locs":[{"a":73,"b":87}]},{"name":"reference_no","required":false,"transform":{"type":"scalar"},"locs":[{"a":109,"b":121}]},{"name":"count_1","required":false,"transform":{"type":"scalar"},"locs":[{"a":138,"b":145}]},{"name":"count_5","required":false,"transform":{"type":"scalar"},"locs":[{"a":162,"b":169}]},{"name":"count_10","required":false,"transform":{"type":"scalar"},"locs":[{"a":187,"b":195}]},{"name":"count_20","required":false,"transform":{"type":"scalar"},"locs":[{"a":213,"b":221}]},{"name":"count_50","required":false,"transform":{"type":"scalar"},"locs":[{"a":239,"b":247}]},{"name":"count_100","required":false,"transform":{"type":"scalar"},"locs":[{"a":266,"b":275}]},{"name":"count_200","required":false,"transform":{"type":"scalar"},"locs":[{"a":294,"b":303}]},{"name":"count_500","required":false,"transform":{"type":"scalar"},"locs":[{"a":322,"b":331}]},{"name":"count_1000","required":false,"transform":{"type":"scalar"},"locs":[{"a":351,"b":361}]},{"name":"created_by","required":false,"transform":{"type":"scalar"},"locs":[{"a":381,"b":391}]},{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":416,"b":430}]},{"name":"transaction_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":460,"b":476}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":501,"b":512}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":535,"b":544}]},{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":567,"b":576}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":602,"b":614}]}],"statement":"UPDATE bph_sales \nSET total_amount = :total_amount,\n    payment_method = :payment_method,\n    reference_no = :reference_no,\n    count_1 = :count_1,\n    count_5 = :count_5,\n    count_10 = :count_10,\n    count_20 = :count_20,\n    count_50 = :count_50,\n    count_100 = :count_100,\n    count_200 = :count_200,\n    count_500 = :count_500,\n    count_1000 = :count_1000,\n    created_by = :created_by\nWHERE transaction_id = :transaction_id \n    AND transaction_date = :transaction_date \n    AND customer_id = :customer_id \n    AND branch_id = :branch_id \n    AND barber_id = :barber_id \n    AND service_code = :service_code"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_sales 
 * SET total_amount = :total_amount,
 *     payment_method = :payment_method,
 *     reference_no = :reference_no,
 *     count_1 = :count_1,
 *     count_5 = :count_5,
 *     count_10 = :count_10,
 *     count_20 = :count_20,
 *     count_50 = :count_50,
 *     count_100 = :count_100,
 *     count_200 = :count_200,
 *     count_500 = :count_500,
 *     count_1000 = :count_1000,
 *     created_by = :created_by
 * WHERE transaction_id = :transaction_id 
 *     AND transaction_date = :transaction_date 
 *     AND customer_id = :customer_id 
 *     AND branch_id = :branch_id 
 *     AND barber_id = :barber_id 
 *     AND service_code = :service_code
 * ```
 */
export const updateSale = new PreparedQuery<IUpdateSaleParams,IUpdateSaleResult>(updateSaleIR);


/** 'DeleteSale' parameters type */
export interface IDeleteSaleParams {
  barber_id?: string | null | void;
  branch_id?: string | null | void;
  customer_id?: string | null | void;
  service_code?: string | null | void;
  transaction_date?: DateOrString | null | void;
  transaction_id?: string | null | void;
}

/** 'DeleteSale' return type */
export type IDeleteSaleResult = void;

/** 'DeleteSale' query type */
export interface IDeleteSaleQuery {
  params: IDeleteSaleParams;
  result: IDeleteSaleResult;
}

const deleteSaleIR: any = {"usedParamSet":{"transaction_id":true,"transaction_date":true,"customer_id":true,"branch_id":true,"barber_id":true,"service_code":true},"params":[{"name":"transaction_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":60}]},{"name":"transaction_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":90,"b":106}]},{"name":"customer_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":131,"b":142}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":165,"b":174}]},{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":197,"b":206}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":232,"b":244}]}],"statement":"DELETE FROM bph_sales \nWHERE transaction_id = :transaction_id \n    AND transaction_date = :transaction_date \n    AND customer_id = :customer_id \n    AND branch_id = :branch_id \n    AND barber_id = :barber_id \n    AND service_code = :service_code"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_sales 
 * WHERE transaction_id = :transaction_id 
 *     AND transaction_date = :transaction_date 
 *     AND customer_id = :customer_id 
 *     AND branch_id = :branch_id 
 *     AND barber_id = :barber_id 
 *     AND service_code = :service_code
 * ```
 */
export const deleteSale = new PreparedQuery<IDeleteSaleParams,IDeleteSaleResult>(deleteSaleIR);


