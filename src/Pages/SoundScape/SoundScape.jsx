import React, { useState, useEffect } from "react";

const SoundScape = () => {
  const [currentTimes, setCurrentTimes] = useState([]);
  const [durations, setDurations] = useState([]);
  const audioUrls = [
    "https://firebasestorage.googleapis.com/v0/b/songurl.appspot.com/o/light-rain-ambient-114354.mp3?alt=media&token=9953a57f-2519-47d7-921c-04b9c7d226fd",
    "https://firebasestorage.googleapis.com/v0/b/songurl.appspot.com/o/relaxing-mountains-rivers-streams-running-water-18178.mp3?alt=media&token=346795b7-58f9-483e-bf0b-0b4ad589048c",
    "https://firebasestorage.googleapis.com/v0/b/songurl.appspot.com/o/forest-with-small-river-birds-and-nature-field-recording-6735.mp3?alt=media&token=8ce144d6-915f-442f-b2f5-f4c973a89f7a",
    "https://firebasestorage.googleapis.com/v0/b/songurl.appspot.com/o/waves-hitting-the-rocks-16680.mp3?alt=media&token=fbf83b5b-835a-4ed2-91cb-438a4e6bf0cd",
  ];
  const [isPlaying, setIsPlaying] = useState(audioUrls.map(() => false));

  useEffect(() => {
    const audioElements = audioUrls.map((_, index) =>
      document.getElementById(`audio-${index}`)
    );

    audioElements.forEach((audioElement, index) => {
      audioElement.addEventListener("timeupdate", () =>
        handleTimeUpdate(index)
      );
      audioElement.addEventListener("loadedmetadata", () =>
        handleLoadedMetadata(index)
      );
    });

    return () => {
      audioElements.forEach((audioElement, index) => {
        audioElement.removeEventListener("timeupdate", () =>
          handleTimeUpdate(index)
        );
        audioElement.removeEventListener("loadedmetadata", () =>
          handleLoadedMetadata(index)
        );
      });
    };
  }, []);

  useEffect(() => {
    const audioElements = audioUrls.map((_, index) =>
      document.getElementById(`audio-${index}`)
    );

    audioElements.forEach((audioElement, index) => {
      if (isPlaying[index]) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    });
  }, [isPlaying]);

  const handleTogglePlay = (index) => {
    setIsPlaying((prevState) => {
      const updatedState = prevState.map((state, i) =>
        i === index ? !state : false
      );
      return updatedState;
    });
  };

  const handleTimeUpdate = (index) => {
    const audioElement = document.getElementById(`audio-${index}`);
    setCurrentTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[index] = audioElement.currentTime;
      return updatedTimes;
    });
  };

  const handleLoadedMetadata = (index) => {
    const audioElement = document.getElementById(`audio-${index}`);
    setDurations((prevDurations) => {
      const updatedDurations = [...prevDurations];
      updatedDurations[index] = audioElement.duration;
      return updatedDurations;
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateProgress = (index) => {
    return (currentTimes[index] / durations[index]) * 100;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">SoundScape</h1>
      {audioUrls.map((audioUrl, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-lg font-bold mb-2">Song {index + 1}</h3>
          <audio id={`audio-${index}`} src={audioUrl}></audio>
          <div className="flex items-center">
            <div className="w-full h-2 bg-gray-300 rounded">
              <div
                className={`h-full ${
                  isPlaying[index] ? "bg-blue-500 w-0" : "bg-gray-300 w-0"
                }`}
                style={{ width: `${calculateProgress(index)}%` }}
              ></div>
            </div>
            <div className="ml-2 text-gray-600">
              {formatTime(currentTimes[index] || 0)}
            </div>
            <div className="ml-2 text-gray-600">
              {formatTime(durations[index] || 0)}
            </div>
          </div>
          <button
            className={`mt-2 px-4 py-2 rounded-md ${
              isPlaying[index]
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => handleTogglePlay(index)}
          >
            {isPlaying[index] ? "Pause" : "Play"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SoundScape;
