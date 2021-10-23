import {API} from '../../config/API/api.config';
import AuthStorage from '../AuthStorage';
export const BaseURL = API.endpoint + '/';
// const axios = require('axios').default;
import axios from 'axios'

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true
};

export const ApiGet = (type, header = defaultHeaders) => {
    return new Promise((resolve, reject) => {
        const s = type.includes('?') ? '&' : '?';
        axios.get(BaseURL + type + `${s}lang=ko`, getHttpOptions(header))
            .then((responseJson) => {
                resolve(responseJson.data);
                // console.log(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiDelete = (type, header = defaultHeaders) => {
    return new Promise((resolve, reject) => {
        const s = type.includes('?') ? '&' : '?';
        axios.delete(BaseURL + type + `${s}lang=ko`, getHttpOptions(header))
            .then((responseJson) => {
                resolve(responseJson.data);
                // console.log(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPut = (type,data) => {
    return new Promise((resolve, reject) => {
        const s = type.includes('?') ? '&' : '?';
        axios.put(BaseURL + type + `${s}lang=ko`,data,getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson.data);
                // console.log(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPatch = (type,data) => {
    return new Promise((resolve, reject) => {
        const s = type.includes('?') ? '&' : '?';
        axios.patch(BaseURL + type + `${s}lang=ko`,data,getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson.data);
                // console.log(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiGetNoAuth = (type) => {
    return new Promise((resolve, reject) => {
        const s = type.includes('?') ? '&' : '?';
        axios.get(BaseURL + type + `${s}lang=ko`, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    }) ;
}

export const ApiPost = (type, userData) => {
    return new Promise((resolve, reject) => {
        const s = type.includes('?') ? '&' : '?';
        axios.post(BaseURL + type + `${s}lang=ko`, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson.data);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    reject(error.response.data.message);
                } else {
                    reject();
                }
            });
    });
}



export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {
        Authorization: "",
        'Content-Type': "application/json",
    };

    if (options.hasOwnProperty('isAuth') && options.isAuth) {
        headers['Authorization'] = AuthStorage.getToken() ?? "";
    }

    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = {...headers, ...options.AdditionalParams};
    }

    return {headers}
}