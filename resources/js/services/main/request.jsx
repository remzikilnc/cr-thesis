function parseData(data){
    const formData = new FormData()
    for (let [key, value] of Object.entries(data)){
        formData.append(key,value)
    }
    return formData
}


function request(url, { data = false, method = "GET", type = "JSON", headers = {} }) {
    return new Promise(async (resolve, reject) => {
        const options = {
            method,
            headers: {
                ...headers,
            },
        };

        if (type === "JSON") {
            options.headers["Content-Type"] = "application/json; charset=utf8";
        }

        if (data && method === "POST") {
            options.body = type === "JSON" ? JSON.stringify(data) : parseData(data);
        }

        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok) {
            resolve(result);
        } else {
            reject(result);
        }
    });
}


export const post = (url, data, customHeaders = {}) => request(url, { data, method: "POST", type: "JSON", headers: customHeaders });
export const postData = (url, data, customHeaders = {}) => request(url, { data, method: "POST", type: "DATA", headers: customHeaders });
export const get = (url, customHeaders = {}) => request(url, { method: "GET", headers: customHeaders });
