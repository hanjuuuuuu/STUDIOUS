import axios from "axios";
const baseURL =
  "http://ec2-54-180-201-100.ap-northeast-2.compute.amazonaws.com:8080";

const request = async ({ url, method, body, params, token }) => {
  try {
    const config = {
      baseURL,
      params,
      headers: {},
    };
    if (token && config.headers) {
      config.headers["Authorization"] = token;
    }
    const data =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "patch" && (await axios.patch(url, body, config))) ||
      (method === "put" && (await axios.put(url, body, config))) ||
      (method === "delete" &&
        (await axios.delete(url, {
          baseURL,
          params,
          headers: { Authorization: token },
          data: body,
        }))) ||
      {};
    return data;
  } catch (error) {
    throw error;
  }
};

export const GET = (url, token) => request({ url, method: "get", token });
export const POST = (url, body, token) =>
  request({ url, method: "post", body, token });
export const PATCH = (url, body, token) =>
  request({ url, method: "patch", body, token });
export const PUT = (url, body, token) =>
  request({ url, method: "put", body, token });
export const DELETE = (url, body, token) =>
  request({ url, method: "delete", body, token });
