/** Types generated for queries found in "src/queries/pos/slots.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateSlot' parameters type */
export interface ICreateSlotParams {
  assigned_barber?: string | null | void;
  branch_id?: string | null | void;
  id?: string | null | void;
  slot_id?: string | null | void;
  status?: string | null | void;
}

/** 'CreateSlot' return type */
export type ICreateSlotResult = void;

/** 'CreateSlot' query type */
export interface ICreateSlotQuery {
  params: ICreateSlotParams;
  result: ICreateSlotResult;
}

const createSlotIR: any = {"usedParamSet":{"id":true,"branch_id":true,"slot_id":true,"assigned_barber":true,"status":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":80,"b":82}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":94}]},{"name":"slot_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":97,"b":104}]},{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":107,"b":122}]},{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":125,"b":131}]}],"statement":"INSERT INTO pos_slots (id, branch_id, slot_id, assigned_barber, status)\nVALUES (:id, :branch_id, :slot_id, :assigned_barber, :status)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO pos_slots (id, branch_id, slot_id, assigned_barber, status)
 * VALUES (:id, :branch_id, :slot_id, :assigned_barber, :status)
 * ```
 */
export const createSlot = new PreparedQuery<ICreateSlotParams,ICreateSlotResult>(createSlotIR);


/** 'GetAllSlots' parameters type */
export type IGetAllSlotsParams = void;

/** 'GetAllSlots' return type */
export interface IGetAllSlotsResult {
  assigned_barber: string;
  branch_id: string;
  id: string;
  slot_id: string;
  status: string;
}

/** 'GetAllSlots' query type */
export interface IGetAllSlotsQuery {
  params: IGetAllSlotsParams;
  result: IGetAllSlotsResult;
}

const getAllSlotsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM pos_slots ORDER BY branch_id, slot_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_slots ORDER BY branch_id, slot_id
 * ```
 */
export const getAllSlots = new PreparedQuery<IGetAllSlotsParams,IGetAllSlotsResult>(getAllSlotsIR);


/** 'GetSlotById' parameters type */
export interface IGetSlotByIdParams {
  id?: string | null | void;
}

/** 'GetSlotById' return type */
export interface IGetSlotByIdResult {
  assigned_barber: string;
  branch_id: string;
  id: string;
  slot_id: string;
  status: string;
}

/** 'GetSlotById' query type */
export interface IGetSlotByIdQuery {
  params: IGetSlotByIdParams;
  result: IGetSlotByIdResult;
}

const getSlotByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":35,"b":37}]}],"statement":"SELECT * FROM pos_slots WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_slots WHERE id = :id
 * ```
 */
export const getSlotById = new PreparedQuery<IGetSlotByIdParams,IGetSlotByIdResult>(getSlotByIdIR);


/** 'GetSlotsByBranch' parameters type */
export interface IGetSlotsByBranchParams {
  branch_id?: string | null | void;
}

/** 'GetSlotsByBranch' return type */
export interface IGetSlotsByBranchResult {
  assigned_barber: string;
  branch_id: string;
  id: string;
  slot_id: string;
  status: string;
}

/** 'GetSlotsByBranch' query type */
export interface IGetSlotsByBranchQuery {
  params: IGetSlotsByBranchParams;
  result: IGetSlotsByBranchResult;
}

const getSlotsByBranchIR: any = {"usedParamSet":{"branch_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":51}]}],"statement":"SELECT * FROM pos_slots WHERE branch_id = :branch_id ORDER BY slot_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_slots WHERE branch_id = :branch_id ORDER BY slot_id
 * ```
 */
export const getSlotsByBranch = new PreparedQuery<IGetSlotsByBranchParams,IGetSlotsByBranchResult>(getSlotsByBranchIR);


/** 'GetSlotsByBarber' parameters type */
export interface IGetSlotsByBarberParams {
  assigned_barber?: string | null | void;
}

/** 'GetSlotsByBarber' return type */
export interface IGetSlotsByBarberResult {
  assigned_barber: string;
  branch_id: string;
  id: string;
  slot_id: string;
  status: string;
}

/** 'GetSlotsByBarber' query type */
export interface IGetSlotsByBarberQuery {
  params: IGetSlotsByBarberParams;
  result: IGetSlotsByBarberResult;
}

