/** Types generated for queries found in "src/queries/barbers/barbers.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

export type stringArray = (string)[];

/** 'CreateBarber' parameters type */
export interface ICreateBarberParams {
  address?: string | null | void;
  barber_id?: string | null | void;
  branch_id?: string | null | void;
  commission?: NumberOrString | null | void;
  date_availability?: string | null | void;
  email_address?: string | null | void;
  full_name?: string | null | void;
  picture?: Buffer | null | void;
  position?: string | null | void;
  social_media?: string | null | void;
}

/** 'CreateBarber' return type */
export interface ICreateBarberResult {
  address: string | null;
  barber_id: string;
  branch_id: string | null;
  commission: string | null;
  date_availability: string | null;
  email_address: string | null;
  full_name: string;
  picture: Buffer | null;
  position: string | null;
  social_media: string | null;
}

/** 'CreateBarber' query type */
export interface ICreateBarberQuery {
  params: ICreateBarberParams;
  result: ICreateBarberResult;
}

const createBarberIR: any = {"usedParamSet":{"barber_id":true,"branch_id":true,"position":true,"full_name":true,"address":true,"commission":true,"picture":true,"social_media":true,"email_address":true,"date_availability":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":154,"b":163}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":166,"b":175}]},{"name":"position","required":false,"transform":{"type":"scalar"},"locs":[{"a":178,"b":186}]},{"name":"full_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":189,"b":198}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":201,"b":208}]},{"name":"commission","required":false,"transform":{"type":"scalar"},"locs":[{"a":211,"b":221}]},{"name":"picture","required":false,"transform":{"type":"scalar"},"locs":[{"a":224,"b":231}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":234,"b":246}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":249,"b":262}]},{"name":"date_availability","required":false,"transform":{"type":"scalar"},"locs":[{"a":265,"b":282}]}],"statement":"INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, picture, social_media, email_address, date_availability)\nVALUES (:barber_id, :branch_id, :position, :full_name, :address, :commission, :picture, :social_media, :email_address, :date_availability)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, picture, social_media, email_address, date_availability)
 * VALUES (:barber_id, :branch_id, :position, :full_name, :address, :commission, :picture, :social_media, :email_address, :date_availability)
 * RETURNING *
 * ```
 */
export const createBarber = new PreparedQuery<ICreateBarberParams,ICreateBarberResult>(createBarberIR);


/** 'GetAllBarbers' parameters type */
export type IGetAllBarbersParams = void;

/** 'GetAllBarbers' return type */
export interface IGetAllBarbersResult {
  address: string | null;
  barber_id: string;
  branch_id: string | null;
  commission: string | null;
  date_availability: string | null;
  email_address: string | null;
  full_name: string;
  picture: Buffer | null;
  position: string | null;
  social_media: string | null;
}

/** 'GetAllBarbers' query type */
export interface IGetAllBarbersQuery {
  params: IGetAllBarbersParams;
  result: IGetAllBarbersResult;
}

const getAllBarbersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_barbers ORDER BY full_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_barbers ORDER BY full_name
 * ```
 */
export const getAllBarbers = new PreparedQuery<IGetAllBarbersParams,IGetAllBarbersResult>(getAllBarbersIR);


/** 'GetBarberById' parameters type */
export interface IGetBarberByIdParams {
  barber_id?: string | null | void;
}

/** 'GetBarberById' return type */
export interface IGetBarberByIdResult {
  address: string | null;
  barber_id: string;
  branch_id: string | null;
  branch_ids: stringArray | null;
  commission: string | null;
  date_availability: string | null;
  email_address: string | null;
  full_name: string;
  picture: Buffer | null;
  position: string | null;
  social_media: string | null;
}

/** 'GetBarberById' query type */
export interface IGetBarberByIdQuery {
  params: IGetBarberByIdParams;
  result: IGetBarberByIdResult;
}

