import React from "react";

const About = () => {
  return (
    <div style={{ width: "100%", padding: "30px", boxSizing: "border-box" }}>
      {/* photo of me */}
      <div style={{ margin: "0 auto", width: "80%" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src="http://d215dknelqyzhw.cloudfront.net/portrait_cropped.jpg"
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              margin: "0 auto"
            }}
          ></img>
        </div>
        {/* Interests */}
        {/* Resume */}
        <h1>Education</h1>
        <img
          src="http://d215dknelqyzhw.cloudfront.net/Wharton_Logo.png"
          style={{ width: "300px" }}
        ></img>
        <p>
          BS in Economics, concentration in Entrepreneruship and Innovation,
          2016 Coursework in Computer Science and Mechanical Engineering
        </p>
        <h2>General Assembly</h2>
        <p>WDI</p>
        <h1>Work</h1>
        <h2>
          <a href="https://www.8i.com/">
            <img
              src="http://d215dknelqyzhw.cloudfront.net/8i_logo.png"
              style={{ width: "100px", height: "100px" }}
            ></img>
          </a>
          "Our mission is to tell the human story in 3 dimensions"
        </h2>
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
        <div>put 8i images here yo!</div>
        <h2>
          <a href="https://www.vertebrae.com/">
            <img
              src="http://d215dknelqyzhw.cloudfront.net/vertebrae_logo400px.jpg"
              style={{ width: "200px" }}
            ></img>
          </a>
          Manage and deploy 3D &amp; AR content frictionlessly – everywhere your
          customers shop.
        </h2>
        <h3>Implementation Engineer</h3>
        <p>
          Manage and deploy the integration of Vertebrae code onto client sites
        </p>
        <p>Implemented</p>
        <p>I can put the logos of every company here</p>
        <ul>
          <li>CB2</li>
          <li>Tumi</li>
          <li>MysteryRanch</li>
        </ul>
        <p>Advised</p>
        <ul>JBL</ul>
        <div>TAKE SCREENSHOTS AND VIDEOS OF IMPLEMENTATIONS</div>
        <h1>Other</h1>
        {/* <h2>Momentfeed</h2>
      <p>Sales Development Representative</p> */}
        <h1>News</h1>
        {/* 8th Wall Integration */}
      </div>
    </div>
  );
};

export default About;
