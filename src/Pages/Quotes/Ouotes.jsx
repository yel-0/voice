import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ModelBox from "./component/ModelBox";
import BgModelBox from "./component/BgModelBox";

const Ouotes = () => {
  const [selectedGender, setSelectedGender] = useState("");

  const {
    data: quotes,
    isLoading: quotesLoading,
    isError: quotesError,
  } = useQuery("quotes", async () => {
    return axios
      .get("https://quote-garden.onrender.com/api/v3/quotes")
      .then((res) => res.data);
  });

  const {
    data: genderQuotes,
    isLoading: genderLoading,
    isError: genderError,
  } = useQuery(
    ["quotes", selectedGender],
    async () => {
      let url = "https://quote-garden.onrender.com/api/v3/quotes";
      if (selectedGender) {
        url += `?genre=${selectedGender}`;
      }
      return axios.get(url).then((res) => res.data);
    },
    { enabled: !!selectedGender }
  );

  if (quotesLoading || genderLoading) {
    return <h1>Loading...</h1>;
  }

  if (quotesError || genderError) {
    return <h1>Error occurred while fetching quotes.</h1>;
  }

  return (
    <div className="main relative">
      <div className="fixed text-white w-full bottom-0 p-5 ">
        <div className="flex flex-row justify-around items-center ">
          <button
            className="bg-[#9DB2BF] p-3  cursor-pointer rounded-xl"
            onClick={() => window.my_modal_1.showModal()}
          >
            My favorites
          </button>

          <ModelBox
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />

          <button
            className="bg-[#9DB2BF] p-3 rounded-xl"
            onClick={() => window.my_modal_3.showModal()}
          >
            icon
          </button>
          <BgModelBox />
        </div>
      </div>
      {selectedGender === ""
        ? quotes.data.map((quote) => (
            <div key={quote._id}>
              <div className="scroll-area p-[2rem] h-screen  flex flex-col justify-center items-center text-black text-center">
                <div className="text-3xl">{quote.quoteText}</div>
                <div className="flex relative top-[100px] flex-row justify-center items-center gap-3">
                  <div>Share</div>
                  <div>Heart</div>
                </div>
              </div>
            </div>
          ))
        : genderQuotes.data.map((quote) => (
            <div key={quote._id}>
              <div className="scroll-area p-[2rem] h-screen  flex flex-col justify-center items-center text-black text-center">
                <div className="text-3xl">{quote.quoteText}</div>
                <div className="flex relative top-[100px] flex-row justify-center items-center gap-3">
                  <div>Share</div>
                  <div>Heart</div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Ouotes;
