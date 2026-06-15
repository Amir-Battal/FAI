import * as THREE from "three";

let rendererInstance = null;

export function getRenderer() {
  if (rendererInstance) return rendererInstance;

  const canvas = document.querySelector(".webgl");
  if (!canvas) {
    console.error("Canvas .webgl not found");
    return null;
  }

  rendererInstance = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  rendererInstance.setSize(window.innerWidth, window.innerHeight);
  rendererInstance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  rendererInstance.shadowMap.enabled = false;
  rendererInstance.shadowMap.type = THREE.PCFSoftShadowMap;
  rendererInstance.physicallyCorrectLights = true;
  rendererInstance.toneMapping = THREE.ACESFilmicToneMapping;
  rendererInstance.toneMappingExposure = 1;
  rendererInstance.outputColorSpace = THREE.SRGBColorSpace;

  // Handle resize
  window.addEventListener("resize", () => {
    rendererInstance.setSize(window.innerWidth, window.innerHeight);
  });

  return rendererInstance;
}

// Simple proxy object that lazily gets the renderer
export const renderer = new Proxy({}, {
  get(target, prop) {
    const instance = getRenderer();
    if (instance && prop in instance) {
      return instance[prop];
    }
    return undefined;
  }
});