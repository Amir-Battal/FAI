import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function Leaf2(parent) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537234/Leaf2_etc1s_ckvadt.glb",
    position: [-70, 1, -170], 
    scale: [50, 50, 50],
    rotation: [0, 1, 0.4],
  });
}
