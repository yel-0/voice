import React from "react";

const FruitCart = ({ id, image, name, color, text }) => {
  return (
    <label
      htmlFor={`my_modal_${id}`}
      className={`bg-green-200 text-white text-2xl h-[200px] w-[300px] flex flex-col justify-center items-center`}
    >
      <h1>{name}</h1>
      <img className="w-[100px]" src={image} alt={name} />

      <input type="checkbox" id={`my_modal_${id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-blue-400">{name}</h3>
          <p className="text-blue-400 text-sm">{text}</p>
        </div>
      </div>
    </label>
  );
};

export default FruitCart;
