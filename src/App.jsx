import React, { useState } from "react";
import QRCode from "qrcode";
import "./App.css";

export default function App() {
  const [inputData, setInputData] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [isNightMode, setIsNightMode] = useState(false);

  const generateQR = () => {
    if (!inputData) {
      alert("Please enter text or a link.");
      return;
    }
   QRCode.toDataURL(
      inputData,
      { errorCorrectionLevel: "H" },
      (err, url) => {
        if (err) {
          console.error("QR Code Generation Error:", err);
          return;
        }
        setQrImageUrl(url);
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateQR();
    }
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className={`app-container ${isNightMode ? "night-mode" : ""}`}>
      <main className="main-content">
        <h1>QR Code Generator</h1>
        <button onClick={toggleNightMode} className="nightModeButton">
          {isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
        </button>
        <div className="input-container">
          <input
            id="dataInput"
            placeholder="Input text or link"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button onClick={generateQR}>Generate QR Code</button>
        <div className="qr-output">
          {qrImageUrl && (
            <img
              src={qrImageUrl}
              alt="Generated QR Code"
              className="qr-image"
            />
          )}
        </div>
      {qrImageUrl && (
        <button onClick={downloadQR}  id="download">Download QR Code</button>
      )}
      </main>
    </div>
  );
}
