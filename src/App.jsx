import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./views/Login";
import RegistrationPage from "./views/RegistrationPage";
import Homepage from "./views/Homepage";
import Settings from "./views/Settings";
import AccountPage from "./views/AccountPage";
import ChatRoom from "./views/ChatRoom";
import CommunityPage from "./chat/Community";
import FeedPage from "./chat/pages/FeedPage";
import Messages from "./chat/pages/Messages";
import Members from "./chat/pages/Members";
import Announcement from "./chat/pages/Announcement";
import CreateGroup from "./chat/pages/CreateGroup";
import GetVip from "./chat/pages/GetVip";
import PostManagementPage from "./chat/pages/PostManagementPage";
import WalletLogin from "./views/WalletLogin";
import AyiSphereLogin from "./sphere/AyiSphereLogin";
import AyiSphereRegister from "./sphere/AyiSphereRegister";
import WalletPage from "./views/WalletPage";
import LandingPage from "./views/LandingPage";
import Land from "./chat/pages/Land";
import AyiWalletLogin from "./wallet/AyiWalletLogin";
import AyiWalletRegister from "./wallet/AyiWalletRegister";
import ResetPassword from "./views/ResetPassword";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import TeamManager from "./admin/pages/TeamManager";
import InsightsManager from "./admin/pages/InsightsManager";
import ServicesManager from "./admin/pages/ServicesManager";
import ObjectivesManager from "./admin/pages/ObjectivesManager";
import StatsManager from "./admin/pages/StatsManager";

// ─── Route Guards ──────────────────────────────────────────────────────────────

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

const AyiSpherePrivateRoute = ({ element }) => {
  const token = localStorage.getItem("ayi-sphere-token");
  return token ? element : <Navigate to="/ayi-sphere/login" />;
};

const AyiWalletPrivateRoute = ({ element }) => {
  const token = localStorage.getItem("ayi-wallet-token");
  return token ? element : <Navigate to="/ayi-wallet/login" />;
};

const AdminPrivateRoute = ({ element }) => {
  const token = localStorage.getItem("admin-token");
  return token ? element : <Navigate to="/admin/login" />;
};

// ─── App ───────────────────────────────────────────────────────────────────────

function App() {
  return (
    <GoogleOAuthProvider clientId="project-833543702694">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/ayi-sphere/login" element={<PrivateRoute element={<AyiSphereLogin />} />} />
        <Route path="/ayi-sphere/register" element={<PrivateRoute element={<AyiSphereRegister />} />} />
        <Route path="/ayi-wallet/login" element={<PrivateRoute element={<AyiWalletLogin />} />} />
        <Route path="/ayi-wallet/register" element={<PrivateRoute element={<AyiWalletRegister />} />} />

        {/* Protected Routes */}
        <Route path="/account-page" element={<PrivateRoute element={<AccountPage />} />} />
        <Route path="/ayi-chat-room" element={<PrivateRoute element={<ChatRoom />} />} />
        <Route path="/ayi-wallet" element={<PrivateRoute element={<LandingPage />} />} />
        <Route path="/ayi-wallet/wallet" element={<AyiWalletPrivateRoute element={<WalletPage />} />} />
        <Route path="/ayi-sphere" element={<PrivateRoute element={<Land />} />} />

        {/* Community Subroutes */}
        <Route path="/ayi-sphere/community" element={<AyiSpherePrivateRoute element={<CommunityPage />} />}>
          <Route index element={<FeedPage />} />
          <Route path="" element={<FeedPage />} />
          <Route path="feeds" element={<FeedPage />} />
          <Route path="posts" element={<PostManagementPage />} />
          <Route path="messages" element={<Messages />} />
          <Route path="members" element={<Members />} />
          <Route path="announcements" element={<Announcement />} />
          <Route path="creategroup" element={<CreateGroup />} />
          <Route path="getvip" element={<GetVip />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPrivateRoute element={<AdminDashboard />} />}>
          <Route index element={<Navigate to="/admin/team" />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="insights" element={<InsightsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="objectives" element={<ObjectivesManager />} />
          <Route path="stats" element={<StatsManager />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
