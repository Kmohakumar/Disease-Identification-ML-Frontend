import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';



function App() {
// const st={
//   margin: "auto",
// }

  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [disease, setDisease] = useState(null)
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const response = await fetch('http://13.233.120.200:8000/classify', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.prediction);
      if (data.prediction === 'apple') {
        const appleResponse = await fetch('http://13.233.120.200:8000/apple-predict', {
          method: 'POST',
          body: formData,
        });
        const appleData = await appleResponse.json();
        setDisease(appleData.prediction);
      } else if (data.prediction === 'potato') {
        const potatoResponse = await fetch('http://13.233.120.200:8000/potato-predict', {
          method: 'POST',
          body: formData,
        });
        const potatoData = await potatoResponse.json();
        setDisease(potatoData.prediction);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center',flexDirection:"column", height: '100vh' }}>
      <form onSubmit={handleFormSubmit}>
        {/* <input style={{color:"Re"}} type="file" onChange={handleFileChange} /> */}
        <input type="file" style={{ backgroundColor: "#007FFF", color: 'white', padding:"10px", borderRadius: '5px', border: 'none', marginRight:"10px" }} onChange={handleFileChange} />

        <Button variant="contained" disableElevation type="submit">Upload</Button>
      </form>
      <div>
      {file && (
        <div>
          <img src={URL.createObjectURL(file)} alt="uploaded file" />
        </div>
      )}
      <h1>
      {prediction && <p>Prediction: {prediction}</p>}</h1>
      <h1>{disease && <p>Disease: {disease}</p>}</h1>
      </div>
    </div>
  );
}

export default App;
