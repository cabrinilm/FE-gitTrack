import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/App.css";

import AllChallenges from "@/pages/AllChallengesPage";
import CreateChallenge from "@/pages/CreateChallengePage";
import HeatMap from "@/pages/HeatmapPage";
import Home from "@/pages/HomePage";
import { LandingPage } from "@/pages/LandingPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";

import { AuthProvider } from "@/context/AuthProvider";

import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";
import { AuthLayout } from "@/pages/auth/AuthLayout";
import { ProtectedLayout } from "@/components/layout/layouts/ProtectedLayout";

import EditChallengePage from "@/pages/EditChallengePage";
import { ProfilePage } from "@/pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
          <Route path="/forgot" element={<Navigate to="/auth/forgot" replace />} />

          <Route path="/" element={<LandingPage />} />

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/app" element={<Home />} />
              <Route path="/app/create" element={<CreateChallenge />} />
              <Route path="/app/challenges" element={<AllChallenges />} />
              <Route
                path="/app/challenges/:challengeId/edit"
                element={<EditChallengePage />}
              />
              <Route path="/app/heatmap" element={<HeatMap />} />
              <Route path="/app/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
