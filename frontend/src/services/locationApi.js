import axios from "axios";

const API = "http://localhost:8080/locationApi";

export const errorObj = {
  errMessage: null,
  grpErrorMessage: null,
  isGrpError: false,
  isErrorGrpEdit: false,
  errGroupEditMessage: null,
};

const getLocationData = async () => {
  try {
    const response = await axios.get(`${API}/getLocation`);
    return response;
  } catch (error) {
    console.log("Error fetching data location.");
  }
};

const addLocationData = async ({ loc_name, loc_desc, grp_name }) => {
  try {
    const response = await axios.post(`${API}/addLocation`, {
      loc_name: loc_name,
      loc_desc: loc_desc,
      grp_name: grp_name,
    });
    return response;
  } catch (error) {
    if (error.response.data.name === "locationName") {
      errorObj.errMessage = error.response.data.message;
    }
    if (error.response.data.name === "groupName") {
      errorObj.grpErrorMessage = error.response.data.message;
      errorObj.isGrpError = true;
    }
    console.log("Error adding data location.", error);
    throw error;
  }
};

const editLocationData = async ({ loc_name, loc_desc, grp_name, loc_ID }) => {
  try {
    const response = await axios.put(`${API}/updateLocation`, {
      loc_name: loc_name,
      loc_desc: loc_desc,
      grp_name: grp_name,
      loc_ID: loc_ID,
    });
    return response.data;
  } catch (error) {
    if (error.response.data.name === "editGrp_name") {
      errorObj.isErrorGrpEdit = true;
      errorObj.errGroupEditMessage = error.response.data.message;
    }
    console.log("Error edit data location.", error);
    throw error;
  }
};

export { getLocationData, addLocationData, editLocationData };
