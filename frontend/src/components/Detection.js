import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Detection() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (result && image) {
      // draw image
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // draw bounding boxes
        result.forEach((obj) => {
          ctx.beginPath();
          ctx.lineWidth = '3';
          ctx.strokeStyle = 'red';
          ctx.rect(
            obj.xmin,
            obj.ymin,
            obj.xmax - obj.xmin,
            obj.ymax - obj.ymin
          );
          ctx.stroke();
        });
      };
      img.src = URL.createObjectURL(image);
    }
  }, [image, result]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    try {
      const res = await axios.post('http://localhost:8000/objectdetection', formData);
      setResult(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        <button type='submit'>Upload</button>
      </form>
      {result.length > 0 && (
        <div>
          <h2>Object Detection Result:</h2>
          <ul>
            {result.map((obj, idx) => (
              <li key={idx}>{obj.name}</li>
            ))}
          </ul>
        </div>
      )}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
