import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#fff");

// camera
const getAspectRatio = () => window.innerWidth / window.innerHeight;
const FOV = 75;
const frustumNear = 0.1;
const frustumFar = 1000;
const camera = new THREE.PerspectiveCamera(
  FOV,
  getAspectRatio(),
  frustumNear,
  frustumFar
);
// have to put the camera somwhere
camera.position.z = 5;

// create object
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({
  color: "#ff0000",
  emissive: "#0000ff"
});
const dodecahedron = new THREE.Mesh(geometry, material);
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: "#ff0000",
  emissive: "#00ff00"
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

// add to scene
scene.add(dodecahedron);
scene.add(box);

// lighting
const light = new THREE.SpotLight(0x99fbf1, 10);
light.position.set(1, 1, 1);
scene.add(light);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// animate
let iterator = 0; // using this for debugging
function animate() {
  dodecahedron.rotateX(0.01);
  dodecahedron.rotateY(0.01);

  controls.update();

  if (iterator === 30) {
    // console.log(cube);
  }

  iterator = iterator >= 30 ? 0 : iterator + 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = getAspectRatio();
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
