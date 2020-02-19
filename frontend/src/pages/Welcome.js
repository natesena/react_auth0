import React from "react";
import * as THREE from "three";
import axios from "axios";
import helveticaRegular from "./../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json";
import { Auth0Context } from "../react-auth0-wrapper";

class Welcome extends React.Component {
  static contextType = Auth0Context;
  // I would like to getTokenSilently from here for the purposes of being auto logged in

  state = { isMounted: true };

  componentDidMount() {
    this.autoLogin();
    axios.get("/api/visitors").then(res => {
      if (res.data.err) {
        //if there were errors in our endpoint
        console.log("there was an error getting visitor data");
      } else {
        this.addVisitorText(res.data.visitorCount);
      }
    });
    this.setupScene();
    this.startAnimation();
    window.addEventListener("resize", this.handleWindowResize);
  }

  autoLogin() {
    const { isAuthenticated, loginWithPopup } = this.context;
    if (!isAuthenticated) {
      try {
        (async () => {
          await loginWithPopup();
        })();
      } catch (e) {
        console.log("Error autoLogging in: ", e);
      }

      // (async () => {
      //   await getTokenSilently()
      //     .then(token => {
      //       console.log("get token auto: ", token);
      //     })
      //     .catch(e => {
      //       console.log("Error Getting Login Token: ", e);
      //     });
      // })();
    }
  }

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  componentWillUnmount() {
    // window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    // this.controls.dispose();
  }

  setupScene = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );

    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    this.cube = new THREE.Mesh(geometry, cubeMaterial);

    this.scene.add(this.cube);
  };

  addVisitorText(visitorCount) {
    var loader = new THREE.FontLoader();
    var font = loader.parse(helveticaRegular);
    var welcomeTextGeometry = new THREE.TextGeometry(
      `You are the ${visitorCount} Visitor`,
      {
        font: font,
        size: 0.5,
        height: 0.05
      }
    );
    var textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.welcomeTextGeometry = new THREE.Mesh(
      welcomeTextGeometry,
      textMaterial
    );
    this.welcomeTextGeometry.position.y = 1;
    this.scene.add(this.welcomeTextGeometry);
  }

  startAnimation = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimation);
  };

  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={ref => (this.el = ref)}
      />
    );
  }
}

export default Welcome;
