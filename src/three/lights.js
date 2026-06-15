import * as THREE from "three";
import { scene } from "./scene";

export const ambientLight = new THREE.AmbientLight("#fff5dd", 0);
scene.add(ambientLight);

export const sunLight = new THREE.DirectionalLight("#ffe2a3", 0);
sunLight.position.set(20, 30, 15);
scene.add(sunLight);

export const frontLight = new THREE.DirectionalLight("#fff5e6", 0);
frontLight.position.set(0, 5, 20);
scene.add(frontLight);

export const frontFillLight = new THREE.DirectionalLight("#d4e6ff", 0);
frontFillLight.position.set(-10, 2, 15);
scene.add(frontFillLight);

export const fillLight = new THREE.HemisphereLight("#bfe8ff", "#4a3422", 0);
scene.add(fillLight);

export const rimLight = new THREE.DirectionalLight("#9fd8ff", 0);
rimLight.position.set(-20, 15, -30);
scene.add(rimLight);

export const mouseLight = new THREE.SpotLight("#ffd98a", 0);

mouseLight.distance = 80;
mouseLight.angle = 0.35;
mouseLight.penumbra = 1;
mouseLight.decay = 2;

mouseLight.position.set(0, 50, -120);

mouseLight.target.position.set(0, 0, 0);

scene.add(mouseLight);
scene.add(mouseLight.target);