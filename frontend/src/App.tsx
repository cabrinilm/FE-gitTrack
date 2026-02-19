import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AllChallenges from '@/pages/AllChallenges'
import CreateChallenge from '@/pages/CreateChallenge'
import HeatMap from '@/pages/Heatmap'
import Home from '@/pages/Home'
import { AuthProvider } from '@/context/AuthProvider'
import Login from '@/pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateChallenge />} />
      <Route path="/challenges" element={<AllChallenges />} />
      <Route path="/heatmap" element={<HeatMap />} />
   </Route>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
};
