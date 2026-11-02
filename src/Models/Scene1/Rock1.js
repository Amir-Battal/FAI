import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function Rock1(parent) {
  loadModel({
    parent,
    scene,
    path: "https://ik.imagekit.io/j9omozvmgf/Rock_etc1.glb",
    position: [50, -20, -70],
    scale: [30, 30, 30],
    rotation: [0, 0, 0],
  });
}
