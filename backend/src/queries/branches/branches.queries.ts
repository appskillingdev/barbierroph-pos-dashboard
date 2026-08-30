/** Types generated for queries found in "src/queries/branches/branches.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'CreateBranch' parameters type */
export interface ICreateBranchParams {
  branch_address?: string | null | void;
  branch_id?: string | null | void;
  branch_image?: Buffer | null | void;
  branch_location?: string | null | void;
  branch_owner?: string | null | void;
  established_at?: DateOrString | null | void;
  social_media?: string | null | void;
}

/** 'CreateBranch' return type */
export type ICreateBranchResult = void;

/** 'CreateBranch' query type */
export interface ICreateBranchQuery {
  params: ICreateBranchParams;
  result: ICreateBranchResult;
}

const createBranchIR: any = {"usedParamSet":{"branch_id":true,"branch_owner":true,"established_at":true,"branch_location":true,"branch_address":true,"branch_image":true,"social_media":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":136,"b":145}]},{"name":"branch_owner","required":false,"transform":{"type":"scalar"},"locs":[{"a":148,"b":160}]},{"name":"established_at","required":false,"transform":{"type":"scalar"},"locs":[{"a":163,"b":177}]},{"name":"branch_location","required":false,"transform":{"type":"scalar"},"locs":[{"a":180,"b":195}]},{"name":"branch_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":198,"b":212}]},{"name":"branch_image","required":false,"transform":{"type":"scalar"},"locs":[{"a":215,"b":227}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":230,"b":242}]}],"statement":"INSERT INTO bph_branches (branch_id, branch_owner, established_at, branch_location, branch_address, branch_image, social_media)\nVALUES (:branch_id, :branch_owner, :established_at, :branch_location, :branch_address, :branch_image, :social_media)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_branches (branch_id, branch_owner, established_at, branch_location, branch_address, branch_image, social_media)
 * VALUES (:branch_id, :branch_owner, :established_at, :branch_location, :branch_address, :branch_image, :social_media)
 * ```
 */
export const createBranch = new PreparedQuery<ICreateBranchParams,ICreateBranchResult>(createBranchIR);


/** 'GetAllBranches' parameters type */
export type IGetAllBranchesParams = void;

/** 'GetAllBranches' return type */
export interface IGetAllBranchesResult {
  branch_address: string;
  branch_id: string;
  branch_image: Buffer | null;
  branch_location: string;
  branch_owner: string;
  established_at: Date;
  social_media: string | null;
}

/** 'GetAllBranches' query type */
export interface IGetAllBranchesQuery {
  params: IGetAllBranchesParams;
  result: IGetAllBranchesResult;
}

const getAllBranchesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_branches ORDER BY branch_location"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_branches ORDER BY branch_location
 * ```
 */
export const getAllBranches = new PreparedQuery<IGetAllBranchesParams,IGetAllBranchesResult>(getAllBranchesIR);


/** 'GetBranchById' parameters type */
export interface IGetBranchByIdParams {
  branch_id?: string | null | void;
}

/** 'GetBranchById' return type */
export interface IGetBranchByIdResult {
  branch_address: string;
  branch_id: string;
  branch_image: Buffer | null;
  branch_location: string;
  branch_owner: string;
  established_at: Date;
  social_media: string | null;
}

/** 'GetBranchById' query type */
export interface IGetBranchByIdQuery {
  params: IGetBranchByIdParams;
  result: IGetBranchByIdResult;
}

const getBranchByIdIR: any = {"usedParamSet":{"branch_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":54}]}],"statement":"SELECT * FROM bph_branches WHERE branch_id = :branch_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_branches WHERE branch_id = :branch_id
 * ```
 */
export const getBranchById = new PreparedQuery<IGetBranchByIdParams,IGetBranchByIdResult>(getBranchByIdIR);


/** 'GetBranchesByOwner' parameters type */
export interface IGetBranchesByOwnerParams {
  branch_owner?: string | null | void;
}

/** 'GetBranchesByOwner' return type */
export interface IGetBranchesByOwnerResult {
  branch_address: string;
  branch_id: string;
  branch_image: Buffer | null;
  branch_location: string;
  branch_owner: string;
  established_at: Date;
  social_media: string | null;
}

/** 'GetBranchesByOwner' query type */
export interface IGetBranchesByOwnerQuery {
  params: IGetBranchesByOwnerParams;
  result: IGetBranchesByOwnerResult;
}

const getBranchesByOwnerIR: any = {"usedParamSet":{"branch_owner":true},"params":[{"name":"branch_owner","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":60}]}],"statement":"SELECT * FROM bph_branches WHERE branch_owner = :branch_owner ORDER BY established_at DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_branches WHERE branch_owner = :branch_owner ORDER BY established_at DESC
 * ```
 */
