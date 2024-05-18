import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../App.css"
import TimeUnit from "./TimeUnit";
import { convertToSeconds, formatTime } from "../utils";
function VideoPlayer() {
  const [caption, setCaption] = useState("");
  const [startTime, setStartTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [endTime, setEndTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [formDataArray, setFormDataArray] = useState([]);

  const [videoURLData, setVideoURLData] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [currentCaption, setCurrentCaption] = useState("");



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCaption(value);
  };
  const handleTimeChange = (type, unit, value) => {
    if (type === "start") {
      setStartTime({ ...startTime, [unit]: value });
    } else if (type === "end") {
      setEndTime({ ...endTime, [unit]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const startInSeconds = convertToSeconds(startTime);
    const endInSeconds = convertToSeconds(endTime);
    if (startInSeconds >= endInSeconds) {
      setError("Start time must be less than end time.");
      return;
    }
    const formData = {
      caption,
      startTime: formatTime(startTime),
      start: startInSeconds,
      end: endInSeconds,
      endTime: formatTime(endTime),
    };

    setFormDataArray([...formDataArray, formData]);
    setCaption("");
    setStartTime({ hours: "00", minutes: "00", seconds: "00" });
    setEndTime({ hours: "00", minutes: "00", seconds: "00" });
    setError("");
  };




  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
    const matchingCaption = formDataArray.find(
      (caption) => currentTime >= caption.start && currentTime <= caption.end
    );
    if (matchingCaption) {
      setCurrentCaption(matchingCaption.caption);
    } else {
      setCurrentCaption("");
    }
  };



  const handleVideoSubmit = (e) => {
    e.preventDefault();
    setIsPlaying(true);
  };
  const handleVideoURL = (e) => {
    setVideoURLData(e.target.value);
  };

  return (
    <>
    <h1>Caption Assignment</h1>
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="caption">Caption Text:</label>
            <input
              type="text"
              id="caption"
              name="caption"
              value={caption}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="time-wrapper">
            <div>
              <label>Start Time:</label>
              <TimeUnit
                type="start"
                value={startTime}
                onChange={handleTimeChange}
              />
            </div>
            <div>
              <label>End Time:</label>
              <TimeUnit
                type="end"
                value={endTime}
                onChange={handleTimeChange}
              />
            </div>
          </div>
          <button type="submit">Add Caption</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          {formDataArray.map((formData, index) => (
            <div key={index}>
              <p>
                [{formData.startTime}] - [{formData.endTime}] :{" "}
                {formData.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleVideoSubmit}>
          <div className="form-group">
            <label htmlFor="videoURL">Video URL:</label>
            <input
              type="text"
              id="videoURL"
              name="videoURL"
              value={videoURLData}
              onChange={handleVideoURL}
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        {/* { isPlaying && (
          <ReactPlayer
            className="react-player"
            url={videoURLData}
            controls
            playing={isPlaying}
            onProgress={handleProgress}
          />
        )} */}

          
      </div>


      <div className="video-container">
      { isPlaying &&  <ReactPlayer 
          className="react-player"
          url={videoURLData} 
          controls 
          playing={isPlaying}
          onProgress={handleProgress}
        />
      }
      {
        currentCaption && <div className="caption-container">
        <div className="caption">
          {currentCaption}
        </div>
      </div>
      }
       
      </div>



    </div>
    </>
  );
}
export default VideoPlayer;
