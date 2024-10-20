// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), // entire scene inside the canvas and want to render the canvas
})

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 50;

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const texture = new THREE.TextureLoader().load('textures/checker.jpg');
const material = new THREE.MeshBasicMaterial({map: texture});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
torus.position.z = -55;
torus.position.x = -10;

function moveCamera() {
    // t is our position on the website
    const t = document.body.getBoundingClientRect().top; // gets client viewport mesurements and .top gets how far from top
    // change camera position
    camera.position.z = t * 0.095; // speed of zoom in, lower value = slower zoom in
    camera.position.x = t * 0.01; // larger val moves camera to left (object moves to right side of screen)
}

document.body.onscroll = moveCamera; // bind function to scroll event

moveCamera();

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.z += 0.01;
    renderer.render(scene, camera);
}

animate();