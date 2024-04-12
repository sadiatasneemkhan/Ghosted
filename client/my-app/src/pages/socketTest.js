// WebSocket.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SocketTest = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://localhost:8080/upload/", formData);
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/upload/");

      setImage(response.data.logo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="button" onClick={upload}>
        Upload
      </button>
      <img src={`http://localhost:8080/images/${image}`} alt="Uploaded" />
    </div>
  );
};

export default SocketTest;
