import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// listen to cursor state
const cursor = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
    // stabilise to -0.5 .. 0.5
    cursor.x = (e.clientX / sizes.width - 0.5);
    cursor.y = - (e.clientY / sizes.height - 0.5);
    // correct position.y VS clientY inversion
});

// Canvas
const canvas = document.querySelector('canvas#webgl');

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const sizes = { width: 800, height: 600 };

// field of view (vertical vision angle), aspect ratio,                  _near, _far 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

scene.add(camera);
camera.lookAt(mesh.position);

// &controls
const controls = new OrbitControls(camera, canvas);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// Animations
const animLoop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animLoop);
}

animLoop();