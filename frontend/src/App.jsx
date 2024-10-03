import React from "react";

import MaintenancePage from "./pages/maintenancePage/MaintenancePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/Loginpage";
import IssueCardsPage from "./pages/dashboardPages/issueCardpage/IssueCardsPage";
import ReceieveCardsPage from "./pages/dashboardPages/receiveCardPage/ReceieveCardsPage";
import DeploymentOfCardsPage from "./pages/dashboardPages/deploymentPage/DeploymentOfCardsPage";
import CardsOverviewPage from "./pages/dashboardPages/cardOverviewPage/CardsOverviewPage";
import LocationOverviewPage from "./pages/dashboardPages/locationOverviewPage/LocationOverviewPage";
import RootLayout from "./root/RootLayout";
import DashboardPage from "./pages/dashboardPages/DashboardPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const token = sessionStorage.getItem("token");
  const data = JSON.parse(token);

  return (
    <>
      <Routes>
        <Route path="loginPage" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<RootLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="issueCards" element={<IssueCardsPage />} />
            <Route path="receiveCards" element={<ReceieveCardsPage />} />
            <Route
              path="deploymentOfCards"
              element={<DeploymentOfCardsPage />}
            />
            <Route path="cardsOverview" element={<CardsOverviewPage />} />
            <Route path="locationOverview" element={<LocationOverviewPage />} />
            <Route path="maintenance" element={<MaintenancePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
