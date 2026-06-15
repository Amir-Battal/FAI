import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";

const loader = new GLTFLoader();

// Initialize KTX2 loader at module level (before any models load)
let _ktx2Initialized = false;
function ensureKTX2Loader() {
  if (_ktx2Initialized) return;
  _ktx2Initialized = true;

  try {
    const tempRenderer = new THREE.WebGLRenderer({ antialias: true });
    const ktx2Loader = new KTX2Loader()
      .setTranscoderPath("https://threejs.org/examples/jsm/libs/basis/")
      .detectSupport(tempRenderer);
    loader.setKTX2Loader(ktx2Loader);
    tempRenderer.dispose();
  } catch (e) {
    console.warn("KTX2 loader init failed:", e.message);
  }
}

ensureKTX2Loader();

export function loadModel({
  scene,
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  visible = true,
  castShadow = true,
  receiveShadow = true,
  centerModel = true,
  name = "",
  parent = null,
  onLoad = null,
}) {
  loader.load(path, (gltf) => {
    const model = gltf.scene;

    if (name) {
      model.name = name;
    }

    model.visible = visible;

    model.traverse((child) => {

      if (child.isMesh) {

        child.castShadow = false;
        child.receiveShadow = false;

        child.frustumCulled = true;
      }
    });

    if (centerModel) {
      const box = new THREE.Box3().setFromObject(model);

      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);
    }

    model.position.set(...position);
    model.rotation.set(...rotation);
    model.scale.set(...scale);

    if (parent) {
      parent.add(model);
    } else {
      scene.add(model);
    }

    if (onLoad) {
      onLoad(model);
    }
  });
}