const getBarberByIdIR: any = {"usedParamSet":{"barber_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":179,"b":188}]}],"statement":"SELECT b.*,\n    ARRAY(SELECT bb.branch_id FROM bph_barber_branches bb WHERE bb.barber_id = b.barber_id ORDER BY bb.branch_id) AS branch_ids\nFROM bph_barbers b\nWHERE b.barber_id = :barber_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT b.*,
 *     ARRAY(SELECT bb.branch_id FROM bph_barber_branches bb WHERE bb.barber_id = b.barber_id ORDER BY bb.branch_id) AS branch_ids
 * FROM bph_barbers b
 * WHERE b.barber_id = :barber_id
 * ```
 */
export const getBarberById = new PreparedQuery<IGetBarberByIdParams,IGetBarberByIdResult>(getBarberByIdIR);


/** 'GetBarbersByBranch' parameters type */
export interface IGetBarbersByBranchParams {
  branch_id?: string | null | void;
}

/** 'GetBarbersByBranch' return type */
export interface IGetBarbersByBranchResult {
  address: string | null;
  barber_id: string;
  branch_id: string | null;
  commission: string | null;
  date_availability: string | null;
  email_address: string | null;
  full_name: string;
  picture: Buffer | null;
  position: string | null;
  social_media: string | null;
}

/** 'GetBarbersByBranch' query type */
export interface IGetBarbersByBranchQuery {
  params: IGetBarbersByBranchParams;
  result: IGetBarbersByBranchResult;
}

const getBarbersByBranchIR: any = {"usedParamSet":{"branch_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":109,"b":118}]}],"statement":"SELECT b.* FROM bph_barbers b\nJOIN bph_barber_branches bb ON bb.barber_id = b.barber_id\nWHERE bb.branch_id = :branch_id\nORDER BY b.full_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT b.* FROM bph_barbers b
 * JOIN bph_barber_branches bb ON bb.barber_id = b.barber_id
 * WHERE bb.branch_id = :branch_id
 * ORDER BY b.full_name
 * ```
 */
export const getBarbersByBranch = new PreparedQuery<IGetBarbersByBranchParams,IGetBarbersByBranchResult>(getBarbersByBranchIR);


/** 'GetBarbersByPosition' parameters type */
export interface IGetBarbersByPositionParams {
  position?: string | null | void;
}

/** 'GetBarbersByPosition' return type */
export interface IGetBarbersByPositionResult {
  address: string | null;
  barber_id: string;
  branch_id: string | null;
  commission: string | null;
  date_availability: string | null;
  email_address: string | null;
  full_name: string;
  picture: Buffer | null;
  position: string | null;
  social_media: string | null;
}

/** 'GetBarbersByPosition' query type */
export interface IGetBarbersByPositionQuery {
  params: IGetBarbersByPositionParams;
  result: IGetBarbersByPositionResult;
}

const getBarbersByPositionIR: any = {"usedParamSet":{"position":true},"params":[{"name":"position","required":false,"transform":{"type":"scalar"},"locs":[{"a":43,"b":51}]}],"statement":"SELECT * FROM bph_barbers WHERE position = :position ORDER BY full_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_barbers WHERE position = :position ORDER BY full_name
 * ```
 */
export const getBarbersByPosition = new PreparedQuery<IGetBarbersByPositionParams,IGetBarbersByPositionResult>(getBarbersByPositionIR);


/** 'UpdateBarber' parameters type */
export interface IUpdateBarberParams {
  address?: string | null | void;
  barber_id?: string | null | void;
  branch_id?: string | null | void;
  commission?: NumberOrString | null | void;
  date_availability?: string | null | void;
  email_address?: string | null | void;
  full_name?: string | null | void;
  picture?: Buffer | null | void;
  position?: string | null | void;
  social_media?: string | null | void;
}

/** 'UpdateBarber' return type */
export interface IUpdateBarberResult {
  address: string | null;
  barber_id: string;
  branch_id: string | null;
  commission: string | null;
  date_availability: string | null;
  email_address: string | null;
  full_name: string;
  picture: Buffer | null;
  position: string | null;
  social_media: string | null;
}

/** 'UpdateBarber' query type */
export interface IUpdateBarberQuery {
  params: IUpdateBarberParams;
  result: IUpdateBarberResult;
}

const updateBarberIR: any = {"usedParamSet":{"branch_id":true,"position":true,"full_name":true,"address":true,"commission":true,"picture":true,"social_media":true,"email_address":true,"date_availability":true,"barber_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":36,"b":45}]},{"name":"position","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":71}]},{"name":"full_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":90,"b":99}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":116,"b":123}]},{"name":"commission","required":false,"transform":{"type":"scalar"},"locs":[{"a":143,"b":153}]},{"name":"picture","required":false,"transform":{"type":"scalar"},"locs":[{"a":170,"b":177}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":199,"b":211}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":234,"b":247}]},{"name":"date_availability","required":false,"transform":{"type":"scalar"},"locs":[{"a":274,"b":291}]},{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":311,"b":320}]}],"statement":"UPDATE bph_barbers \nSET branch_id = :branch_id,\n    position = :position,\n    full_name = :full_name,\n    address = :address,\n    commission = :commission,\n    picture = :picture,\n    social_media = :social_media,\n    email_address = :email_address,\n    date_availability = :date_availability\nWHERE barber_id = :barber_id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_barbers 
 * SET branch_id = :branch_id,
 *     position = :position,
 *     full_name = :full_name,
 *     address = :address,
 *     commission = :commission,
 *     picture = :picture,
 *     social_media = :social_media,
 *     email_address = :email_address,
 *     date_availability = :date_availability
 * WHERE barber_id = :barber_id
 * RETURNING *
 * ```
 */
export const updateBarber = new PreparedQuery<IUpdateBarberParams,IUpdateBarberResult>(updateBarberIR);


/** 'DeleteBarber' parameters type */
export interface IDeleteBarberParams {
  barber_id?: string | null | void;
}

/** 'DeleteBarber' return type */
export interface IDeleteBarberResult {
  address: string | null;
  barber_id: string;
  branch_id: string | null;
  commission: string | null;
  date_availability: string | null;
  email_address: string | null;
  full_name: string;
  picture: Buffer | null;
  position: string | null;
  social_media: string | null;
}

/** 'DeleteBarber' query type */
export interface IDeleteBarberQuery {
  params: IDeleteBarberParams;
  result: IDeleteBarberResult;
}

const deleteBarberIR: any = {"usedParamSet":{"barber_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":51}]}],"statement":"DELETE FROM bph_barbers WHERE barber_id = :barber_id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_barbers WHERE barber_id = :barber_id
 * RETURNING *
 * ```
 */
export const deleteBarber = new PreparedQuery<IDeleteBarberParams,IDeleteBarberResult>(deleteBarberIR);


/** 'AssignBarberToBranch' parameters type */
export interface IAssignBarberToBranchParams {
  barber_id?: string | null | void;
  branch_id?: string | null | void;
}

/** 'AssignBarberToBranch' return type */
export interface IAssignBarberToBranchResult {
  barber_id: string;
  branch_id: string;
}

/** 'AssignBarberToBranch' query type */
export interface IAssignBarberToBranchQuery {
  params: IAssignBarberToBranchParams;
  result: IAssignBarberToBranchResult;
}

const assignBarberToBranchIR: any = {"usedParamSet":{"barber_id":true,"branch_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":72}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":75,"b":84}]}],"statement":"INSERT INTO bph_barber_branches (barber_id, branch_id)\nVALUES (:barber_id, :branch_id)\nON CONFLICT DO NOTHING\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_barber_branches (barber_id, branch_id)
 * VALUES (:barber_id, :branch_id)
 * ON CONFLICT DO NOTHING
 * RETURNING *
 * ```
 */
