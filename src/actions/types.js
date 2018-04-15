export const SET_APP_STATE = "SET_APP_STATE"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const ERROR = "ERROR"
export const SUCCESS = "SUCCESS"
export const WARNING = "WARNING"

export const LISTS = {
    "videos": {url: "/api/videos/", filters: {}, generateReducer: true},
    "comments": {url: "/api/comments/", filters: {}, generateReducer: true}
};