const getSlotsByBarberIR: any = {"usedParamSet":{"assigned_barber":true},"params":[{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":63}]}],"statement":"SELECT * FROM pos_slots WHERE assigned_barber = :assigned_barber ORDER BY slot_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_slots WHERE assigned_barber = :assigned_barber ORDER BY slot_id
 * ```
 */
export const getSlotsByBarber = new PreparedQuery<IGetSlotsByBarberParams,IGetSlotsByBarberResult>(getSlotsByBarberIR);


/** 'GetSlotsByStatus' parameters type */
export interface IGetSlotsByStatusParams {
  status?: string | null | void;
}

/** 'GetSlotsByStatus' return type */
export interface IGetSlotsByStatusResult {
  assigned_barber: string;
  branch_id: string;
  id: string;
  slot_id: string;
  status: string;
}

/** 'GetSlotsByStatus' query type */
export interface IGetSlotsByStatusQuery {
  params: IGetSlotsByStatusParams;
  result: IGetSlotsByStatusResult;
}

const getSlotsByStatusIR: any = {"usedParamSet":{"status":true},"params":[{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":45}]}],"statement":"SELECT * FROM pos_slots WHERE status = :status ORDER BY branch_id, slot_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_slots WHERE status = :status ORDER BY branch_id, slot_id
 * ```
 */
export const getSlotsByStatus = new PreparedQuery<IGetSlotsByStatusParams,IGetSlotsByStatusResult>(getSlotsByStatusIR);


/** 'GetAvailableSlotsByBranch' parameters type */
export interface IGetAvailableSlotsByBranchParams {
  branch_id?: string | null | void;
}

/** 'GetAvailableSlotsByBranch' return type */
export interface IGetAvailableSlotsByBranchResult {
  assigned_barber: string;
  branch_id: string;
  id: string;
  slot_id: string;
  status: string;
}

/** 'GetAvailableSlotsByBranch' query type */
export interface IGetAvailableSlotsByBranchQuery {
  params: IGetAvailableSlotsByBranchParams;
  result: IGetAvailableSlotsByBranchResult;
}

const getAvailableSlotsByBranchIR: any = {"usedParamSet":{"branch_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":51}]}],"statement":"SELECT * FROM pos_slots WHERE branch_id = :branch_id AND status = 'available' ORDER BY slot_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pos_slots WHERE branch_id = :branch_id AND status = 'available' ORDER BY slot_id
 * ```
 */
export const getAvailableSlotsByBranch = new PreparedQuery<IGetAvailableSlotsByBranchParams,IGetAvailableSlotsByBranchResult>(getAvailableSlotsByBranchIR);


/** 'UpdateSlot' parameters type */
export interface IUpdateSlotParams {
  assigned_barber?: string | null | void;
  branch_id?: string | null | void;
  id?: string | null | void;
  slot_id?: string | null | void;
  status?: string | null | void;
}

/** 'UpdateSlot' return type */
export type IUpdateSlotResult = void;

/** 'UpdateSlot' query type */
export interface IUpdateSlotQuery {
  params: IUpdateSlotParams;
  result: IUpdateSlotResult;
}

const updateSlotIR: any = {"usedParamSet":{"branch_id":true,"slot_id":true,"assigned_barber":true,"status":true,"id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":43}]},{"name":"slot_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":67}]},{"name":"assigned_barber","required":false,"transform":{"type":"scalar"},"locs":[{"a":92,"b":107}]},{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":123,"b":129}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":142,"b":144}]}],"statement":"UPDATE pos_slots \nSET branch_id = :branch_id,\n    slot_id = :slot_id,\n    assigned_barber = :assigned_barber,\n    status = :status\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE pos_slots 
 * SET branch_id = :branch_id,
 *     slot_id = :slot_id,
 *     assigned_barber = :assigned_barber,
 *     status = :status
 * WHERE id = :id
 * ```
 */
export const updateSlot = new PreparedQuery<IUpdateSlotParams,IUpdateSlotResult>(updateSlotIR);


/** 'UpdateSlotStatus' parameters type */
export interface IUpdateSlotStatusParams {
  id?: string | null | void;
  status?: string | null | void;
}

/** 'UpdateSlotStatus' return type */
export type IUpdateSlotStatusResult = void;

/** 'UpdateSlotStatus' query type */
export interface IUpdateSlotStatusQuery {
  params: IUpdateSlotStatusParams;
  result: IUpdateSlotStatusResult;
}

const updateSlotStatusIR: any = {"usedParamSet":{"status":true,"id":true},"params":[{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":37}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":52}]}],"statement":"UPDATE pos_slots \nSET status = :status\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE pos_slots 
 * SET status = :status
 * WHERE id = :id
 * ```
 */
export const updateSlotStatus = new PreparedQuery<IUpdateSlotStatusParams,IUpdateSlotStatusResult>(updateSlotStatusIR);


/** 'DeleteSlot' parameters type */
export interface IDeleteSlotParams {
  id?: string | null | void;
}

/** 'DeleteSlot' return type */
export type IDeleteSlotResult = void;

/** 'DeleteSlot' query type */
export interface IDeleteSlotQuery {
  params: IDeleteSlotParams;
  result: IDeleteSlotResult;
}

const deleteSlotIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":33,"b":35}]}],"statement":"DELETE FROM pos_slots WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM pos_slots WHERE id = :id
 * ```
 */
export const deleteSlot = new PreparedQuery<IDeleteSlotParams,IDeleteSlotResult>(deleteSlotIR);


