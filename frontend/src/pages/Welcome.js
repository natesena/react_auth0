import React from 'react'
import * as THREE from 'three'

class Welcome extends React.Component{
    
    state = { isMounted: true };

    componentDidMount() {
        this.setupScene()
        this.startAnimation()
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
        this.renderer.setSize( width, height );
        this.el.appendChild( this.renderer.domElement );

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
    }

    startAnimation = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera );
        this.requestID = window.requestAnimationFrame(this.startAnimation)
    }

    render() {
        return (
            <div style={{width: '100vw', height: '100vh'}} ref={ref => (this.el = ref)} />
        )
    }
}


export default Welcome