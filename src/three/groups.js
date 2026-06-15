import * as THREE from "three";
import { scene } from "./scene";

// ----------------------
// Environment Group (الخلفية)
// ----------------------
export const environmentGroup = new THREE.Group();
scene.add(environmentGroup);

// ----------------------
// Products Group
// ----------------------
export const productsGroup = new THREE.Group();
scene.add(productsGroup);

// ----------------------
// Products
// ----------------------
export const product1 = new THREE.Group();
export const product2 = new THREE.Group();
export const product3 = new THREE.Group();

product1.name = "product1";
product2.name = "product2";
product3.name = "product3";

// positions
product1.position.set(-10, 0, 0);
product2.position.set(2, 0, 0);
product3.position.set(14, 0, 0);

productsGroup.add(product1);
productsGroup.add(product2);
productsGroup.add(product3);