import React, { memo, useCallback, useState } from "react";
import ModalEditGroup from "../modal/ModalEditGroup";
import GroupEditPage from "./GroupEditPage";
import { useSelector } from "react-redux";
import ButtonComponents from "../custom/ButtonComponents";
import { editIcons } from "../assets/data/svg";

function GroupTable({ groupData }) {
  const { group } = useSelector((state) => state.group);
  const [openModalEditGroup, setOpenModalEditGroup] = useState(false);
  const [getGroupId, setGetGroupId] = useState(null);

  const handleOpenModalEditGroup = useCallback(
    (id) => {
      const getId = group.find((g) => g.grp_ID === id);
      if (getId) {
        setGetGroupId(getId);
      }
      setOpenModalEditGroup(true);
    },
    [group]
  );

  const handleCloseModalEditGroup = useCallback(() => {
    setOpenModalEditGroup(false);
    setGetGroupId(null);
  }, []);

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead>
          <tr className="text-text-color ">
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6">Date Modified</th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {groupData.map((g) => (
            <tr
              key={g.grp_ID}
              className="bg-secondary-background text-text-input border-y border-main-background dark:bg-gray-800 dark:border-gray-700 hover:bg-main-background"
            >
              <td className="px-6 py-4">{g.grp_name}</td>
              <td className="px-6 ">{g.grp_desc}</td>
              <td className="px-6">{new Date(g.grp_timestamp).toLocaleString().split(",")}</td>
              <td className="text-center">
                <ButtonComponents
                  onClick={() => handleOpenModalEditGroup(g.grp_ID)}
                  label={editIcons}
                  textColor="text-green-500"
                  textSize="14px"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalEditGroup openModalEditGroup={openModalEditGroup}>
        <GroupEditPage
          getGroupId={getGroupId}
          closeModalEdit={handleCloseModalEditGroup}
        />
      </ModalEditGroup>
    </>
  );
}

export default memo(GroupTable);
