import axios from "axios";

const urlLogin = "http://192.168.1.197/";

const getToken = () => {
  const token = localStorage.getItem("token-advisor");
  return token ? token : "";
};

export const postLogin = async (path, data) => {
  try {
    const response = await axios.post(`${urlLogin}${path}`, data, {
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
    const response = await axios.get(`${urlLogin}${path}`, {
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
