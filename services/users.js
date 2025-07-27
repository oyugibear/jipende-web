import axios from "axios";
import { API_URL } from "../config/api.config";
import Cookies from "js-cookie";
import { message } from "antd";

export const loginUser = async (credentials) => {
  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials);

    if (data) {
      const user = data?.user;
      console.log("user: ", user);

      // saveUserToLocalStorage(user)
      // Cookies.set("user", JSON.stringify(user), { expires: 7 }) // Cookie expires in 7 days
      message.success("Login Successful");
      return data;
    } else {
      // Handle unexpected response format
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    const errorMessage = error.response.data.error;
    message.error(errorMessage);
    console.log(errorMessage);
    return { error: error };
  }
};
