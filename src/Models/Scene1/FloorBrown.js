import * as THREE from "three";
import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";

export function FloorBrown(parent, onLoaded) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/c9tptioy/image/upload/v1788954223/floorBrown.glb",
    position: [0, -20, -120],
    scale: [15, 15, 15],

    onLoad: (model) => {
      onLoaded?.(model);
    },
  });
}