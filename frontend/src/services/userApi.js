import axios from "axios";

const USER_API = "http://localhost:8080/userApi";

const getUserData = async () => {
  try {
    const response = await axios.get(`${USER_API}/getUserData`);
    return response;
  } catch (error) {
    console.log("Error fetching data from user axios", error);
  }
};

const getSystemLogs = async () => {
  try {
    const response = await axios.get(`${USER_API}/getSystemLogs`);
    return response.data;
  } catch (error) {
    console.log("Error fetching data from user axios", error);
  }
};

const findUserData = async (user_id) => {
  try {
    const response = await axios.get(`${USER_API}/findUser/${user_id}`);
    return response;
  } catch (error) {
    console.log("Error finding data from user", error);
  }
};

const addUserData = async ({
  user_name,
  user_pass,
  user_fullname,
  user_empid,
  permissions_id,
}) => {
  try {
    const response = await axios.post(`${USER_API}/addUserData`, {
      user_name: user_name,
      user_pass: user_pass,
      user_fullname: user_fullname,
      user_empid: user_empid,
      permissions_id: permissions_id,
    });
    return response.data;
  } catch (error) {
    console.log("Error adding data from user axios", error);
  }
};

const editUserData = async (
  user_id,
  { user_name, user_pass, user_fullname, user_empid, permissions_id }
) => {
  try {
    const response = await axios.put(`${USER_API}/editUser/${user_id}`, {
      user_name: user_name,
      user_pass: user_pass,
      user_fullname: user_fullname,
      user_empid: user_empid,
      permissions_id: permissions_id,
    });

    return response.data;
  } catch (error) {
    console.log("Error executing data", error);
  }
};

const deleteUserData = async (id) => {
  try {
    const response = await axios.delete(`${USER_API}/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.log("error deleting data from user", error);
  }
};

export {
  getUserData,
  addUserData,
  findUserData,
  editUserData,
  deleteUserData,
  getSystemLogs,
};
