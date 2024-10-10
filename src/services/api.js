import axios from "axios";

const BASE_URL = "http://192.168.1.197/";

const getToken = () => {
  const token = localStorage.getItem("token-advisor");
  return token ? token : "";
};

export const postLogin = async (path, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${path}`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Method to get data from the API
export const getData = async (path) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postData = async (path, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${path}`, data, {
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteData = async (path) => {
  try {
    const response = await axios.delete(`${BASE_URL}${path}`, {
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
