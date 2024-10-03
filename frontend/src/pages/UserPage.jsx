import React, { memo, useCallback, useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserFooter from "./UserFooter";
import UserHeader from "./UserHeader";
import { useDispatch, useSelector } from "react-redux";
import ModalAddUser from "../modal/ModalAddUser";
import UserAddData from "./UserAddData";
import { fetchUserData } from "../features/userSlice";
import { getSystemLogs } from "../services/userApi";

function UserPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // states
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const [userFilterInput, setUserFilterInput] = useState("");
  const [filteredUserData, setFilteredUserData] = useState(user);

  const [userItemsPerPage] = useState(5);
  const [userCurrentPage, setUserCurrentPage] = useState(1);

  const handleFetchSystemLogs = async () => {
    try {
      const response = await getSystemLogs();
      let data = response.data;
    } catch (error) {
      console.log("Error fetching data from system logs", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUserData());
    handleFetchSystemLogs();
  }, [dispatch]);

  const userLastIndex = userCurrentPage * userItemsPerPage; // 1 * 5 = 5;
  const userFirstIndex = userLastIndex - userItemsPerPage; // 5 - 5 = 0;
  const userCurrentItems = filteredUserData.slice(
    userFirstIndex,
    userLastIndex
  );

  const handleUserPaginate = useCallback((number) => {
    setUserCurrentPage(number);
  }, []);

  // for open modal on adding user.
  const handleOpenModalAddUser = useCallback(() => {
    setOpenModalAddUser(true);
  }, []);

  const handleCloseModalAddUser = useCallback(() => {
    setOpenModalAddUser(false);
  }, []);

  const handleFilter = user.filter(
    (u) =>
      u.user_empid.toLowerCase().includes(userFilterInput.toLowerCase()) ||
      u.user_fullname.toLowerCase().includes(userFilterInput.toLowerCase())
  );

  useEffect(() => {
    setFilteredUserData(handleFilter);
  }, [user, userFilterInput]);

  return (
    <div className="font-inter m-4">
      <UserHeader
        handleOpenModalAddUser={handleOpenModalAddUser}
        setUserFilterInput={setUserFilterInput}
        userFilterInput={userFilterInput}
      />
      <div className=" overflow-x-auto shadow-lg my-4 border-2 border-main-background rounded-lg">
        <UserTable user={user} userCurrentItems={userCurrentItems} />
        <ModalAddUser openModalAddUser={openModalAddUser}>
          <UserAddData handleCloseModalAddUser={handleCloseModalAddUser} />
        </ModalAddUser>
      </div>
      <UserFooter
        filteredUserData={filteredUserData}
        userLastIndex={userLastIndex}
        userFirstIndex={userFirstIndex}
        userItemsPerPage={userItemsPerPage}
        userCurrentPage={userCurrentPage}
        handleUserPaginate={handleUserPaginate}
      />
    </div>
  );
}

export default memo(UserPage);
