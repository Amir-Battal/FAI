import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";

export function Bottle1(parent, onLoad = null) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537226/productNADA_kbqpcs.glb",
    // position: [-1, -2.5, 0],
    // position: [-1.5, -2, 0],
    // scale: [3.2, 3.2, 3.2],
    rotation: [0, 0, -0.2] ,
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