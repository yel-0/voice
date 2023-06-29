import React, { useEffect } from "react";
import "./firebase";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Quotes from "../src/Pages/Quotes/Ouotes";
import Sleep from "../src/Pages/Sleep/Sleep";
import Alarm from "../src/Pages/Alarm/Alarm";
import Broadcast from "../src/Pages/Broadcast/Broadcast";
import HealthyFood from "../src/Pages/HealthyFoods/HealthFoods";
import Meditate from "../src/Pages/Meditate/Meditate";
import Profile from "../src/Pages/Profile/Profile";
import SoundScape from "../src/Pages/SoundScape/SoundScape";
import Home from "./Pages/Home/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/healthyFoods" element={<HealthyFood />} />
          <Route path="/meditate" element={<Meditate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/soundScape" element={<SoundScape />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
