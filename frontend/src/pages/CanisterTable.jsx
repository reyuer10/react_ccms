import React, { memo, useCallback, useState } from "react";
import ModalEditCanister from "../modal/ModalEditCanister";
import CanisterEditPage from "./CanisterEditPage";
import {
  canisterErrorObj,
  handleGetCanisterById,
} from "../services/canisterApi";
import ButtonComponents from "../custom/ButtonComponents";
import { editIcons } from "../assets/data/svg";

function CanisterTable({ currentItems }) {
  const [canisterGetId, setCanisterGetId] = useState([]);
  const [canisterPrevData, setCanisterPrevData] = useState([]);
  const [isEditButtonClick, setIsEditButtonClick] = useState(false);

  const handleEditCanisterValue = async (id) => {
    const response = await handleGetCanisterById(id);
    // const canisterGetId = canister.find((c) => c.canister_ID === id);

    if (response.length > 0) {
      setCanisterGetId(response[0]);
      setCanisterPrevData(response[0]);
      handleOpenModalEdit();
    }
  };

  const handleOpenModalEdit = useCallback(() => {
    setIsEditButtonClick(true);
  }, []);

  const handleCloseModalEdit = useCallback(() => {
    setIsEditButtonClick(false);
    canisterErrorObj.cnstrEditErrorMessage = null;
  }, []);

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <tr className=" text-text-color">
            <th scope="col" className="py-3 px-6">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Date Modified
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((c) => (
            <tr
              key={c.canister_ID}
              className="bg-secondary-background text-text-input border-y border-main-background dark:bg-gray-800 dark:border-gray-700 hover:bg-main-background"
            >
              <td className="px-6 py-4">{c.canister_num}</td>
              <td className="px-6">{c.canister_code}</td>
              <td className="px-6">{c.canister_desc}</td>
              <td className="px-6">
                {new Date(c.canister_timestamp).toLocaleString().split(",")}
              </td>
              <td className=" text-center">
                <ButtonComponents
                  label={editIcons}
                  onClick={() => handleEditCanisterValue(c.canister_ID)}
                  textColor="text-green-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalEditCanister
        isEditButtonClick={isEditButtonClick}
        handleCloseModalEdit={handleCloseModalEdit}
      >
        <CanisterEditPage
          c={canisterGetId}
          handleCloseModalEdit={handleCloseModalEdit}
        />
      </ModalEditCanister>
    </>
  );
}

export default memo(CanisterTable);
