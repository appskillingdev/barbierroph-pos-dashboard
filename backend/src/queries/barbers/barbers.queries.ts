/** Types generated for queries found in "src/queries/barbers/barbers.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'CreateBarber' parameters type */
export interface ICreateBarberParams {
  address?: string | null | void;
  barber_id?: string | null | void;
  branch_id?: string | null | void;
  commission?: NumberOrString | null | void;
  email_address?: string | null | void;
  full_name?: string | null | void;
  picture?: Buffer | null | void;
  position?: string | null | void;
  social_media?: string | null | void;
}

/** 'CreateBarber' return type */
export type ICreateBarberResult = void;

/** 'CreateBarber' query type */
export interface ICreateBarberQuery {
  params: ICreateBarberParams;
  result: ICreateBarberResult;
}

const createBarberIR: any = {"usedParamSet":{"barber_id":true,"branch_id":true,"position":true,"full_name":true,"address":true,"commission":true,"picture":true,"social_media":true,"email_address":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":135,"b":144}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":147,"b":156}]},{"name":"position","required":false,"transform":{"type":"scalar"},"locs":[{"a":159,"b":167}]},{"name":"full_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":170,"b":179}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":182,"b":189}]},{"name":"commission","required":false,"transform":{"type":"scalar"},"locs":[{"a":192,"b":202}]},{"name":"picture","required":false,"transform":{"type":"scalar"},"locs":[{"a":205,"b":212}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":215,"b":227}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":230,"b":243}]}],"statement":"INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, picture, social_media, email_address)\nVALUES (:barber_id, :branch_id, :position, :full_name, :address, :commission, :picture, :social_media, :email_address)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, picture, social_media, email_address)
 * VALUES (:barber_id, :branch_id, :position, :full_name, :address, :commission, :picture, :social_media, :email_address)
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
  commission: string | null;
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

const getBarberByIdIR: any = {"usedParamSet":{"barber_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":44,"b":53}]}],"statement":"SELECT * FROM bph_barbers WHERE barber_id = :barber_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_barbers WHERE barber_id = :barber_id
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

const getBarbersByBranchIR: any = {"usedParamSet":{"branch_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":44,"b":53}]}],"statement":"SELECT * FROM bph_barbers WHERE branch_id = :branch_id ORDER BY full_name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_barbers WHERE branch_id = :branch_id ORDER BY full_name
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
  email_address?: string | null | void;
  full_name?: string | null | void;
  picture?: Buffer | null | void;
  position?: string | null | void;
  social_media?: string | null | void;
}

/** 'UpdateBarber' return type */
export type IUpdateBarberResult = void;

/** 'UpdateBarber' query type */
export interface IUpdateBarberQuery {
  params: IUpdateBarberParams;
  result: IUpdateBarberResult;
}

const updateBarberIR: any = {"usedParamSet":{"branch_id":true,"position":true,"full_name":true,"address":true,"commission":true,"picture":true,"social_media":true,"email_address":true,"barber_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":36,"b":45}]},{"name":"position","required":false,"transform":{"type":"scalar"},"locs":[{"a":63,"b":71}]},{"name":"full_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":90,"b":99}]},{"name":"address","required":false,"transform":{"type":"scalar"},"locs":[{"a":116,"b":123}]},{"name":"commission","required":false,"transform":{"type":"scalar"},"locs":[{"a":143,"b":153}]},{"name":"picture","required":false,"transform":{"type":"scalar"},"locs":[{"a":170,"b":177}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":199,"b":211}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":234,"b":247}]},{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":267,"b":276}]}],"statement":"UPDATE bph_barbers \nSET branch_id = :branch_id,\n    position = :position,\n    full_name = :full_name,\n    address = :address,\n    commission = :commission,\n    picture = :picture,\n    social_media = :social_media,\n    email_address = :email_address\nWHERE barber_id = :barber_id"};

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
 *     email_address = :email_address
 * WHERE barber_id = :barber_id
 * ```
 */
export const updateBarber = new PreparedQuery<IUpdateBarberParams,IUpdateBarberResult>(updateBarberIR);


/** 'DeleteBarber' parameters type */
export interface IDeleteBarberParams {
  barber_id?: string | null | void;
}

/** 'DeleteBarber' return type */
export type IDeleteBarberResult = void;

/** 'DeleteBarber' query type */
export interface IDeleteBarberQuery {
  params: IDeleteBarberParams;
  result: IDeleteBarberResult;
}

const deleteBarberIR: any = {"usedParamSet":{"barber_id":true},"params":[{"name":"barber_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":51}]}],"statement":"DELETE FROM bph_barbers WHERE barber_id = :barber_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_barbers WHERE barber_id = :barber_id
 * ```
 */
export const deleteBarber = new PreparedQuery<IDeleteBarberParams,IDeleteBarberResult>(deleteBarberIR);


