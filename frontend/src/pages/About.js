import React from "react";

const about = () => {
  return (
    <div style={{ width: "100%" }}>
      {/* photo of me */}
      <img
        src="http://d215dknelqyzhw.cloudfront.net/portrait_cropped.jpg"
        style={{
          height: "200px",
          width: "200px",
          borderRadius: "50%",
          margin: "0 auto"
        }}
      ></img>
      {/* Interests */}
      {/* Resume */}
      <h1>Education</h1>
      <h2>Penn, Wharton</h2>
      <p>
        BS in Economics, concentration in Entrepreneruship and Innovation, 2016
        Coursework in Computer Science and Mechanical Engineering
      </p>
      <h1>Work</h1>
      <h2>Momentfeed</h2>
      <h2>8i</h2>
      <ul>
        <li>
          Built a scalable and portable volumetric video (hologram) capture
          system with a material cost &lt; $10,000 from Raspberry Pi’s and
          action cameras
        </li>
        <li>
          Designed > 10x physical iterations in Solidworks and 5x electrical
          diagrams
        </li>
        <li>
          Developed software functions to check Amazon S3 uploads and camera
          status
        </li>
        <li>
          Performed 3 activations delivering over 300 holograms in Dubai, SD,
          and SF
        </li>
        <li>
          Sold 2 capture systems to Baidu and RMC (Subsidiary of Softbank)
        </li>
      </ul>

      <h2>Vertebrae</h2>
    </div>
  );
};

export default about;
