import { EffectComposer } from "postprocessing";
import { RenderPass } from "postprocessing";

import { getRenderer } from "./renderer";
import { scene } from "./scene";
import { camera } from "./camera";

import {
  BloomEffect,
  EffectPass
} from "postprocessing";

let composerInstance = null;

export default {
  get composer() {
    if (!composerInstance) {
      const renderer = getRenderer();
      if (!renderer) return null;

      composerInstance = new EffectComposer(renderer);
      composerInstance.addPass(new RenderPass(scene, camera));

      const bloom = new BloomEffect({
        intensity: 0.25,
        mipmapBlur: true,
        luminanceThreshold: 0.85,
      });

      composerInstance.addPass(new EffectPass(camera, bloom));
    }
    return composerInstance;
  },

  render() {
    this.composer?.render();
  }
};