// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

let scene, camera, renderer;
let cube, torus, torusKnot;

function init() {
    scene = new THREE.Scene();
    
    // create light to see 3D model
    const light = new THREE.DirectionalLight(0xffffff, 7); // args white light, strength of light
    light.position.set(3, 4, 5);
    scene.add(light);

    // add directional light helper
    const helper = new THREE.DirectionalLightHelper(light, 5);
    //scene.add(helper); // comment out to hide helper

    // create light to see 3D model
    const lightLeft = new THREE.DirectionalLight(0x0000ff, 7); // args white light, strength of light
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    // add directional light helper
    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    //scene.add(helperLeft); // comment out to hide helper

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer( {antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);

    // load 3D model
    const loader = new GLTFLoader(); // to load 3d models
    loader.load('assets/dog_shiny.gltf', function(gltf) {
        const dog = gltf.scene;
        scene.add(dog);
        dog.scale.set(5, 5, 5);
        dog.position.x = -3;
        dog.position.y = -4;
        dog.position.z = 1;
        dog.rotation.x = 0.3;
        dog.rotation.y = 0.8;
    })
    
    // →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

    /* Create box geometry */
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const texture = new THREE.TextureLoader().load('textures/checker.jpg');
    const material = new THREE.MeshStandardMaterial( { map: texture });
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    /* Add torus geometry */
    const geometryTorus = new THREE.TorusGeometry(1.3, 1, 4, 100); 
    const textureTorus = new THREE.TextureLoader().load('textures/ice-texture.jpg');
    const materialTorus = new THREE.MeshBasicMaterial( { map: textureTorus });
    torus = new THREE.Mesh(geometryTorus, materialTorus);
    scene.add(torus);
    torus.position.x = 4;
    torus.position.y = 3;

    /* Add torus knot geometry */
    const geometryTorusKnot = new THREE.TorusKnotGeometry(2, 0.5, 50, 4, 9, 3);
    const textureTorusKnot = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
    const materialTorusKnot = new THREE.MeshBasicMaterial( { map: textureTorusKnot });
    torusKnot = new THREE.Mesh(geometryTorusKnot, materialTorusKnot);
    scene.add(torusKnot);
    torusKnot.position.x = -5;
    torusKnot.position.y = 3;

    // class CustomSinCurve extends THREE.Curve {

    //     constructor( scale = 1 ) {
    //         super();
    //         this.scale = scale;
    //     }
    
    //     getPoint( t, optionalTarget = new THREE.Vector3() ) {
    
    //         const tx = t * 3 - 1.5;
    //         const ty = Math.sin( 2 * Math.PI * t );
    //         const tz = 0;
    
    //         return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    //     }
    // }
    
    // const path = new CustomSinCurve( 10 );
    // const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
    
    camera.position.z = 10;
}

// rendering the scene
function animate() {
    requestAnimationFrame(animate);

    // animating the cube
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.01;

    // animating the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;

    // animating the torus knot
    torusKnot.rotation.x += 0.03;
    torusKnot.rotation.y += 0.02;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
// renderer.setAnimationLoop(animate);
