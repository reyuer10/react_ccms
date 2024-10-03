import { editIcons } from "../assets/data/svg";

function LocationTableList({ l, handleGetLocationId }) {
  return (
    <>
      <tr className="bg-secondary-background text-text-input border-y border-main-background dark:bg-gray-800 dark:border-gray-700 hover:bg-main-background">
        <td className="px-6 py-4">{l.loc_name}</td>
        <td className="px-6 py-2">{l.loc_desc}</td>
        <td>{new Date(l.loc_timestamp).toLocaleString().split(",")}</td>
        <td className="px-6 py-2">{l.grp_name}</td>

        <td className="text-center">
          <button
            onClick={() => handleGetLocationId(l.loc_ID)}
            className="font-semibold text-green-500"
          >
            {editIcons}
          </button>
        </td>
      </tr>
    </>
  );
}

export default LocationTableList;
