import React, { useCallback } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../modal/Modal";
import UserEdit from "./UserEdit";
import { findUserData } from "../services/userApi";
import ButtonComponents from "../custom/ButtonComponents";
import { editIcons } from "../assets/data/svg";

function UserTable({ userCurrentItems }) {
  const { handleOpenModalTo, handleRemoveModal, currentModal, isOpenModal } =
    useModal();

  const handleUserEdit = useCallback(async (id) => {
    const response = await findUserData(id);
    console.log(response.data);
    if (response.data || response.data.length > 0) {
      handleOpenModalTo(
        <UserEdit
          getUserData={response.data}
          handleRemoveModal={handleRemoveModal}
        />
      );
    }
  }, []);

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <tr className=" text-text-color font-bold">
            <td scope="col" className="px-6 py-3">
              Username
            </td>
            <td scope="col" className="px-6 py-3">
              Password
            </td>
            <td scope="col" className="px-6 py-3">
              Full Name
            </td>
            <td scope="col" className="py-3">
              Employee ID
            </td>
            <td col="col" className="py-3">
              Date Modified
            </td>
            <td scope="col" className=" py-3">
              Permissions ID
            </td>
            <td scope="col" className="px-6 py-3 text-center">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {userCurrentItems.map((u) => (
            <tr
              key={u.user_id}
              className="bg-secondary-background text-text-input rounded-lg border-y border-main-background dark:bg-gray-800 dark:border-gray-700 hover:bg-main-background"
            >
              <td className="px-6 py-4">{u.user_name}</td>
              <td className="px-6">{u.user_pass}</td>
              <td className="px-6">{u.user_fullname}</td>
              <td>{u.user_empid}</td>
              <td>{new Date(u.user_timestamp).toLocaleString().split(",")}</td>
              <td>{u.permissions_id}</td>
              <td className="text-center">
                <ButtonComponents
                  label={editIcons}
                  onClick={() => handleUserEdit(u.user_id)}
                  textColor="text-green-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpenModal={isOpenModal}>{currentModal}</Modal>
    </>
  );
}

export default UserTable;