export const assignBarberToBranch = new PreparedQuery<IAssignBarberToBranchParams,IAssignBarberToBranchResult>(assignBarberToBranchIR);


/** 'UnassignBarberFromBranch' parameters type */
export interface IUnassignBarberFromBranchParams {
  barber_id?: string | null | void;
  branch_id?: string | null | void;
}

/** 'UnassignBarberFromBranch' return type */
export interface IUnassignBarberFromBranchResult {
  barber_id: string;
  branch_id: string;
}

/** 'UnassignBarberFromBranch' query type */
export interface IUnassignBarberFromBranchQuery {
  params: IUnassignBarberFromBranchParams;
  result: IUnassignBarberFromBranchResult;
}

const unassignBarberFromBranchIR: any = {"usedParamSet":{"barber_id":true,"branch_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":59}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":77,"b":86}]}],"statement":"DELETE FROM bph_barber_branches WHERE barber_id = :barber_id AND branch_id = :branch_id\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_barber_branches WHERE barber_id = :barber_id AND branch_id = :branch_id
 * RETURNING *
 * ```
 */
export const unassignBarberFromBranch = new PreparedQuery<IUnassignBarberFromBranchParams,IUnassignBarberFromBranchResult>(unassignBarberFromBranchIR);


/** 'GetBranchesByBarber' parameters type */
export interface IGetBranchesByBarberParams {
  barber_id?: string | null | void;
}

/** 'GetBranchesByBarber' return type */
export interface IGetBranchesByBarberResult {
  branch_address: string;
  branch_id: string;
  branch_image: Buffer | null;
  branch_location: string;
  branch_owner: string;
  established_at: Date;
  social_media: string | null;
}

/** 'GetBranchesByBarber' query type */
export interface IGetBranchesByBarberQuery {
  params: IGetBranchesByBarberParams;
  result: IGetBranchesByBarberResult;
}

const getBranchesByBarberIR: any = {"usedParamSet":{"barber_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":113,"b":122}]}],"statement":"SELECT br.* FROM bph_branches br\nJOIN bph_barber_branches bb ON bb.branch_id = br.branch_id\nWHERE bb.barber_id = :barber_id\nORDER BY br.branch_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT br.* FROM bph_branches br
 * JOIN bph_barber_branches bb ON bb.branch_id = br.branch_id
 * WHERE bb.barber_id = :barber_id
 * ORDER BY br.branch_id
 * ```
 */
export const getBranchesByBarber = new PreparedQuery<IGetBranchesByBarberParams,IGetBranchesByBarberResult>(getBranchesByBarberIR);