export const getBranchesByOwner = new PreparedQuery<IGetBranchesByOwnerParams,IGetBranchesByOwnerResult>(getBranchesByOwnerIR);


/** 'GetBranchesByLocation' parameters type */
export interface IGetBranchesByLocationParams {
  branch_location?: string | null | void;
}

/** 'GetBranchesByLocation' return type */
export interface IGetBranchesByLocationResult {
  branch_address: string;
  branch_id: string;
  branch_image: Buffer | null;
  branch_location: string;
  branch_owner: string;
  established_at: Date;
  social_media: string | null;
}

/** 'GetBranchesByLocation' query type */
export interface IGetBranchesByLocationQuery {
  params: IGetBranchesByLocationParams;
  result: IGetBranchesByLocationResult;
}

const getBranchesByLocationIR: any = {"usedParamSet":{"branch_location":true},"params":[{"name":"branch_location","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":66}]}],"statement":"SELECT * FROM bph_branches WHERE branch_location = :branch_location ORDER BY branch_address"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_branches WHERE branch_location = :branch_location ORDER BY branch_address
 * ```
 */
export const getBranchesByLocation = new PreparedQuery<IGetBranchesByLocationParams,IGetBranchesByLocationResult>(getBranchesByLocationIR);


/** 'UpdateBranch' parameters type */
export interface IUpdateBranchParams {
  branch_address?: string | null | void;
  branch_id?: string | null | void;
  branch_image?: Buffer | null | void;
  branch_location?: string | null | void;
  branch_owner?: string | null | void;
  established_at?: DateOrString | null | void;
  social_media?: string | null | void;
}

/** 'UpdateBranch' return type */
export type IUpdateBranchResult = void;

/** 'UpdateBranch' query type */
export interface IUpdateBranchQuery {
  params: IUpdateBranchParams;
  result: IUpdateBranchResult;
}

const updateBranchIR: any = {"usedParamSet":{"branch_owner":true,"established_at":true,"branch_location":true,"branch_address":true,"branch_image":true,"social_media":true,"branch_id":true},"params":[{"name":"branch_owner","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":52}]},{"name":"established_at","required":false,"transform":{"type":"scalar"},"locs":[{"a":76,"b":90}]},{"name":"branch_location","required":false,"transform":{"type":"scalar"},"locs":[{"a":115,"b":130}]},{"name":"branch_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":154,"b":168}]},{"name":"branch_image","required":false,"transform":{"type":"scalar"},"locs":[{"a":190,"b":202}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":224,"b":236}]},{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":256,"b":265}]}],"statement":"UPDATE bph_branches \nSET branch_owner = :branch_owner,\n    established_at = :established_at,\n    branch_location = :branch_location,\n    branch_address = :branch_address,\n    branch_image = :branch_image,\n    social_media = :social_media\nWHERE branch_id = :branch_id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_branches 
 * SET branch_owner = :branch_owner,
 *     established_at = :established_at,
 *     branch_location = :branch_location,
 *     branch_address = :branch_address,
 *     branch_image = :branch_image,
 *     social_media = :social_media
 * WHERE branch_id = :branch_id
 * ```
 */
export const updateBranch = new PreparedQuery<IUpdateBranchParams,IUpdateBranchResult>(updateBranchIR);


/** 'DeleteBranch' parameters type */
export interface IDeleteBranchParams {
  branch_id?: string | null | void;
}

/** 'DeleteBranch' return type */
export type IDeleteBranchResult = void;

/** 'DeleteBranch' query type */
export interface IDeleteBranchQuery {
  params: IDeleteBranchParams;
  result: IDeleteBranchResult;
}

const deleteBranchIR: any = {"usedParamSet":{"branch_id":true},"params":[{"name":"branch_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":43,"b":52}]}],"statement":"DELETE FROM bph_branches WHERE branch_id = :branch_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_branches WHERE branch_id = :branch_id
 * ```
 */
export const deleteBranch = new PreparedQuery<IDeleteBranchParams,IDeleteBranchResult>(deleteBranchIR);


