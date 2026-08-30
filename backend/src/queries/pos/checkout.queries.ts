/** Types generated for queries found in "src/queries/pos/checkout.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'CreateCheckout' parameters type */
export interface ICreateCheckoutParams {
  amount?: NumberOrString | null | void;
  assigned_barber?: string | null | void;
  assigned_branch?: string | null | void;
  customer_address?: string | null | void;
  customer_email?: string | null | void;
  customer_name?: string | null | void;
  customer_social_media?: string | null | void;
  id?: string | null | void;
  payment_method?: string | null | void;
  purchased_at?: DateOrString | null | void;
  reference_number?: string | null | void;
  service_code?: string | null | void;
}

/** 'CreateCheckout' return type */
export type ICreateCheckoutResult = void;

/** 'CreateCheckout' query type */
export interface ICreateCheckoutQuery {
  params: ICreateCheckoutParams;
  result: ICreateCheckoutResult;
}

const createCheckoutIR: any = {"usedParamSet":{"id":true,"customer_name":true,"customer_social_media":true,"customer_address":true,"customer_email":true,"assigned_branch":true,"assigned_barber":true,"service_code":true,"amount":true,"payment_method":true,"reference_number":true,"purchased_at":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":214,"b":216}]},{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":219,"b":232}]},{"name":"customer_social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":235,"b":256}]},{"name":"customer_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":259,"b":275}]},{"name":"customer_email","required":false,"transform":{"type":"scalar"},"locs":[{"a":278,"b":292}]},{"name":"assigned_branch","required":false,"transform":{"type":"scalar"},"locs":[{"a":295,"b":310}]},{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":313,"b":328}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":331,"b":343}]},{"name":"amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":346,"b":352}]},{"name":"payment_method","required":false,"transform":{"type":"scalar"},"locs":[{"a":355,"b":369}]},{"name":"reference_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":372,"b":388}]},{"name":"purchased_at","required":false,"transform":{"type":"scalar"},"locs":[{"a":391,"b":403}]}],"statement":"INSERT INTO pos_checkout (id, customer_name, customer_social_media, customer_address, customer_email, assigned_branch, assigned_barber, service_code, amount, payment_method, reference_number, purchased_at)\nVALUES (:id, :customer_name, :customer_social_media, :customer_address, :customer_email, :assigned_branch, :assigned_barber, :service_code, :amount, :payment_method, :reference_number, :purchased_at)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO pos_checkout (id, customer_name, customer_social_media, customer_address, customer_email, assigned_branch, assigned_barber, service_code, amount, payment_method, reference_number, purchased_at)
 * VALUES (:id, :customer_name, :customer_social_media, :customer_address, :customer_email, :assigned_branch, :assigned_barber, :service_code, :amount, :payment_method, :reference_number, :purchased_at)
 * ```
 */
export const createCheckout = new PreparedQuery<ICreateCheckoutParams,ICreateCheckoutResult>(createCheckoutIR);


/** 'GetAllCheckouts' parameters type */
export type IGetAllCheckoutsParams = void;

/** 'GetAllCheckouts' return type */
export interface IGetAllCheckoutsResult {
  amount: string;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  payment_method: string;
  purchased_at: Date;
  reference_number: string | null;
  service_code: string;
}

/** 'GetAllCheckouts' query type */
export interface IGetAllCheckoutsQuery {
  params: IGetAllCheckoutsParams;
  result: IGetAllCheckoutsResult;
}

const getAllCheckoutsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM pos_checkout ORDER BY purchased_at DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_checkout ORDER BY purchased_at DESC
 * ```
 */
export const getAllCheckouts = new PreparedQuery<IGetAllCheckoutsParams,IGetAllCheckoutsResult>(getAllCheckoutsIR);


/** 'GetCheckoutById' parameters type */
export interface IGetCheckoutByIdParams {
  id?: string | null | void;
}

/** 'GetCheckoutById' return type */
export interface IGetCheckoutByIdResult {
  amount: string;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  payment_method: string;
  purchased_at: Date;
  reference_number: string | null;
  service_code: string;
}

/** 'GetCheckoutById' query type */
export interface IGetCheckoutByIdQuery {
  params: IGetCheckoutByIdParams;
  result: IGetCheckoutByIdResult;
}

const getCheckoutByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":38,"b":40}]}],"statement":"SELECT * FROM pos_checkout WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_checkout WHERE id = :id
 * ```
 */
export const getCheckoutById = new PreparedQuery<IGetCheckoutByIdParams,IGetCheckoutByIdResult>(getCheckoutByIdIR);


/** 'GetCheckoutsByBranch' parameters type */
export interface IGetCheckoutsByBranchParams {
  assigned_branch?: string | null | void;
}

/** 'GetCheckoutsByBranch' return type */
export interface IGetCheckoutsByBranchResult {
  amount: string;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  payment_method: string;
  purchased_at: Date;
  reference_number: string | null;
  service_code: string;
}

/** 'GetCheckoutsByBranch' query type */
export interface IGetCheckoutsByBranchQuery {
  params: IGetCheckoutsByBranchParams;
  result: IGetCheckoutsByBranchResult;
}

const getCheckoutsByBranchIR: any = {"usedParamSet":{"assigned_branch":true},"params":[{"name":"assigned_branch","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":66}]}],"statement":"SELECT * FROM pos_checkout WHERE assigned_branch = :assigned_branch ORDER BY purchased_at DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_checkout WHERE assigned_branch = :assigned_branch ORDER BY purchased_at DESC
 * ```
 */
export const getCheckoutsByBranch = new PreparedQuery<IGetCheckoutsByBranchParams,IGetCheckoutsByBranchResult>(getCheckoutsByBranchIR);


/** 'GetCheckoutsByBarber' parameters type */
export interface IGetCheckoutsByBarberParams {
  assigned_barber?: string | null | void;
}

/** 'GetCheckoutsByBarber' return type */
export interface IGetCheckoutsByBarberResult {
  amount: string;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  payment_method: string;
  purchased_at: Date;
  reference_number: string | null;
  service_code: string;
}

/** 'GetCheckoutsByBarber' query type */
export interface IGetCheckoutsByBarberQuery {
  params: IGetCheckoutsByBarberParams;
  result: IGetCheckoutsByBarberResult;
}

