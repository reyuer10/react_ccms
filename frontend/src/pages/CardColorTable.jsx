import ButtonComponents from "../custom/ButtonComponents";
import { useModal } from "../hooks/useModal";
import { fetchFindCardColor } from "../services/cardColorApi";
import CardColorEdit from "./CardColorEdit";
import Modal from "../modal/Modal";
import { editIcons } from "../assets/data/svg";

function CardColorTable({ cardColorCurrentItems }) {
  const { handleOpenModalTo, handleRemoveModal, currentModal, isOpenModal } =
    useModal();

  const handleOpenModalEditCardColor = async (id) => {
    const results = await fetchFindCardColor(id);
    handleOpenModalTo(
      <CardColorEdit data={results[0]} handleRemoveModal={handleRemoveModal} />
    );
  };
  return (
    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <tr className="text-text-color">
            <th scope="col" className="px-6 py-3 ">
              ID
            </th>
            <th scope="col" className="py-3">
              Name
            </th>
            <th scope="col" className="py-3">
              Date Modified
            </th>
            <th scope="col" className="py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cardColorCurrentItems.map((c) => {
            return (
              <tr
                key={c.cardcolor_ID}
                className="bg-secondary-background text-text-input rounded-lg border-y border-main-background dark:bg-gray-800 dark:border-gray-700 hover:bg-main-background"
              >
                <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                  {c.cardcolor_ID}
                </td>
                <td>{c.cardcolor_name}</td>
                <td>
                  {new Date(c.cardcolor_timestamp).toLocaleString().split(",")}
                </td>
                <td className="text-center">
                  <ButtonComponents
                    onClick={() => handleOpenModalEditCardColor(c.cardcolor_ID)}
                    label={editIcons}
                    textColor="text-green-500"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal isOpenModal={isOpenModal}>{currentModal}</Modal>
    </div>
  );
}

export default CardColorTable;
