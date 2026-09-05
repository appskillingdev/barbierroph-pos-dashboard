/** Types generated for queries found in "src/queries/paymentmethods/paymentmethods.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreatePaymentMethod' parameters type */
export interface ICreatePaymentMethodParams {
  bank_number?: string | null | void;
  payment_method_id?: string | null | void;
  payment_method_name?: string | null | void;
}

/** 'CreatePaymentMethod' return type */
export type ICreatePaymentMethodResult = void;

/** 'CreatePaymentMethod' query type */
export interface ICreatePaymentMethodQuery {
  params: ICreatePaymentMethodParams;
  result: ICreatePaymentMethodResult;
}

const createPaymentMethodIR: any = {"usedParamSet":{"payment_method_id":true,"payment_method_name":true,"bank_number":true},"params":[{"name":"payment_method_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":110}]},{"name":"payment_method_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":113,"b":132}]},{"name":"bank_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":135,"b":146}]}],"statement":"INSERT INTO bph_paymentmethods (payment_method_id, payment_method_name, bank_number)\nVALUES (:payment_method_id, :payment_method_name, :bank_number)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_paymentmethods (payment_method_id, payment_method_name, bank_number)
 * VALUES (:payment_method_id, :payment_method_name, :bank_number)
 * ```
 */
export const createPaymentMethod = new PreparedQuery<ICreatePaymentMethodParams,ICreatePaymentMethodResult>(createPaymentMethodIR);


/** 'GetAllPaymentMethods' parameters type */
export type IGetAllPaymentMethodsParams = void;

/** 'GetAllPaymentMethods' return type */
export interface IGetAllPaymentMethodsResult {
  bank_number: string | null;
  payment_method_id: string;
  payment_method_name: string;
}

/** 'GetAllPaymentMethods' query type */
export interface IGetAllPaymentMethodsQuery {
  params: IGetAllPaymentMethodsParams;
  result: IGetAllPaymentMethodsResult;
}

const getAllPaymentMethodsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_paymentmethods ORDER BY payment_method_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_paymentmethods ORDER BY payment_method_name
 * ```
 */
export const getAllPaymentMethods = new PreparedQuery<IGetAllPaymentMethodsParams,IGetAllPaymentMethodsResult>(getAllPaymentMethodsIR);


/** 'GetPaymentMethodById' parameters type */
export interface IGetPaymentMethodByIdParams {
  payment_method_id?: string | null | void;
}

/** 'GetPaymentMethodById' return type */
export interface IGetPaymentMethodByIdResult {
  bank_number: string | null;
  payment_method_id: string;
  payment_method_name: string;
}

/** 'GetPaymentMethodById' query type */
export interface IGetPaymentMethodByIdQuery {
  params: IGetPaymentMethodByIdParams;
  result: IGetPaymentMethodByIdResult;
}

const getPaymentMethodByIdIR: any = {"usedParamSet":{"payment_method_id":true},"params":[{"name":"payment_method_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":76}]}],"statement":"SELECT * FROM bph_paymentmethods WHERE payment_method_id = :payment_method_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_paymentmethods WHERE payment_method_id = :payment_method_id
 * ```
 */
export const getPaymentMethodById = new PreparedQuery<IGetPaymentMethodByIdParams,IGetPaymentMethodByIdResult>(getPaymentMethodByIdIR);


/** 'GetPaymentMethodByName' parameters type */
export interface IGetPaymentMethodByNameParams {
  payment_method_name?: string | null | void;
}

/** 'GetPaymentMethodByName' return type */
export interface IGetPaymentMethodByNameResult {
  bank_number: string | null;
  payment_method_id: string;
  payment_method_name: string;
}

/** 'GetPaymentMethodByName' query type */
export interface IGetPaymentMethodByNameQuery {
  params: IGetPaymentMethodByNameParams;
  result: IGetPaymentMethodByNameResult;
}

const getPaymentMethodByNameIR: any = {"usedParamSet":{"payment_method_name":true},"params":[{"name":"payment_method_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":80}]}],"statement":"SELECT * FROM bph_paymentmethods WHERE payment_method_name = :payment_method_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_paymentmethods WHERE payment_method_name = :payment_method_name
 * ```
 */
export const getPaymentMethodByName = new PreparedQuery<IGetPaymentMethodByNameParams,IGetPaymentMethodByNameResult>(getPaymentMethodByNameIR);


/** 'UpdatePaymentMethod' parameters type */
export interface IUpdatePaymentMethodParams {
  bank_number?: string | null | void;
  payment_method_id?: string | null | void;
  payment_method_name?: string | null | void;
}

/** 'UpdatePaymentMethod' return type */
export type IUpdatePaymentMethodResult = void;

/** 'UpdatePaymentMethod' query type */
export interface IUpdatePaymentMethodQuery {
  params: IUpdatePaymentMethodParams;
  result: IUpdatePaymentMethodResult;
}

const updatePaymentMethodIR: any = {"usedParamSet":{"payment_method_name":true,"bank_number":true,"payment_method_id":true},"params":[{"name":"payment_method_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":72}]},{"name":"bank_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":104}]},{"name":"payment_method_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":132,"b":149}]}],"statement":"UPDATE bph_paymentmethods \nSET payment_method_name = :payment_method_name,\n    bank_number = :bank_number\nWHERE payment_method_id = :payment_method_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_paymentmethods 
 * SET payment_method_name = :payment_method_name,
 *     bank_number = :bank_number
 * WHERE payment_method_id = :payment_method_id
 * ```
 */
export const updatePaymentMethod = new PreparedQuery<IUpdatePaymentMethodParams,IUpdatePaymentMethodResult>(updatePaymentMethodIR);


/** 'DeletePaymentMethod' parameters type */
export interface IDeletePaymentMethodParams {
  payment_method_id?: string | null | void;
}

/** 'DeletePaymentMethod' return type */
export type IDeletePaymentMethodResult = void;

/** 'DeletePaymentMethod' query type */
export interface IDeletePaymentMethodQuery {
  params: IDeletePaymentMethodParams;
  result: IDeletePaymentMethodResult;
}

const deletePaymentMethodIR: any = {"usedParamSet":{"payment_method_id":true},"params":[{"name":"payment_method_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":74}]}],"statement":"DELETE FROM bph_paymentmethods WHERE payment_method_id = :payment_method_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_paymentmethods WHERE payment_method_id = :payment_method_id
 * ```
 */
export const deletePaymentMethod = new PreparedQuery<IDeletePaymentMethodParams,IDeletePaymentMethodResult>(deletePaymentMethodIR);


