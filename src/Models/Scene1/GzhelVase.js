import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function GzhelVase(parent) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537233/GzhelVase_etc1_h8x53k.glb",
    position: [30, -20, -82],
    scale: [40, 40, 40],
    rotation: [0, -1, 0],
  });
}
