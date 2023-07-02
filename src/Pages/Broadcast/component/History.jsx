import React from "react";
import { useQuery } from "react-query";

const fetchHistoricalEvents = async () => {
  const url = "https://api.api-ninjas.com/v1/historicalevents?text=war";
  const apiKey = "WiWGIyNTRQTwVCPjfORVpw==pMuOWweOkcTqmCrX";

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch historical events");
  }

  return response.json();
};

const History = () => {
  const { data, isLoading, error } = useQuery(
    "historicalEvents",
    fetchHistoricalEvents
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="text-red-400 w-full flex flex-col justify-center items-center">
      <h1>History</h1>
      <div className="text-black w-64 bg-green-300    carousel rounded-box">
        {data.map((i) => (
          <div key={i.event} className="carousel-item w-full  ">
            <div className="w-full h-auto flex flex-col justify-center items-start px-[1rem]">
              <div>{i.year}</div>
              <div>{i.event}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
