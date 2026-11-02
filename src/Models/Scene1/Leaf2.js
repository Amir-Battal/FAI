import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function Leaf2(parent) {
  loadModel({
    parent,
    scene,
    path: "https://ik.imagekit.io/j9omozvmgf/Leaf2_etc1s.glb",
    position: [-70, 1, -170], 
    scale: [50, 50, 50],
    rotation: [0, 1, 0.4],
  });
}
