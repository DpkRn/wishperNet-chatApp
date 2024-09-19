export const HOST=import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTES='api/auth';
export const CONTACTS_ROUTES='api/contacts';
export const MESSAGE_ROUTES='api/messages';


export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`;
export const GET_USER_INFO=`${AUTH_ROUTES}/userinfo`;
export const UPDATE_PROFILE_INFO=`${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE=`${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE=`${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT=`${AUTH_ROUTES}/logout`;
export const SEARCH_CONTACTS=`${CONTACTS_ROUTES}/search`;
export const GET_ALL_MESSAGES_ROUTE=`${MESSAGE_ROUTES}/get-messages`;

