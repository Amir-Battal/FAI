import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";

export function Bottle1(parent, onLoad = null) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537226/productNADA_kbqpcs.glb",
    position: [-4, -3, 0],
    scale: [1.5, 1.5, 1.5],
    name: "bottle1",
    onLoad: (mesh) => {
      mesh.userData.productKey = "product2";
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.userData.productKey = "product2";
        }
      });
      if (onLoad) onLoad(mesh);
    },
  });
}