import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
const fetchWeatherData = async (location) => {
  const apiKey = "4e909221a418d30a25b61602f97c3462";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
};

const Weather = () => {
  const location = "Taungoo"; // Replace with your desired location

  const { isLoading, isError, data, error } = useQuery("weatherData", () =>
    fetchWeatherData(location)
  );

  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const handleBatteryStatus = (event) => {
      const { level } = event.target;
      setBatteryLevel(level * 100);
    };

    if (navigator.battery) {
      // For older browsers
      navigator.battery.addEventListener("levelchange", handleBatteryStatus);
      setBatteryLevel(navigator.battery.level * 100);
    } else if (navigator.getBattery) {
      // For modern browsers
      navigator.getBattery().then((battery) => {
        battery.addEventListener("levelchange", handleBatteryStatus);
        setBatteryLevel(battery.level * 100);
      });
    }

    // Clean up event listener
    return () => {
      if (navigator.battery) {
        navigator.battery.removeEventListener(
          "levelchange",
          handleBatteryStatus
        );
      } else if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
          battery.removeEventListener("levelchange", handleBatteryStatus);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (isBroadcasting && data) {
      const temperature = Math.round(data.main.temp - 273.15);
      const weatherDescription = data.weather[0].description;

      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      let greeting = "";

      if (currentHour < 12) {
        greeting = "Good morning";
      } else if (currentHour < 18) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good Night";
      }
      let additionalMessage = "";

      if (weatherDescription.includes("rain")) {
        additionalMessage = "Don't forget to take your umbrella!";
      } else if (weatherDescription.includes("snow")) {
        additionalMessage = "Bundle up and stay warm!";
      } else if (weatherDescription.includes("cloud")) {
        additionalMessage = "It's a cloudy day today.";
      } else if (weatherDescription.includes("clear")) {
        additionalMessage = "The skies are clear.";
      }
      let batteryMessage = "";

      if (batteryLevel < 20) {
        batteryMessage =
          "Your battery level is critically low. Please charge your device immediately.";
      } else if (batteryLevel < 50) {
        batteryMessage = "If you go out, don't forget to charge your device.";
      } else if (batteryLevel === 100) {
        batteryMessage = "Your battery is fully charged. Enjoy your day!";
      } else {
        batteryMessage = "Your battery level is sufficient. Have a great day!";
      }

      const speechMessage = `${greeting}! The current temperature in ${location} is ${temperature} degrees Celsius. The weather is ${weatherDescription}. ${additionalMessage} . Your bettery % is ${batteryLevel} . ${batteryMessage}`;

      const desiredVoice = window.speechSynthesis
        .getVoices()
        .find(
          (voice) =>
            voice.name ===
            "Microsoft Aria Online (Natural) - English (United States)"
        );

      const speakWeatherData = () => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = speechMessage;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        speech.voice = desiredVoice;
        speech.onend = () => {
          setIsBroadcasting(false);
        };
        window.speechSynthesis.speak(speech);
      };

      speakWeatherData();
    }
  }, [isBroadcasting, data, location]);

  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
  };

  const handleBroadcastClick = () => {
    setIsBroadcasting(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Weather Information : {location}
      </h1>

      <p className="text-lg">
        Temperature: {Math.round(data.main.temp - 273.15)}°C
      </p>
      <p className="text-lg">Weather: {data.weather[0].description}</p>
      <button
        onClick={handleBroadcastClick}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Broadcast Weather Data
      </button>
    </div>
  );
};

export default Weather;
