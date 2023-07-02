import React from "react";
import FruitCart from "./component/FruitCart";
import data from "../../db";

const HealthFoods = () => {
  return (
    <div>
      <h1>HealthFoods</h1>
      <div className="flex flex-row justify-center items-center flex-wrap  gap-3">
        {data.map((item) => (
          <FruitCart
            key={item.id}
            id={item.id}
            color={item.color}
            image={item.image}
            name={item.name}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthFoods;
