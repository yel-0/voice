import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen text-center flex flex-col justify-around items-center">
      <Link to="/alarm">Alarm</Link>
      <Link to="/broadcast">broadcast</Link>
      <Link to="/healthyFoods">healthyFoods</Link>
      <Link to="/meditate">meditate</Link>
      <Link to="/profile">profile</Link>
      <Link to="/quotes">quotes</Link>
      <Link to="/sleep">sleep</Link>
      <Link to="/soundScape">soundScape</Link>
    </div>
  );
};

export default Home;
