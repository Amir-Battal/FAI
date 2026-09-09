import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function RockLeaf(parent) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/c9tptioy/image/upload/v1788954205/RockLeaf_etc1.glb",
    position: [0, -20, -55],
    scale: [3, 3, 3],
    rotation: [0, 0, 0],
  });
}
