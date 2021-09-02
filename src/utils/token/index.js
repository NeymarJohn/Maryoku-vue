import axios from "axios";

const TOKEN = "user_token";

export const setToken = token => localStorage.setItem(TOKEN, token);

export const getToken = () => localStorage.getItem(TOKEN);

export const deleteToken = () => localStorage.removeItem(TOKEN);

export const getReq = (endpoint, withoutToken = false) => {
    const getRequest = {
        method: "get",
        url: `${process.env.SERVER_URL}${endpoint}`,
    };
    if (
        window.localStorage.getItem("manage_id_token") &&
        window.localStorage.getItem("manage_id_token") !== "undefined" &&
        !withoutToken
    ) {
        getRequest["headers"] = { Authorization: `Bearer ${window.localStorage.getItem("manage_id_token")}` };
    }
    return axios(getRequest);
};
export const postReq = (endpoint, data) => {
    return axios({
        method: "post",
        url: `${process.env.SERVER_URL}${endpoint}`,
        headers: { Authorization: `Bearer ${window.localStorage.getItem("manage_id_token")}` },
        data,
    });
};
