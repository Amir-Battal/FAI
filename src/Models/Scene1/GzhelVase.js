import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";


export function GzhelVase(parent) {
  loadModel({
    parent,
    scene,
    path: "https://ik.imagekit.io/j9omozvmgf/GzhelVase_etc1.glb",
    position: [30, -20, -82],
    scale: [40, 40, 40],
    rotation: [0, -1, 0],
  });
}
