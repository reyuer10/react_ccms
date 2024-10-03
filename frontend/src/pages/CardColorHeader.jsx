import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonAddComponents from "../custom/ButtonAddComponents";
import { useModal } from "../hooks/useModal";
import CardColorAdd from "./CardColorAdd";
import Modal from "../modal/Modal";
import InputHeader from "../custom/InputHeader";

function CardColorHeader({ setCardColorData }) {
  const { cardColor } = useSelector((state) => state.cardColor);
  const [cardColorSearchInput, setCardColorSearchInput] = useState("");

  const { handleOpenModalTo, handleRemoveModal, currentModal, isOpenModal } =
    useModal();

  const cardColorDataFilter = cardColor.filter((c) =>
    c.cardcolor_name.toLowerCase().includes(cardColorSearchInput.toLowerCase())
  );

  useEffect(() => {
    setCardColorData(cardColorDataFilter);
  }, [cardColor, cardColorSearchInput]);

  const handleCancelCardColor = useCallback(() => {
    handleRemoveModal();
  }, []);

  const handleAddCardColor = async () => {
    handleOpenModalTo(
      <CardColorAdd handleCancelCardColor={handleCancelCardColor} />
    );
  };

  return (
    <div className="flex items-center justify-between">
      <InputHeader
        value={cardColorSearchInput}
        onChange={(e) => setCardColorSearchInput(e.target.value)}
        placeholderLabel="card color name"
        name="locationSearchInput"
      />
      <div>
        <ButtonAddComponents onClick={handleAddCardColor} name="Card Color" />
      </div>
      <Modal isOpenModal={isOpenModal}>{currentModal}</Modal>
    </div>
  );
}

export default CardColorHeader;
