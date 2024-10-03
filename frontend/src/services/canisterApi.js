import axios from "axios";

const API = "http://localhost:8080/canisterApi";

export const canisterErrorObj = {
  errorMessage: null,
  cnstrEditErrorMessage: null,
  isCanisterError: false,
};

const handleGetCanister = () => {
  try {
    const response = axios.get(`${API}/getCanister`);
    return response;
  } catch (error) {
    console.log("Error fetching canister data");
  }
};

const handleGetCanisterById = async (id) => {
  try {
    const response = await axios.get(`${API}/getCanister/${id}`);

    return response.data;
  } catch (error) {
    console.log("Error getting data from canister", error);
  }
};

const handleAddCanister = async ({
  canister_num,
  canister_code,
  canister_desc,
}) => {
  try {
    const response = await axios.post(`${API}/addCanister`, {
      canister_num: canister_num,
      canister_code: canister_code,
      canister_desc: canister_desc,
    });
    return response;
  } catch (error) {
    console.log("Error adding canister", error.response.data.message);
    canisterErrorObj.errorMessage = error.response.data.message;
  }
};

const handleEditCanister = async ({
  canister_num,
  canister_code,
  canister_desc,
  canister_ID,
  logs_desc,
  logs_performBy,
}) => {
  try {
    const response = await axios.put(`${API}/updateCanister`, {
      canister_num: canister_num,
      canister_code: canister_code,
      canister_desc: canister_desc,
      canister_ID: canister_ID,
      logs_desc: logs_desc,
      logs_performBy: logs_performBy,
    });
    canisterErrorObj.isCanisterError = false;
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      canisterErrorObj.cnstrEditErrorMessage = error.response.data.errMessage;
      canisterErrorObj.isCanisterError = true;
    }
  }

  throw error;
};

export {
  handleGetCanister,
  handleAddCanister,
  handleEditCanister,
  handleGetCanisterById,
};
