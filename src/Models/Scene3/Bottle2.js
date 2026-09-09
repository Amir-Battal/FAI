import { loadModel } from "../../three/Model";
import { scene } from "../../three/scene";

export function Bottle2(parent, onLoad = null) {
  loadModel({
    parent,
    scene,
    path: "https://res.cloudinary.com/c9tptioy/image/upload/v1788953872/prodcutSAFAA.glb",
    position: [-1.5, -3, -1.2],
    scale: [5, 5, 5],
    name: "bottle2",
    onLoad: (mesh) => {
      mesh.userData.productKey = "product1";
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.userData.productKey = "product1";
        }
      });
      if (onLoad) onLoad(mesh);
    },
  });
}
