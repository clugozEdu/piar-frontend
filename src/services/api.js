import axios from "axios";
import tokenRefresh from "@/common/hooks/use-token-refresh";

// const BASE_URL = "http://192.168.1.197/";
const BASE_URL = "http://52.200.125.6/";

/** Get Token
 * @returns {string} token - Token from localStorage
 */
const getToken = () => {
  const token = localStorage.getItem("token-advisor");
  return token || "";
};

/** Create headers
 * @param {boolean} isJson - Boolean to set the Content-Type
 * @returns {object} headers - Object with the headers
 */
const createHeaders = (isJson = true) => {
  const headers = {
    Authorization: getToken(),
  };

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

/** Handle error
 * @param {object} error - Object with the error data
 */
const handleError = (error) => {
  if (error.status === 401) {
    tokenRefresh(error);
  }

  throw error;
};

/** HTTP Request
 * @param {string} method - Method of the request
 * @param {string} path - Path of the request
 * @param {object} data - Data to send in the request
 * @param {boolean} isJson - Boolean to set the Content-Type
 * @returns {object} response.data - Object with the response data
 */
const httpRequest = async (method, path, data = {}, isJson = true) => {
  try {
    const response = await axios({
      method: method, // GET, POST, DELETE, PUT
      url: `${BASE_URL}${path}`,
      data: method !== "get" ? data : {}, // Only send data if not GET
      params: method === "get" ? data : {}, // Only send data with params if GET
      headers: createHeaders(isJson), // Call the function to create headers
    });
    return response.data;
  } catch (error) {
    /** Function handleError
     * @param {object} error - Object with the error data
     */
    handleError(error);
  }
};

/** Post Login Function
 * @param {string} path - Path of the request
 * @param {object} data - Data to send in the request
 * @param {string} contentType - Content-Type of the request
 * @returns {object} response.data - Object with the response data
 */
export const postLogin = async (
  path,
  data,
  contentType = "application/x-www-form-urlencoded"
) => {
  try {
    const response = await axios.post(`${BASE_URL}${path}`, data, {
      headers: {
        "Content-Type": contentType,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/** Get Data Function
 * @param {string} path - Path of the request
 * @param {object} params - Params to send in the request
 * @returns {object} response.data - Object with the response data
 */
export const getData = async (path, params = {}) => {
  return await httpRequest("get", path, params);
};

/** Post Data Function
 * @param {string} path - Path of the request
 * @param {object} data - Data to send in the request
 * @returns {object} response.data - Object with the response data
 */
export const postData = async (path, data) => {
  return await httpRequest("post", path, data);
};

/** Delete Data Function
 * @param {string} path - Path of the request
 * @param {object} data - Data to send in the request
 * @returns {object} response.data - Object with the response data
 */
export const deleteData = async (path) => {
  return await httpRequest("delete", path);
};

/** Put Data Function
 * @param {string} path - Path of the request
 * @param {object} data - Data to send in the request
 * @returns {object} response.data - Object with the response data
 */
export const putData = async (path, data) => {
  return await httpRequest("put", path, data);
};
