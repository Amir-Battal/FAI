import * as THREE from "three";
import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";

export function FloorBrown(parent, onLoaded) {
  loadModel({
    parent,
    scene,
    path: "https://ik.imagekit.io/j9omozvmgf/floorBrown.glb",
    position: [0, -20, -120],
    scale: [15, 15, 15],

    onLoad: (model) => {
      onLoaded?.(model);
    },
  });
}
