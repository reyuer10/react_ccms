import React, { memo, useCallback, useEffect, useState } from "react";
import CanisterAdd from "./CanisterAdd";
import ModalCanister from "../modal/ModalCanister";

// antd table
import { useDispatch, useSelector } from "react-redux";
import { fetchCanister } from "../features/canisterSlice";
import CanisterTable from "./CanisterTable";
import CanisterHeader from "./CanisterHeader";
import CanisterFooter from "./CanisterFooter";

function CanisterPage() {
  const dispatch = useDispatch();

  // for modal
  const [isModalCanisterButtonOpen, setIsModalCanisterButtonOpen] =
    useState(false);

  // redux fetching canister - global
  const { canister } = useSelector((state) => state.canister);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [canisterId, setCanisterId] = useState(null);
  const [canisterData, setCanisterData] = useState(canister);

  const [canisterSearchInput, setCanisterSearchInput] = useState("");

  useEffect(() => {
    dispatch(fetchCanister());
  }, [dispatch]);

  const filterSearchByIdOrNum = canister.filter((c) =>
    c.canister_code.toLowerCase().includes(canisterSearchInput.toLowerCase())
  );
  useEffect(() => {
    setCanisterData(filterSearchByIdOrNum);
  }, [canister, canisterSearchInput]);

  const handleOpenPage = useCallback(
    () => setIsModalCanisterButtonOpen(true),
    []
  );
  const handlCloseModal = useCallback(
    () => setIsModalCanisterButtonOpen(false),
    []
  );

  const indexOfLastItem = currentPage * itemsPerPage; // 1 * 5 = 5
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 5 - 5 = 0
  const currentItems = canisterData.slice(indexOfFirstItem, indexOfLastItem); // current =  0 to 5

  // change page
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  return (
    <div className="font-inter m-4">
      <CanisterHeader
        canisterSearchInput={canisterSearchInput}
        setCanisterSearchInput={setCanisterSearchInput}
        handleOpenPage={handleOpenPage}
      />
      <ModalCanister
        isModalCanisterButtonOpen={isModalCanisterButtonOpen}
        handlCloseModal={handlCloseModal}
      >
        <CanisterAdd handlCloseModal={handlCloseModal} />
      </ModalCanister>

      <div>
        <div className=" overflow-x-auto shadow-lg my-4 border-2 border-main-background rounded-lg">
          <CanisterTable currentItems={currentItems} />
        </div>
        <CanisterFooter
          canister={canister}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          paginate={paginate}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default memo(CanisterPage);
