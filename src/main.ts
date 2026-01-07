import "./style.css";
import * as THREE from "three";

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

// camera
const aspectRatio = window.innerWidth / window.innerHeight;
const FOV = 75;
const frustumNear = 0.1;
const frustumFar = 1000;
const camera = new THREE.PerspectiveCamera(
  FOV,
  aspectRatio,
  frustumNear,
  frustumFar
);
camera.position.z = 5;

// create object
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({
  color: "#468585",
  emissive: "#468585"
});
// material = new THREE.MeshDepthMaterial();
const cube = new THREE.Mesh(geometry, material);

// add to scene
scene.add(cube);

// lighting
const light = new THREE.DirectionalLight(0x9cdba6, 10);
light.position.set(1, 1, 1);
scene.add(light);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// animate
let iterator = 0; // using this for debugging
let scaleDirection = 1;
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cube.scale.x += 0.001 * scaleDirection;
  cube.scale.y += 0.001 * scaleDirection;
  cube.scale.z += 0.001 * scaleDirection;

  if (cube.scale.x >= 1.5) scaleDirection = -1;
  else if (cube.scale.x <= 1) scaleDirection = 1;

  // cube.scale.x = cube.scale.x >= 2 ? cube.scale.x - 0.01 : cube.scale.x + 0.01;

  if (iterator === 30) {
    // console.log(cube);
  }

  iterator = iterator >= 30 ? 0 : iterator + 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
