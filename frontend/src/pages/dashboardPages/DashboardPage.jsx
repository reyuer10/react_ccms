import Sidebar from "../../components/Sidebar";
import CardLogo from "../../assets/svg/dashboard/cards-logo.svg";
import TableLogo from "../../assets/svg/dashboard/table-logo.svg";
import PackedCards from "../../assets/svg/dashboard/packed-cards.svg";
import Card_Reports from "./dashboardCards/Card_Reports"
import Recent_ActivityTable from "./dashboardCards/Recent_ActivityTable";
const DashboardPage = () => {
  return (
    <div className="relative font-inter">
      
      {/* <div className=" bg-gray-100">
        <div className="flex justify-between items-center bg-gray-300 p-4">
          <div className="text-xl">Logo</div>
          <div className="text-lg">User Account</div>
        </div> */}
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <div className="bg-casinoplus-green flex-1 text-white p-4 rounded">
            <img src={CardLogo} alt="Cards" />
              Available Card Quantity: 30
            </div>
            <div className="bg-casinoplus-red flex-1 text-white p-4 rounded">
            <img src={CardLogo} alt="Cards" />
              Destroyed Card Quantity: 51
            </div>
            <div className="bg-casinoplus-yellow flex-1 text-white p-4 rounded">
              <img src={TableLogo} alt="Location" />
              Location
            </div>
            <div className="bg-casinoplus-blue flex-1 text-white p-4 rounded">
            <img src={PackedCards} alt="PackedCards" />
              Total Canister Registered
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="bg-casinoplus-orange flex-1 text-white p-4 rounded shadow">
              Card Container Reports
              <Card_Reports/>
            </div>
            <div className="bg-casinoplus-pink flex-1 text-white p-4 rounded shadow">
              Recent Activity
              <Recent_ActivityTable/>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default DashboardPage;
