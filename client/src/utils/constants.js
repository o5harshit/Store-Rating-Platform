export const HOST = import.meta.env.VITE_SERVER_URL;

//AUTH ROUTES
export const AUTH_ROUTES = `${HOST}/api/auth`
export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/Login`
export const GET_USER_INFO = `${AUTH_ROUTES}/userInfo`
export const LOGOUT_USER  = `${AUTH_ROUTES}/logout`
export const UPDATE_PASSWORD = `${AUTH_ROUTES}/updatePassword`



// ADMIN API ROUTES

export const ADMIN_ROUTES = `${HOST}/api/admin`;
export const ADMIN_DASHBOARD = `${ADMIN_ROUTES}/dashboard`;
export const GET_ALL_USERS = `${ADMIN_ROUTES}/getusers`;
// export const FILTER_USERS = `${ADMIN_ROUTES}/filterUsers`;
// export const FILTER_STORES = `${ADMIN_ROUTES}/filterStores`;
export const CREATE_USER = `${ADMIN_ROUTES}/createusers`;
export const CREATE_STORE = `${ADMIN_ROUTES}/createstores`;
export const GET_STORE_OWNERS = `${ADMIN_ROUTES}/getownerinfo`;
export const UPDATE_USER = `${ADMIN_ROUTES}/updateUserInfo`;
export const DELETE_USER = `${ADMIN_ROUTES}/deleteUser`;
export const UPDATE_STORE = `${ADMIN_ROUTES}/updateStore`;
export const DELETE_STORE = `${ADMIN_ROUTES}/deleteStore`;



// USER API ROUTES
export const USER_ROUTES = `${HOST}/api/user`;
export const SUBMIT_RATING = `${USER_ROUTES}/rating`;


// OWNER API ROUTES
export const OWNER_ROUTES = `${HOST}/api/owner`;
export const GET_STORE_RATINGS = `${OWNER_ROUTES}/ratings`;


// COMMON API ROUTES
export const COMMON_ROUTES = `${HOST}/api/common`;
export const FILTER_USERS = `${COMMON_ROUTES}/filterUsers`;
export const FILTER_STORES = `${COMMON_ROUTES}/filterStores`;





