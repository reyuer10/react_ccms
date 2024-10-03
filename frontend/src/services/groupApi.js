import axios from "axios";

const GROUP_API = `http://localhost:8080/groupApi`;

const getGroupData = async () => {
  try {
    const response = await axios.get(`${GROUP_API}/getGroup`);
    return response;
  } catch (error) {
    console.log("Error fetching data from group (axios)", error);
  }
};

const addGroupData = async ({ grp_name, grp_desc }) => {
  try {
    const response = await axios.post(`${GROUP_API}/addGroup`, {
      grp_name: grp_name,
      grp_desc: grp_desc,
    });

    return response;
  } catch (error) {
    console.log("Error adding data from group (axios)", error);
  }
};

const editGroupData = async ({ grp_name, grp_desc, grp_ID }) => {
  try {
    const response = await axios.put(`${GROUP_API}/updateGroup`, {
      grp_name: grp_name,
      grp_desc: grp_desc,
      grp_ID: grp_ID,
    });

    return response.data;
  } catch (error) {
    console.log("Error editing data from group (axios)", error);
  }
};

export { getGroupData, addGroupData, editGroupData };
