import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function Rock1(parent) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537229/Rock_etc1_gfjkrz.glb",
    position: [50, -20, -70],
    scale: [30, 30, 30],
    rotation: [0, 0, 0],
  });
}
