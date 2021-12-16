// request.js

import { message } from "antd";
import { extend, RequestMethod } from "umi-request";

import { enhancedStorage } from "@/utils/persistenceQuery";
import { serializationQuery } from "@/utils/queryParamsParse";
type AnyType = any;
const authenticationQuery = enhancedStorage.get("query");
const getQuery = serializationQuery({ ...authenticationQuery }, false);

const HttpRequest = function ({
    url,
    method,
    params,
}: {
    url: string;
    method: string;
    params?: Record<string, AnyType>;
}): Promise<RequestMethod<false>> {
    const config = {
        method, // 请求方式
        params: method === "GET" || method === "get" ? params : {}, // 如果是get请求使用 params
        data: method === "POST" || method === "post" ? params : "", // 如果是post请求使用 data
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
        prefix: "", // 统一设置 url 前缀
        suffix: `?${getQuery}`, // 统一设置 url 后缀

        errorHandler: function (error: any) {
            // 异常
            const { status, statusText } = error.response;
            console.log(error);
            if (
                error.message === "Unauthorized" ||
                error.message === "未授权" ||
                status === 401
            ) {
                sessionStorage.clear();
                window.location.href = "/admin/applications";
            }
            message.error(statusText);
            throw error.response; // 将错误抛出，可在catch中捕获错误
        },
    };
    // console.log(urlParam + "请求参数:", config);
    const request = extend(config);
    // 注意这里的请求地址
    return request(url);
};

export default HttpRequest;
