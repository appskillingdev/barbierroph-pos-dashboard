/** Types generated for queries found in "src/queries/users/users.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  complete_address?: string | null | void;
  contact_number?: string | null | void;
  email_address?: string | null | void;
  full_name?: string | null | void;
  full_picture?: Buffer | null | void;
  ID?: string | null | void;
  password?: string | null | void;
  social_media?: string | null | void;
  user_id?: string | null | void;
  user_type?: string | null | void;
}

/** 'CreateUser' return type */
export type ICreateUserResult = void;

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"ID":true,"user_id":true,"email_address":true,"password":true,"full_name":true,"user_type":true,"full_picture":true,"social_media":true,"complete_address":true,"contact_number":true},"params":[{"name":"ID","required":false,"transform":{"type":"scalar"},"locs":[{"a":155,"b":157}]},{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":160,"b":167}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":170,"b":183}]},{"name":"password","required":false,"transform":{"type":"scalar"},"locs":[{"a":186,"b":194}]},{"name":"full_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":197,"b":206}]},{"name":"user_type","required":false,"transform":{"type":"scalar"},"locs":[{"a":209,"b":218}]},{"name":"full_picture","required":false,"transform":{"type":"scalar"},"locs":[{"a":221,"b":233}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":236,"b":248}]},{"name":"complete_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":251,"b":267}]},{"name":"contact_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":270,"b":284}]}],"statement":"INSERT INTO bph_users (\"ID\", user_id, email_address, password, full_name, user_type, full_picture, social_media, complete_address, contact_number)\nVALUES (:ID, :user_id, :email_address, :password, :full_name, :user_type, :full_picture, :social_media, :complete_address, :contact_number)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, user_type, full_picture, social_media, complete_address, contact_number)
 * VALUES (:ID, :user_id, :email_address, :password, :full_name, :user_type, :full_picture, :social_media, :complete_address, :contact_number)
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


/** 'GetAllUsers' parameters type */
export type IGetAllUsersParams = void;

/** 'GetAllUsers' return type */
export interface IGetAllUsersResult {
  complete_address: string | null;
  contact_number: string | null;
  created_at: Date;
  email_address: string;
  full_name: string;
  full_picture: Buffer | null;
  ID: string;
  password: string;
  social_media: string | null;
  user_id: string;
  user_type: string | null;
}

/** 'GetAllUsers' query type */
export interface IGetAllUsersQuery {
  params: IGetAllUsersParams;
  result: IGetAllUsersResult;
}

const getAllUsersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM bph_users ORDER BY created_at DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_users ORDER BY created_at DESC
 * ```
 */
export const getAllUsers = new PreparedQuery<IGetAllUsersParams,IGetAllUsersResult>(getAllUsersIR);


/** 'GetUserById' parameters type */
export interface IGetUserByIdParams {
  ID?: string | null | void;
}

/** 'GetUserById' return type */
export interface IGetUserByIdResult {
  complete_address: string | null;
  contact_number: string | null;
  created_at: Date;
  email_address: string;
  full_name: string;
  full_picture: Buffer | null;
  ID: string;
  password: string;
  social_media: string | null;
  user_id: string;
  user_type: string | null;
}

/** 'GetUserById' query type */
export interface IGetUserByIdQuery {
  params: IGetUserByIdParams;
  result: IGetUserByIdResult;
}

const getUserByIdIR: any = {"usedParamSet":{"ID":true},"params":[{"name":"ID","required":false,"transform":{"type":"scalar"},"locs":[{"a":37,"b":39}]}],"statement":"SELECT * FROM bph_users WHERE \"ID\" = :ID"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_users WHERE "ID" = :ID
 * ```
 */
export const getUserById = new PreparedQuery<IGetUserByIdParams,IGetUserByIdResult>(getUserByIdIR);


/** 'GetUserByUserId' parameters type */
export interface IGetUserByUserIdParams {
  user_id?: string | null | void;
}

/** 'GetUserByUserId' return type */
export interface IGetUserByUserIdResult {
  complete_address: string | null;
  contact_number: string | null;
  created_at: Date;
  email_address: string;
  full_name: string;
  full_picture: Buffer | null;
  ID: string;
  password: string;
  social_media: string | null;
  user_id: string;
  user_type: string | null;
}

/** 'GetUserByUserId' query type */
export interface IGetUserByUserIdQuery {
  params: IGetUserByUserIdParams;
  result: IGetUserByUserIdResult;
}

const getUserByUserIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":47}]}],"statement":"SELECT * FROM bph_users WHERE user_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_users WHERE user_id = :user_id
 * ```
 */
export const getUserByUserId = new PreparedQuery<IGetUserByUserIdParams,IGetUserByUserIdResult>(getUserByUserIdIR);


/** 'GetUserByEmail' parameters type */
export interface IGetUserByEmailParams {
  email_address?: string | null | void;
}

/** 'GetUserByEmail' return type */
export interface IGetUserByEmailResult {
  complete_address: string | null;
  contact_number: string | null;
  created_at: Date;
  email_address: string;
  full_name: string;
  full_picture: Buffer | null;
  ID: string;
  password: string;
  social_media: string | null;
  user_id: string;
  user_type: string | null;
}

/** 'GetUserByEmail' query type */
export interface IGetUserByEmailQuery {
  params: IGetUserByEmailParams;
  result: IGetUserByEmailResult;
}

const getUserByEmailIR: any = {"usedParamSet":{"email_address":true},"params":[{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":59}]}],"statement":"SELECT * FROM bph_users WHERE email_address = :email_address"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM bph_users WHERE email_address = :email_address
 * ```
 */
export const getUserByEmail = new PreparedQuery<IGetUserByEmailParams,IGetUserByEmailResult>(getUserByEmailIR);


/** 'UpdateUser' parameters type */
export interface IUpdateUserParams {
  complete_address?: string | null | void;
  contact_number?: string | null | void;
  email_address?: string | null | void;
  full_name?: string | null | void;
  full_picture?: Buffer | null | void;
  ID?: string | null | void;
  social_media?: string | null | void;
  user_id?: string | null | void;
  user_type?: string | null | void;
}

/** 'UpdateUser' return type */
export type IUpdateUserResult = void;

/** 'UpdateUser' query type */
export interface IUpdateUserQuery {
  params: IUpdateUserParams;
  result: IUpdateUserResult;
}

const updateUserIR: any = {"usedParamSet":{"user_id":true,"email_address":true,"full_name":true,"full_picture":true,"user_type":true,"social_media":true,"complete_address":true,"contact_number":true,"ID":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":32,"b":39}]},{"name":"email_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":62,"b":75}]},{"name":"full_name","required":false,"transform":{"type":"scalar"},"locs":[{"a":94,"b":103}]},{"name":"full_picture","required":false,"transform":{"type":"scalar"},"locs":[{"a":125,"b":137}]},{"name":"user_type","required":false,"transform":{"type":"scalar"},"locs":[{"a":156,"b":165}]},{"name":"social_media","required":false,"transform":{"type":"scalar"},"locs":[{"a":187,"b":199}]},{"name":"complete_address","required":false,"transform":{"type":"scalar"},"locs":[{"a":225,"b":241}]},{"name":"contact_number","required":false,"transform":{"type":"scalar"},"locs":[{"a":265,"b":279}]},{"name":"ID","required":false,"transform":{"type":"scalar"},"locs":[{"a":294,"b":296}]}],"statement":"UPDATE bph_users \nSET user_id = :user_id,\n    email_address = :email_address,\n    full_name = :full_name,\n    full_picture = :full_picture,\n    user_type = :user_type,\n    social_media = :social_media,\n    complete_address = :complete_address,\n    contact_number = :contact_number\nWHERE \"ID\" = :ID"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_users 
 * SET user_id = :user_id,
 *     email_address = :email_address,
 *     full_name = :full_name,
 *     full_picture = :full_picture,
 *     user_type = :user_type,
 *     social_media = :social_media,
 *     complete_address = :complete_address,
 *     contact_number = :contact_number
 * WHERE "ID" = :ID
 * ```
 */
export const updateUser = new PreparedQuery<IUpdateUserParams,IUpdateUserResult>(updateUserIR);


/** 'UpdateUserPassword' parameters type */
export interface IUpdateUserPasswordParams {
  ID?: string | null | void;
  password?: string | null | void;
}

/** 'UpdateUserPassword' return type */
export type IUpdateUserPasswordResult = void;

/** 'UpdateUserPassword' query type */
export interface IUpdateUserPasswordQuery {
  params: IUpdateUserPasswordParams;
  result: IUpdateUserPasswordResult;
}

const updateUserPasswordIR: any = {"usedParamSet":{"password":true,"ID":true},"params":[{"name":"password","required":false,"transform":{"type":"scalar"},"locs":[{"a":33,"b":41}]},{"name":"ID","required":false,"transform":{"type":"scalar"},"locs":[{"a":56,"b":58}]}],"statement":"UPDATE bph_users \nSET password = :password\nWHERE \"ID\" = :ID"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE bph_users 
 * SET password = :password
 * WHERE "ID" = :ID
 * ```
 */
export const updateUserPassword = new PreparedQuery<IUpdateUserPasswordParams,IUpdateUserPasswordResult>(updateUserPasswordIR);


/** 'DeleteUser' parameters type */
export interface IDeleteUserParams {
  ID?: string | null | void;
}

/** 'DeleteUser' return type */
export type IDeleteUserResult = void;

/** 'DeleteUser' query type */
export interface IDeleteUserQuery {
  params: IDeleteUserParams;
  result: IDeleteUserResult;
}

const deleteUserIR: any = {"usedParamSet":{"ID":true},"params":[{"name":"ID","required":false,"transform":{"type":"scalar"},"locs":[{"a":35,"b":37}]}],"statement":"DELETE FROM bph_users WHERE \"ID\" = :ID"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM bph_users WHERE "ID" = :ID
 * ```
 */
export const deleteUser = new PreparedQuery<IDeleteUserParams,IDeleteUserResult>(deleteUserIR);


