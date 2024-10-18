// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models


// -------------  Declare global variables ------------- 
let scene, camera, renderer;
let cube, torus, torusKnot, ball; // geometries
let dog; // animation model
let sceneContainer = document.querySelector("#scene-container");
let mixer;
let actionPant, actionTail; // animation variables

// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x015220);
    
    // ------- lights -------
    
    // create light to see 3D model
    const light = new THREE.DirectionalLight(0xfff000, 3); // args white light, strength of light
    light.position.set(-3, 4, 5);
    scene.add(light);

    // add directional light helper
    const helper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(helper); // comment out to hide helper

    // make aspect ratio the same as scene container's width height
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer( {antialias: true});
    // set size to the size of the div
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight); 
    sceneContainer.appendChild(renderer.domElement); // append to specific element
    
    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);

    // load 3D model
    const loader = new GLTFLoader(); // to load 3d models
    loader.load('assets/dog_shiny.gltf', function(gltf) {
        dog = gltf.scene;
        scene.add(dog);
        dog.scale.set(2, 2, 2);
        dog.position.y = -2;
        // mixer is the animation player
        mixer = new THREE.AnimationMixer(dog);
        const clips = gltf.animations; // variable holds an object that includes the animations fr gltf file

        // pant animation
        const clipPant = THREE.AnimationClip.findByName(clips, 'pant'); // get animation by name
        actionPant = mixer.clipAction(clipPant); // make clip into playable action
        // actionPant.play();

        // tail wag animation
        const clipTail = THREE.AnimationClip.findByName(clips, 'tail'); // get animation by name
        actionTail = mixer.clipAction(clipTail); // make clip into playable action
        actionTail.play();
        
        /* to play all animations at once
        clips.forEach(function(clip) {
            const action = mixer.clipAction(clip);
            action.play();
        })
        */
    })

    /* Create sphere geometry */
    const geometry = new THREE.SphereGeometry(.2, 32, 16);
    const texture = new THREE.TextureLoader().load('textures/checker.jpg');
    const material = new THREE.MeshStandardMaterial( { map: texture });
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    ball = new THREE.Mesh(geometry, material);
    scene.add(ball);
    
    // position camera
    camera.position.z = 5;
}

// ------------- EVENT LISTENERS ------------- 

let mouseIsDown = false;

document.querySelector("body").addEventListener('mousedown', () => {
    actionPant.play();
    actionPant.paused = false;
    mouseIsDown = true;
    console.log("mousedown");
});

document.querySelector("body").addEventListener('mouseup', () => {
    // actionPant.stop();
    mouseIsDown = false;
    actionPant.paused = true;
    console.log("mouseup");
});

document.querySelector("body").addEventListener('mousemove', () => {
    if (mouseIsDown) {
        console.log("mousemove");
        ball.rotation.x += .5;
    }
});


const clock = new THREE.Clock();

// rendering the scene
function animate() {
    requestAnimationFrame(animate);

    // rotate the ball
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    // animate ball to move according to sine curve
    ball.position.x = Math.sin(Date.now() / 2000) * 4; // speed up = decrease # divided by, larger radius = * by larger value
    ball.position.y = Math.sin(Date.now() / 4000) * 4;
    ball.position.z = Math.sin(Date.now() / 5000) * 4;
    //console.log(ball.position.x);

    // if dog is loaded
    if (dog) {
        // animating the dog model
        // dog.rotation.x += 0.007;
        // dog.rotation.y += 0.007;
        dog.rotation.y = Math.sin(Date.now() / 500) * .5;
    }

    if (mixer) {
        mixer.update(clock.getDelta()); // updates the animation
    }

    renderer.render(scene, camera);
}

 /* Add box geometry */
function createBox() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const texture = new THREE.TextureLoader().load('textures/checker.jpg');
    const material = new THREE.MeshStandardMaterial( { map: texture });
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

 /* Add torus geometry */
function createTorus() {
    const geometryTorus = new THREE.TorusGeometry(1.3, 1, 4, 100); 
    const textureTorus = new THREE.TextureLoader().load('textures/ice-texture.jpg');
    const materialTorus = new THREE.MeshBasicMaterial( { map: textureTorus });
    torus = new THREE.Mesh(geometryTorus, materialTorus);
    scene.add(torus);
    torus.position.x = 4;
    torus.position.y = 3;
}

 /* Add torus knot geometry */
function createTorusKnot() {
    const geometryTorusKnot = new THREE.TorusKnotGeometry(2, 0.5, 50, 4, 9, 3);
    const textureTorusKnot = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
    const materialTorusKnot = new THREE.MeshBasicMaterial( { map: textureTorusKnot });
    torusKnot = new THREE.Mesh(geometryTorusKnot, materialTorusKnot);
    scene.add(torusKnot);
    torusKnot.position.x = -5;
    torusKnot.position.y = 3;
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
// renderer.setAnimationLoop(animate);
