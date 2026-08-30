/** Types generated for queries found in "src/queries/pos/queue.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateQueue' parameters type */
export interface ICreateQueueParams {
  appointment_date?: string | null | void;
  appointment_id?: string | null | void;
  assigned_barber?: string | null | void;
  assigned_branch?: string | null | void;
  customer_address?: string | null | void;
  customer_email?: string | null | void;
  customer_name?: string | null | void;
  customer_social_media?: string | null | void;
  id?: string | null | void;
  service_code?: string | null | void;
  status?: string | null | void;
}

/** 'CreateQueue' return type */
export type ICreateQueueResult = void;

/** 'CreateQueue' query type */
export interface ICreateQueueQuery {
  params: ICreateQueueParams;
  result: ICreateQueueResult;
}

const createQueueIR: any = {"usedParamSet":{"id":true,"customer_name":true,"customer_social_media":true,"customer_address":true,"customer_email":true,"appointment_id":true,"appointment_date":true,"service_code":true,"assigned_barber":true,"assigned_branch":true,"status":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":197,"b":199}]},{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":202,"b":215}]},{"name":"customer_social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":218,"b":239}]},{"name":"customer_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":242,"b":258}]},{"name":"customer_email","required":false,"transform":{"type":"scalar"},"locs":[{"a":261,"b":275}]},{"name":"appointment_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":278,"b":292}]},{"name":"appointment_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":295,"b":311}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":314,"b":326}]},{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":329,"b":344}]},{"name":"assigned_branch","required":false,"transform":{"type":"scalar"},"locs":[{"a":347,"b":362}]},{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":365,"b":371}]}],"statement":"INSERT INTO pos_queue (id, customer_name, customer_social_media, customer_address, customer_email, appointment_id, appointment_date, service_code, assigned_barber, assigned_branch, status)\nVALUES (:id, :customer_name, :customer_social_media, :customer_address, :customer_email, :appointment_id, :appointment_date, :service_code, :assigned_barber, :assigned_branch, :status)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO pos_queue (id, customer_name, customer_social_media, customer_address, customer_email, appointment_id, appointment_date, service_code, assigned_barber, assigned_branch, status)
 * VALUES (:id, :customer_name, :customer_social_media, :customer_address, :customer_email, :appointment_id, :appointment_date, :service_code, :assigned_barber, :assigned_branch, :status)
 * ```
 */
export const createQueue = new PreparedQuery<ICreateQueueParams,ICreateQueueResult>(createQueueIR);


/** 'GetAllQueues' parameters type */
export type IGetAllQueuesParams = void;

/** 'GetAllQueues' return type */
export interface IGetAllQueuesResult {
  appointment_date: string | null;
  appointment_id: string | null;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  service_code: string;
  status: string;
}

/** 'GetAllQueues' query type */
export interface IGetAllQueuesQuery {
  params: IGetAllQueuesParams;
  result: IGetAllQueuesResult;
}

const getAllQueuesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM pos_queue ORDER BY appointment_date"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_queue ORDER BY appointment_date
 * ```
 */
export const getAllQueues = new PreparedQuery<IGetAllQueuesParams,IGetAllQueuesResult>(getAllQueuesIR);


/** 'GetQueueById' parameters type */
export interface IGetQueueByIdParams {
  id?: string | null | void;
}

/** 'GetQueueById' return type */
export interface IGetQueueByIdResult {
  appointment_date: string | null;
  appointment_id: string | null;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  service_code: string;
  status: string;
}

/** 'GetQueueById' query type */
export interface IGetQueueByIdQuery {
  params: IGetQueueByIdParams;
  result: IGetQueueByIdResult;
}

const getQueueByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":35,"b":37}]}],"statement":"SELECT * FROM pos_queue WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_queue WHERE id = :id
 * ```
 */
export const getQueueById = new PreparedQuery<IGetQueueByIdParams,IGetQueueByIdResult>(getQueueByIdIR);


/** 'GetQueuesByBranch' parameters type */
export interface IGetQueuesByBranchParams {
  assigned_branch?: string | null | void;
}

/** 'GetQueuesByBranch' return type */
export interface IGetQueuesByBranchResult {
  appointment_date: string | null;
  appointment_id: string | null;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  service_code: string;
  status: string;
}

/** 'GetQueuesByBranch' query type */
export interface IGetQueuesByBranchQuery {
  params: IGetQueuesByBranchParams;
  result: IGetQueuesByBranchResult;
}

const getQueuesByBranchIR: any = {"usedParamSet":{"assigned_branch":true},"params":[{"name":"assigned_branch","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":63}]}],"statement":"SELECT * FROM pos_queue WHERE assigned_branch = :assigned_branch ORDER BY appointment_date"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_queue WHERE assigned_branch = :assigned_branch ORDER BY appointment_date
 * ```
 */
export const getQueuesByBranch = new PreparedQuery<IGetQueuesByBranchParams,IGetQueuesByBranchResult>(getQueuesByBranchIR);


/** 'GetQueuesByBarber' parameters type */
export interface IGetQueuesByBarberParams {
  assigned_barber?: string | null | void;
}

/** 'GetQueuesByBarber' return type */
export interface IGetQueuesByBarberResult {
  appointment_date: string | null;
  appointment_id: string | null;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  service_code: string;
  status: string;
}

/** 'GetQueuesByBarber' query type */
export interface IGetQueuesByBarberQuery {
  params: IGetQueuesByBarberParams;
  result: IGetQueuesByBarberResult;
}

const getQueuesByBarberIR: any = {"usedParamSet":{"assigned_barber":true},"params":[{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":63}]}],"statement":"SELECT * FROM pos_queue WHERE assigned_barber = :assigned_barber ORDER BY appointment_date"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_queue WHERE assigned_barber = :assigned_barber ORDER BY appointment_date
 * ```
 */
export const getQueuesByBarber = new PreparedQuery<IGetQueuesByBarberParams,IGetQueuesByBarberResult>(getQueuesByBarberIR);


/** 'GetQueuesByStatus' parameters type */
export interface IGetQueuesByStatusParams {
  status?: string | null | void;
}

/** 'GetQueuesByStatus' return type */
export interface IGetQueuesByStatusResult {
  appointment_date: string | null;
  appointment_id: string | null;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  service_code: string;
  status: string;
}

/** 'GetQueuesByStatus' query type */
export interface IGetQueuesByStatusQuery {
  params: IGetQueuesByStatusParams;
  result: IGetQueuesByStatusResult;
}

const getQueuesByStatusIR: any = {"usedParamSet":{"status":true},"params":[{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":45}]}],"statement":"SELECT * FROM pos_queue WHERE status = :status ORDER BY appointment_date"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_queue WHERE status = :status ORDER BY appointment_date
 * ```
 */
export const getQueuesByStatus = new PreparedQuery<IGetQueuesByStatusParams,IGetQueuesByStatusResult>(getQueuesByStatusIR);


/** 'GetQueuesByCustomerName' parameters type */
export interface IGetQueuesByCustomerNameParams {
  customer_name?: string | null | void;
}

/** 'GetQueuesByCustomerName' return type */
export interface IGetQueuesByCustomerNameResult {
  appointment_date: string | null;
  appointment_id: string | null;
  assigned_barber: string;
  assigned_branch: string;
  customer_address: string | null;
  customer_email: string | null;
  customer_name: string;
  customer_social_media: string | null;
  id: string;
  service_code: string;
  status: string;
}

/** 'GetQueuesByCustomerName' query type */
export interface IGetQueuesByCustomerNameQuery {
  params: IGetQueuesByCustomerNameParams;
  result: IGetQueuesByCustomerNameResult;
}

const getQueuesByCustomerNameIR: any = {"usedParamSet":{"customer_name":true},"params":[{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":63}]}],"statement":"SELECT * FROM pos_queue WHERE customer_name ILIKE :customer_name ORDER BY appointment_date"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_queue WHERE customer_name ILIKE :customer_name ORDER BY appointment_date
 * ```
 */
export const getQueuesByCustomerName = new PreparedQuery<IGetQueuesByCustomerNameParams,IGetQueuesByCustomerNameResult>(getQueuesByCustomerNameIR);


/** 'UpdateQueue' parameters type */
export interface IUpdateQueueParams {
  appointment_date?: string | null | void;
  appointment_id?: string | null | void;
  assigned_barber?: string | null | void;
  assigned_branch?: string | null | void;
  customer_address?: string | null | void;
  customer_email?: string | null | void;
  customer_name?: string | null | void;
  customer_social_media?: string | null | void;
  id?: string | null | void;
  service_code?: string | null | void;
  status?: string | null | void;
}

/** 'UpdateQueue' return type */
export type IUpdateQueueResult = void;

/** 'UpdateQueue' query type */
export interface IUpdateQueueQuery {
  params: IUpdateQueueParams;
  result: IUpdateQueueResult;
}

const updateQueueIR: any = {"usedParamSet":{"customer_name":true,"customer_social_media":true,"customer_address":true,"customer_email":true,"appointment_id":true,"appointment_date":true,"service_code":true,"assigned_barber":true,"assigned_branch":true,"status":true,"id":true},"params":[{"name":"customer_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":38,"b":51}]},{"name":"customer_social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":82,"b":103}]},{"name":"customer_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":129,"b":145}]},{"name":"customer_email","required":false,"transform":{"type":"scalar"},"locs":[{"a":169,"b":183}]},{"name":"appointment_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":207,"b":221}]},{"name":"appointment_date","required":false,"transform":{"type":"scalar"},"locs":[{"a":247,"b":263}]},{"name":"service_code","required":false,"transform":{"type":"scalar"},"locs":[{"a":285,"b":297}]},{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":322,"b":337}]},{"name":"assigned_branch","required":false,"transform":{"type":"scalar"},"locs":[{"a":362,"b":377}]},{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":393,"b":399}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":412,"b":414}]}],"statement":"UPDATE pos_queue \nSET customer_name = :customer_name,\n    customer_social_media = :customer_social_media,\n    customer_address = :customer_address,\n    customer_email = :customer_email,\n    appointment_id = :appointment_id,\n    appointment_date = :appointment_date,\n    service_code = :service_code,\n    assigned_barber = :assigned_barber,\n    assigned_branch = :assigned_branch,\n    status = :status\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE pos_queue 
 * SET customer_name = :customer_name,
 *     customer_social_media = :customer_social_media,
 *     customer_address = :customer_address,
 *     customer_email = :customer_email,
 *     appointment_id = :appointment_id,
 *     appointment_date = :appointment_date,
 *     service_code = :service_code,
 *     assigned_barber = :assigned_barber,
 *     assigned_branch = :assigned_branch,
 *     status = :status
 * WHERE id = :id
 * ```
 */
export const updateQueue = new PreparedQuery<IUpdateQueueParams,IUpdateQueueResult>(updateQueueIR);


/** 'UpdateQueueStatus' parameters type */
export interface IUpdateQueueStatusParams {
  id?: string | null | void;
  status?: string | null | void;
}

/** 'UpdateQueueStatus' return type */
export type IUpdateQueueStatusResult = void;

/** 'UpdateQueueStatus' query type */
export interface IUpdateQueueStatusQuery {
  params: IUpdateQueueStatusParams;
  result: IUpdateQueueStatusResult;
}

const updateQueueStatusIR: any = {"usedParamSet":{"status":true,"id":true},"params":[{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":37}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":52}]}],"statement":"UPDATE pos_queue \nSET status = :status\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE pos_queue 
 * SET status = :status
 * WHERE id = :id
 * ```
 */
export const updateQueueStatus = new PreparedQuery<IUpdateQueueStatusParams,IUpdateQueueStatusResult>(updateQueueStatusIR);


/** 'DeleteQueue' parameters type */
export interface IDeleteQueueParams {
  id?: string | null | void;
}

/** 'DeleteQueue' return type */
export type IDeleteQueueResult = void;

/** 'DeleteQueue' query type */
export interface IDeleteQueueQuery {
  params: IDeleteQueueParams;
  result: IDeleteQueueResult;
}

const deleteQueueIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":33,"b":35}]}],"statement":"DELETE FROM pos_queue WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM pos_queue WHERE id = :id
 * ```
 */
export const deleteQueue = new PreparedQuery<IDeleteQueueParams,IDeleteQueueResult>(deleteQueueIR);


