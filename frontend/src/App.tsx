import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AllChallenges from '@/pages/AllChallenges'
import CreateChallenge from '@/pages/CreateChallenge'
import HeatMap from '@/pages/Heatmap'
import Home from '@/pages/Home'

export default function App() {
  return (
    <BrowserRouter>
    
    <Routes>
    
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateChallenge />} />
      <Route path="/challenges" element={<AllChallenges />} />
      <Route path="/heatmap" element={<HeatMap />} />
   
    </Routes>
    </BrowserRouter>
  )
};
