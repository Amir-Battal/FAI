import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function RockLeaf(parent) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537240/RockLeaf_etc1_fwnvss.glb",
    position: [0, -20, -55],
    scale: [3, 3, 3],
    rotation: [0, 0, 0],
  });
}
