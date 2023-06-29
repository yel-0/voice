import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const ModelBox = ({ selectedGender, setSelectedGender }) => {
  const { data, isLoading, isError } = useQuery("gender", async () => {
    return axios
      .get("https://quote-garden.onrender.com/api/v3/genres")
      .then((res) => res.data);
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error occurred while fetching quotes.</h1>;
  }
  return (
    <div className="">
      <dialog id="my_modal_1" className="w-full    ">
        <form method="dialog" className="w-full  ">
          <div className="modal-action p-5 flex w-full flex-row  justify-between items-center">
            {/* if there is a button in form, it will close the modal */}
            <div className="text-3xl">Categories</div>
            <button className="btn outline-none">Close</button>
          </div>

          <div className=" flex flex-row text-white  justify-center items-center gap-4 flex-wrap">
            {data.data.map((gender) => (
              <div>
                <div>
                  <div className="bg-[#526D82] modal-action flex  flex-row justify-center items-center cursor-pointer w-[200px] rounded-lg text-center h-[100px]">
                    <button
                      className="w-full h-full"
                      onClick={() => setSelectedGender(gender)}
                    >
                      {" "}
                      {gender}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ModelBox;
