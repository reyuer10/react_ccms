import axios from "axios";

const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}/api/login`;

export const validError = {
  errorType: null,
  isNull: false,
  errorMessage: null,
};

// const { errorType, isNull, errorMessage } = validError;

const loginAuth = async ({ user_name, user_pass }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, {
      user_name: user_name,
      user_pass: user_pass,
    });

    return response.data;
  } catch (error) {
    if (error.response.data.error === "user_name") {
      validError.errorType = "user_name";
      validError.errorMessage = error.response.data.message;
      validError.isNull = true;
    } else if (error.response.data.error === "user_pass") {
      validError.errorType = "user_pass";
      validError.errorMessage = error.response.data.message;
      validError.isNull = true;
    } else {
      validError.errorMessage = null;
      validError.isNull = false;
    }
    console.log("Error login data: ", error.response.data.message);
  }
};

const loginStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/status`);
    return response.data;
  } catch (error) {
    console.log("Error checking status.", error);
  }
};

export { loginAuth, loginStatus };
