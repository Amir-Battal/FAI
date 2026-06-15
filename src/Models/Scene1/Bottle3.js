import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";

export function Bottle3(parent, onLoad = null) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/dqe36doqn/image/upload/v1781537239/productGASAQ_r9rjtv.glb",
    position: [-7, -3.8, 5],
    scale: [6, 6, 6],
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