const getCheckoutsByBarberIR: any = {"usedParamSet":{"assigned_barber":true},"params":[{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":66}]}],"statement":"SELECT * FROM pos_checkout WHERE assigned_barber = :assigned_barber ORDER BY purchased_at DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_checkout WHERE assigned_barber = :assigned_barber ORDER BY purchased_at DESC
 * ```
 */
export const getCheckoutsByBarber = new PreparedQuery<IGetCheckoutsByBarberParams,IGetCheckoutsByBarberResult>(getCheckoutsByBarberIR);


/** 'GetCheckoutsByDateRange' parameters type */
export interface IGetCheckoutsByDateRangeParams {
  end_date?: DateOrString | null | void;
  start_date?: DateOrString | null | void;
}

/** 'GetCheckoutsByDateRange' return type */
export interface IGetCheckoutsByDateRangeResult {
  amount: string;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  payment_method: string;
  purchased_at: Date;
  reference_number: string | null;
  service_code: string;
}

/** 'GetCheckoutsByDateRange' query type */
export interface IGetCheckoutsByDateRangeQuery {
  params: IGetCheckoutsByDateRangeParams;
  result: IGetCheckoutsByDateRangeResult;
}

const getCheckoutsByDateRangeIR: any = {"usedParamSet":{"start_date":true,"end_date":true},"params":[{"name":"start_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":64}]},{"name":"end_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":70,"b":78}]}],"statement":"SELECT * FROM pos_checkout WHERE purchased_at BETWEEN :start_date AND :end_date ORDER BY purchased_at DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_checkout WHERE purchased_at BETWEEN :start_date AND :end_date ORDER BY purchased_at DESC
 * ```
 */
export const getCheckoutsByDateRange = new PreparedQuery<IGetCheckoutsByDateRangeParams,IGetCheckoutsByDateRangeResult>(getCheckoutsByDateRangeIR);


/** 'GetCheckoutsByCustomerName' parameters type */
export interface IGetCheckoutsByCustomerNameParams {
  customer_name?: string | null | void;
}

/** 'GetCheckoutsByCustomerName' return type */
export interface IGetCheckoutsByCustomerNameResult {
  amount: string;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  payment_method: string;
  purchased_at: Date;
  reference_number: string | null;
  service_code: string;
}

/** 'GetCheckoutsByCustomerName' query type */
export interface IGetCheckoutsByCustomerNameQuery {
  params: IGetCheckoutsByCustomerNameParams;
  result: IGetCheckoutsByCustomerNameResult;
}

const getCheckoutsByCustomerNameIR: any = {"usedParamSet":{"customer_name":true},"params":[{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":53,"b":66}]}],"statement":"SELECT * FROM pos_checkout WHERE customer_name ILIKE :customer_name ORDER BY purchased_at DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_checkout WHERE customer_name ILIKE :customer_name ORDER BY purchased_at DESC
 * ```
 */
export const getCheckoutsByCustomerName = new PreparedQuery<IGetCheckoutsByCustomerNameParams,IGetCheckoutsByCustomerNameResult>(getCheckoutsByCustomerNameIR);


/** 'UpdateCheckout' parameters type */
export interface IUpdateCheckoutParams {
  amount?: NumberOrString | null | void;
  assigned_barber?: string | null | void;
  assigned_branch?: string | null | void;
  customer_address?: string | null | void;
  customer_email?: string | null | void;
  customer_name?: string | null | void;
  customer_social_media?: string | null | void;
  id?: string | null | void;
  payment_method?: string | null | void;
  purchased_at?: DateOrString | null | void;
  reference_number?: string | null | void;
  service_code?: string | null | void;
}

/** 'UpdateCheckout' return type */
export type IUpdateCheckoutResult = void;

/** 'UpdateCheckout' query type */
export interface IUpdateCheckoutQuery {
  params: IUpdateCheckoutParams;
  result: IUpdateCheckoutResult;
}

const updateCheckoutIR: any = {"usedParamSet":{"customer_name":true,"customer_social_media":true,"customer_address":true,"customer_email":true,"assigned_branch":true,"assigned_barber":true,"service_code":true,"amount":true,"payment_method":true,"reference_number":true,"purchased_at":true,"id":true},"params":[{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":54}]},{"name":"customer_social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":106}]},{"name":"customer_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":132,"b":148}]},{"name":"customer_email","required":false,"transform":{"type":"scalar"},"locs":[{"a":172,"b":186}]},{"name":"assigned_branch","required":false,"transform":{"type":"scalar"},"locs":[{"a":211,"b":226}]},{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":251,"b":266}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":288,"b":300}]},{"name":"amount","required":false,"transform":{"type":"scalar"},"locs":[{"a":316,"b":322}]},{"name":"payment_method","required":false,"transform":{"type":"scalar"},"locs":[{"a":346,"b":360}]},{"name":"reference_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":386,"b":402}]},{"name":"purchased_at","required":false,"transform":{"type":"scalar"},"locs":[{"a":424,"b":436}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":449,"b":451}]}],"statement":"UPDATE pos_checkout \nSET customer_name = :customer_name,\n    customer_social_media = :customer_social_media,\n    customer_address = :customer_address,\n    customer_email = :customer_email,\n    assigned_branch = :assigned_branch,\n    assigned_barber = :assigned_barber,\n    service_code = :service_code,\n    amount = :amount,\n    payment_method = :payment_method,\n    reference_number = :reference_number,\n    purchased_at = :purchased_at\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE pos_checkout 
 * SET customer_name = :customer_name,
 *     customer_social_media = :customer_social_media,
 *     customer_address = :customer_address,
 *     customer_email = :customer_email,
 *     assigned_branch = :assigned_branch,
 *     assigned_barber = :assigned_barber,
 *     service_code = :service_code,
 *     amount = :amount,
 *     payment_method = :payment_method,
 *     reference_number = :reference_number,
 *     purchased_at = :purchased_at
 * WHERE id = :id
 * ```
 */
export const updateCheckout = new PreparedQuery<IUpdateCheckoutParams,IUpdateCheckoutResult>(updateCheckoutIR);


/** 'DeleteCheckout' parameters type */
export interface IDeleteCheckoutParams {
  id?: string | null | void;
}

/** 'DeleteCheckout' return type */
export type IDeleteCheckoutResult = void;

/** 'DeleteCheckout' query type */
export interface IDeleteCheckoutQuery {
  params: IDeleteCheckoutParams;
  result: IDeleteCheckoutResult;
}

const deleteCheckoutIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":36,"b":38}]}],"statement":"DELETE FROM pos_checkout WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM pos_checkout WHERE id = :id
 * ```
 */
export const deleteCheckout = new PreparedQuery<IDeleteCheckoutParams,IDeleteCheckoutResult>(deleteCheckoutIR);


