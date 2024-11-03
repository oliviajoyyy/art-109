// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

// import particles cursor
import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';

const pc = particlesCursor({
    el: document.getElementById('particles'),
    gpgpuSize: 512,
    colors: [ 0xffea00, 0xff002f],
    color: 0xff0000,
    coordScale: 0.4,
    noiseIntensity: 0.007,
    noiseTImeCoef: 0.0002,
    pointSize: 2,
    PointDecay: 0.005,
    sleepRadiusX: 350,
    sleepRadiusy: 350,
    sleepTimeCoefX: 0.005,
    sleepTimeCoefy: 0.007,
});
