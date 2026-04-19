import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AllChallenges from "@/pages/AllChallengesPage";
import CreateChallenge from "@/pages/CreateChallenge";
import HeatMap from "@/pages/Heatmap";
import Home from "@/pages/Home";
import LoginForm from "@/pages/auth/LoginForm";
import { SignupForm } from "@/pages/auth/SignupForm";
import { ForgotPasswordForm } from "@/pages/auth/ForgotPasswordForm";

import { AuthProvider } from "@/context/AuthProvider";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AuthLayout } from "./pages/auth/AuthLayout";
import { ResetPasswordForm } from "./pages/auth/ResetPasswordForm";
import { ProtectedLayout } from "./components/layout/ProtectedLayout";
import { EditChallengePage } from "./components/EditChallenges/EditchallengePage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<Navigate to="/auth/login" replace />}
          />
          <Route
            path="/signup"
            element={<Navigate to="/auth/signup" replace />}
          />
          <Route
            path="/forgot"
            element={<Navigate to="/auth/forgot" replace />}
          />
         

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="forgot" element={<ForgotPasswordForm />} />
             <Route path="reset-password" element={<ResetPasswordForm />} />
          </Route>
          <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateChallenge />} />
            <Route path="/challenges" element={<AllChallenges />} />
            <Route path="/challenges/:challengeId/edit" element={<EditChallengePage />} />
            <Route path="/heatmap" element={<HeatMap />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
