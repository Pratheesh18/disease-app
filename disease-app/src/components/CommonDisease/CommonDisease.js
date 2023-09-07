import React, { useState } from "react";
import axios from "axios";
import './CommonDisease.css';

function CommonDisease() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handlePredictClick = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/predicts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if ("prediction" in response.data) {
        setPredictionResult(response.data.prediction);
      } else {
        console.log("Prediction key not found in response:", response.data);
      }
    } catch (error) {
      console.error("Error predicting:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{color:"green"}}>Disease Prediction App</h1>
        <h2> Common Diseases </h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handlePredictClick} disabled={!selectedImage}>
          Predict
        </button>
        {selectedImage && (
          <div className="image-container">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="selected-image"
            />
          </div>
        )}
        {predictionResult && <p>Prediction: {predictionResult}</p>}
      </header>
    </div>
  );
}

export default CommonDisease;
