import { useCallback, useState } from "react";

export const useModal = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModalTo = useCallback((modal) => {
    setCurrentModal(modal);
    setIsOpenModal(true);
  }, []);

  const handleRemoveModal = useCallback(() => {
    setCurrentModal(null);
    setIsOpenModal(false);
  }, []);

  return { handleOpenModalTo, handleRemoveModal, currentModal, isOpenModal };
};
