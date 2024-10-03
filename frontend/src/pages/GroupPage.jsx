import React, { memo, useCallback, useEffect, useState } from "react";
import GroupHeader from "./GroupHeader";
import GroupTable from "./GroupTable";
import { useDispatch, useSelector } from "react-redux";
import ModalAddGroup from "../modal/ModalAddGroup";
import GroupAdd from "./GroupAdd";
import GroupFooter from "./GroupFooter";
import { fetchGroupData } from "../features/groupSlice";

function GroupPage() {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.group);

  const [groupSearchInput, setGroupSearchInput] = useState("");
  const [groupData, setGroupData] = useState(group);
  const [openModalGroupAdd, setOpenModalGroupAdd] = useState(false);
  const [GroupItemsPerPage, setGroupItemsPerPage] = useState(5);
  const [GroupCurrentPage, setGroupCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGroupData());
  }, [dispatch]);

  const groupSearchFilter = group.filter((g) =>
    g.grp_name.toLowerCase().includes(groupSearchInput.toLowerCase())
  );

  useEffect(() => {
    setGroupData(groupSearchFilter);
  }, [group, groupSearchInput]);

  const handleOpenModalGroupAdd = useCallback(() => {
    setOpenModalGroupAdd(true);
  }, []);

  const handleCloseModalGroupAdd = useCallback(() => {
    setOpenModalGroupAdd(false);
  }, []);

  const IndexGroupOfLastItem = GroupCurrentPage * GroupItemsPerPage;
  const IndexGroupOfFirstItem = IndexGroupOfLastItem - GroupItemsPerPage;
  const groupCurrentItems = groupData.slice(
    IndexGroupOfFirstItem,
    IndexGroupOfLastItem
  );

  const handleGroupPaginate = useCallback((number) => {
    setGroupCurrentPage(number);
  }, []);

  return (
    <div className="font-inter m-4">
      <GroupHeader
        setGroupSearchInput={setGroupSearchInput}
        groupSearchInput={groupSearchInput}
        openModalAddGroup={handleOpenModalGroupAdd}
      />
      <ModalAddGroup isModalOpen={openModalGroupAdd}>
        <GroupAdd closeModalGroupAdd={handleCloseModalGroupAdd} />
      </ModalAddGroup>
      <div>
        <div className=" overflow-x-auto shadow-lg my-4 border-2 border-main-background rounded-lg">
          <GroupTable groupData={groupData} />
        </div>
        <GroupFooter
          groupData={groupCurrentItems}
          GroupCurrentPage={GroupCurrentPage}
          IndexGroupOfFirstItem={IndexGroupOfFirstItem}
          IndexGroupOfLastItem={IndexGroupOfLastItem}
          handleGroupPaginate={handleGroupPaginate}
          GroupItemsPerPage={GroupItemsPerPage}
        />
      </div>
    </div>
  );
}

export default memo(GroupPage);
