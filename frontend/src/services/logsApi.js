import axios from "axios";

const BASE_URL = `http://localhost:8080`;
const LOGS_API = `api/logs`;

const systemAddLogs = async ({ logs_type, logs_desc, logs_performBy }) => {
  try {
    const response = await axios.post(`${BASE_URL}/${LOGS_API}/systemAddLogs`, {
      logs_type: logs_type,
      logs_desc: logs_desc,
      logs_performBy: logs_performBy,
    });

    return response.data;
  } catch (error) {
    console.log("Error creating new location", error);
  }
};

const logsCreateLocation = async ({ logs_desc, logs_performBy }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${LOGS_API}/logsCreateLocation`,
      {
        logs_desc: logs_desc,
        logs_performBy: logs_performBy,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error creating new location", error);
  }
};

const logsNewCanister = async ({ logs_desc, logs_performBy }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${LOGS_API}/logsNewCanister`,
      {
        logs_desc: logs_desc,
        logs_performBy: logs_performBy,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error creating new canister", error);
  }
};

const logsNewGroup = async ({ logs_desc, logs_performBy }) => {
  try {
    const response = await axios.post(`${BASE_URL}/${LOGS_API}/logsNewGroup`, {
      logs_desc: logs_desc,
      logs_performBy: logs_performBy,
    });

    return response.data;
  } catch (error) {
    console.log("Error creating new group", error);
  }
};

const logsNewCardColor = async ({ logs_desc, logs_performBy }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${LOGS_API}/logsNewCardColor`,
      {
        logs_desc: logs_desc,
        logs_performBy: logs_performBy,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error creating new user", error);
  }
};

const logsNewUser = async ({ logs_desc, logs_performBy }) => {
  try {
    const response = await axios.post(`${BASE_URL}/${LOGS_API}/logsNewUser`, {
      logs_desc: logs_desc,
      logs_performBy: logs_performBy,
    });

    return response.data;
  } catch (error) {
    console.log("Error creating new user", error);
  }
};

const logsLoginAuth = async ({ logs_desc, logs_performBy }) => {
  try {
    const response = await axios.post(`${BASE_URL}/${LOGS_API}/logsLoginAuth`, {
      logs_desc: logs_desc,
      logs_performBy: logs_performBy,
    });

    return response.data;
  } catch (error) {
    console.log("Error creating new location", error);
  }
};

export {
  systemAddLogs,
  logsLoginAuth,
  logsNewCanister,
  logsCreateLocation,
  logsNewGroup,
  logsNewCardColor,
  logsNewUser,
};
