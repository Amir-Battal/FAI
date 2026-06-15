import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import * as THREE from "three";

import { scene } from "./scene";
import { getRenderer } from "./renderer";

export function loadEnvironment() {
  const renderer = getRenderer();

  new RGBELoader()
    .setPath("")
    .load(
      "/hdri/hdri.hdr",
      (texture) => {
        texture.mapping =
          THREE.EquirectangularReflectionMapping;

        scene.environment = texture;
        scene.background = new THREE.Color("#101010");

        if (renderer) {
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1;
        }
      },
      undefined,
      (err) => {
        console.warn("HDR load failed, using fallback:", err);
        scene.background = new THREE.Color("#101010");
      }
    );
}