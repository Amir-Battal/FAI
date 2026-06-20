import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";

export function Bottle3(parent, onLoad = null) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537239/productGASAQ_r9rjtv.glb",
    position: [-1.3, -1, -1.2],
    scale: [4.5, 4.5, 4.5],
    name: "bottle3",
    onLoad: (mesh) => {
      mesh.userData.productKey = "product3";
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.userData.productKey = "product3";
        }
      });
      if (onLoad) onLoad(mesh);
    },
  });
}
