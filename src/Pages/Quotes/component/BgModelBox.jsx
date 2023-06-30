import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

// const fetchPhotos = async (query, page = 1) => {
//   const response = await axios.get("https://api.unsplash.com/search/photos", {
//     params: {
//       query: query,
//       page: page,
//       client_id: "98dZ2-zlMCr7_VWbQXBl87Tr7mwDb6ww21WTe7XNt6E",
//     },
//   });

//   return response.data.results;
// };

const BgModelBox = () => {
  return (
    <div>
      <dialog id="my_modal_3" className="w-full  h-screen">
        <form method="dialog" className="w-full h-full">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default BgModelBox;

{
  /* <form onSubmit={handleSearch} className="mb-5 text-black">
<input
  type="text"
  name="search"
  placeholder="Search..."
  className="px-4 py-2 border border-gray-300 rounded-md mr-2 text-sm"
/>

<button
  type="submit"
  className="px-4 py-2 bg-green-500 text-white rounded-md text-sm"
>
  Search
</button>
</form> */
  // {data &&
  //   data.map((photo) => (
  //     <div key={photo.id} className="photo-item">
  //       <img src={photo.urls.regular} alt={photo.alt_description} />
  //     </div>
  //   ))}
}

// const [searchQuery, setSearchQuery] = useState("");
// const { data, isLoading, isError } = useQuery(["photos", searchQuery], () =>
//   fetchPhotos(searchQuery)
// );

// const handleSearch = (e) => {
//   e.preventDefault();
//   setSearchQuery(e.target.elements.search.value);
// };

// if (isLoading) {
//   return <h1>Loading...</h1>;
// }

// if (isError) {
//   return <h1>Error occurred while fetching photos.</h1>;
// }
