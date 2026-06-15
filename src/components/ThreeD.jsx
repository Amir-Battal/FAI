import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

import { scene } from "../three/scene";
import { camera } from "../three/camera";
import { getRenderer } from "../three/renderer";

import {
  ambientLight,
  sunLight,
  fillLight,
  mouseLight,
  rimLight
} from "../three/lights";

import {
  product1,
  product2,
  product3,
  environmentGroup,
} from "../three/groups";

import { raycaster, mouse } from "../three/raycaster";
import composer from "../three/composer";
import { loadEnvironment } from "../three/environment";
import { FloorBrown } from "../Models/Scene1/FloorBrown";
import { RockLeaf } from "../Models/Scene1/RockLeaf";
import FaiLogo from "../components/FaiLogo";
import { Rock1 } from "../Models/Scene1/Rock1";
import { GzhelVase } from "../Models/Scene1/GzhelVase";
import { Leaf2 } from "../Models/Scene1/Leaf2";
import {Bottle1} from "../Models/Scene1/Bottle1";
import {Bottle2} from "../Models/Scene1/Bottle2";
import {Bottle3} from "../Models/Scene1/Bottle3";
import Pattern from "./Pattern";
import Pattern2 from "./Pattern2";
import Pattern3 from "./Pattern3";
import Pattern4 from "./Pattern4";

import GhasaqIcon from "./Icons/GhasaqIcon";
import NadaIcon from "./Icons/NadaIcon";
import SafaIcon from "./Icons/SafaIcon";



const PRODUCTS = {
  product1: { title: "صَفَاءْ", description: "Calming Water-Based Serum", size: "50 ml", enTitle: "SAFA", icon: "SafaIcon" },
  product2: { title: "نَدَىْ", description: "Refreshing Botanical Face Mist", size: "50 ml", enTitle: "NADA", icon: "NadaIcon" },
  product3: { title: "غَسَقْ", description: "Restorative Night Balm-in-Cream", size: "40ml", enTitle: "GHASAQ", icon: "GhasaqIcon" },
};

export default function ThreeD() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const focusedRef = useRef(null);
  const targetLookAt = useRef(new THREE.Vector3());
  const original = useRef(new Map());
  const orbitEnabled = useRef(false);
  const productMeshes = useRef([]);

  const floorRef = useRef(null);

  // Initialize renderer when component mounts
  useEffect(() => {
    const renderer = getRenderer();
    if (!renderer) {
      console.error("Failed to initialize renderer");
    }
  }, []);

  // Store original positions and save product mesh references
  const saveOriginalPositions = () => {
    [product1, product2, product3].forEach((group) => {
      original.current.set(group, {
        x: group.position.x,
        y: group.position.y,
        z: group.position.z,
      });
    });
  };

  useEffect(() => {
    loadEnvironment();

    RockLeaf(environmentGroup)
    Leaf2(environmentGroup)
    Rock1(environmentGroup)
    GzhelVase(environmentGroup);

    FloorBrown(environmentGroup, (model) => {
      floorRef.current = model;
    });


    // PRODUCTS
    Bottle1(product2, (mesh) => {
      mesh.traverse((child) => {
        if (child.isMesh) {
          productMeshes.current.push(child);
        }
      });
    })
    Bottle2(product1, (mesh) => {
      mesh.traverse((child) => {
        if (child.isMesh) {
          productMeshes.current.push(child);
        }
      });
    })
    Bottle3(product3, (mesh) => {
      mesh.traverse((child) => {
        if (child.isMesh) {
          productMeshes.current.push(child);
        }
      });
    })

    // Store original positions after models load
    saveOriginalPositions();

    // =========================
    // PRODUCT CLICK HANDLER
    // =========================
    const onProductClick = (e) => {
      // Update mouse for raycaster
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const hits = raycaster.intersectObjects(productMeshes.current, false);

      if (hits.length > 0) {
        const clickedMesh = hits[0].object;
        const productKey = clickedMesh.userData.productKey;

        if (productKey && PRODUCTS[productKey]) {
          selectProduct(productKey);
        }
      }
    };

    const selectProduct = (key) => {
      // Deselect previous
      if (focusedRef.current && focusedRef.current !== key) {
        const prevGroup = { product1, product2, product3 }[focusedRef.current];
        const orig = original.current.get(prevGroup);

        gsap.to(prevGroup.position, {
          z: orig?.z || 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      if (focusedRef.current === key) {
        // Click same product = deselect
        setSelectedProduct(null);
        focusedRef.current = null;
        return;
      }

      focusedRef.current = key;
      setSelectedProduct(key);

      // Get the product group
      const group = { product1, product2, product3 }[key];
      const orig = original.current.get(group);

      // Animate bottle coming forward ONLY (no rotation)
      gsap.to(group.position, {
        z: (orig?.z || 0) + 8,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("click", onProductClick);


    // =========================
    // FOG (سينمائي عمق)
    // =========================
    scene.fog = new THREE.FogExp2("#191919", 0.01);

    // =========================
    // GLOW SYSTEM (soft blur fake)
    // =========================
    const glowGroup = new THREE.Group();
    scene.add(glowGroup);

    const textureLoader = new THREE.TextureLoader();
    const softCircle = textureLoader.load(
      "https://threejs.org/examples/textures/sprites/disc.png"
    );

    function createGlow(size, opacity, scaleBoost = 1) {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.MeshBasicMaterial({
          map: softCircle,
          color: "#e5e1d8",
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );

      mesh.rotation.x = -Math.PI / 2;
      mesh.scale.set(scaleBoost, scaleBoost, scaleBoost);

      glowGroup.add(mesh);
      return mesh;
    }

    const glowCore = createGlow(2.5, 0.6, 1);
    const glowMid = createGlow(5, 0.25, 1.2);
    const glowOuter = createGlow(9, 0.08, 1.5);

    const glowTarget = new THREE.Vector3();
    const glowCurrent = new THREE.Vector3();

  // =========================
  // LIGHT CINEMATIC BASE
  // =========================
  ambientLight.intensity = 0.2;
  fillLight.intensity = 0.4;
  sunLight.intensity = 3;
  rimLight.intensity = 1.5;
  mouseLight.intensity = 2;

  // soft cinematic tone
  const rendererInstance = getRenderer();
  if (rendererInstance) {
    rendererInstance.toneMappingExposure = 1.2;
  }

    // =========================
    // MOUSE
    // =========================
    const cursor = { x: 0, y: 0 };

    const onMove = (e) => {
      cursor.x = e.clientX / window.innerWidth - 0.5;
      cursor.y = e.clientY / window.innerHeight - 0.5;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMove);

    // =========================
    // ANIMATE LOOP
    // =========================
    const animate = () => {
      requestAnimationFrame(animate);

      // camera drift - always active for smooth mouse following
      camera.position.x += (cursor.x * 4 - camera.position.x) * 0.03;
      camera.position.y += (-cursor.y * 2 - camera.position.y) * 0.03;

      camera.lookAt(0, 0, 0);

      raycaster.setFromCamera(mouse, camera);

      // =========================
      // FLOOR HIT
      // =========================
      if (floorRef.current) {
        const hits = raycaster.intersectObject(floorRef.current, true);

        if (hits.length) {
          glowTarget.copy(hits[0].point);
        }
      }

      // smooth trailing motion (cinematic delay)
      glowCurrent.lerp(glowTarget, 0.08);

      glowGroup.position.copy(glowCurrent);
      glowGroup.position.y = glowCurrent.y + 0.02;

      // =========================
      // SOFT PULSE (life feeling)
      // =========================
      const pulse = 1 + Math.sin(performance.now() * 0.003) * 0.04;
      glowGroup.scale.set(pulse, pulse, pulse);

      // =========================
      // TRAIL EFFECT (blur illusion)
      // =========================
      const speed = glowGroup.position.distanceTo(glowTarget);

      const baseScale = 1 + speed * 0.08;

      glowCore.scale.set(baseScale, baseScale, baseScale);
      glowMid.scale.set(baseScale * 1.4, baseScale * 1.4, baseScale * 1.4);
      glowOuter.scale.set(baseScale * 2.2, baseScale * 2.2, baseScale * 2.2);

      // =========================
      // CINEMATIC LIGHT FOLLOW
      // =========================
      const targetX = cursor.x * 10;
      const targetY = 6 + (-cursor.y * 4);
      const targetZ = 10;

      mouseLight.position.x += (targetX - mouseLight.position.x) * 0.06;
      mouseLight.position.y += (targetY - mouseLight.position.y) * 0.06;
      mouseLight.position.z += (targetZ - mouseLight.position.z) * 0.06;

      mouseLight.target.position.copy(glowGroup.position);
      mouseLight.target.updateMatrixWorld();

      composer.render();
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onProductClick);
    };
  }, []);


  return (
    <>
      {selectedProduct && (
        <div 
          className={`product-overlay fixed w-[450px] h-[100vh] bg-White flex items-center justify-center
            ${(selectedProduct === ("product3") ) ? (
              "top-0 left-0"
            ) : (
              "top-0 right-0"
            ) }
          `}>
          <div className="product-card w-full h-[90vh] px-[50px] py-[40px] text-white text-right relative rounded-[16px] mb-[30px] flex items-center justify-center text-[3rem] ">
            <button 
              className={`${selectedProduct === ("product3") ? "close-btn-left" : "close-btn"}`} 
              onClick={() => {
                const keyToClose = selectedProduct;
                setSelectedProduct(null);
                focusedRef.current = null;
                // Reset bottle position
                const group = { product1, product2, product3 }[keyToClose];
                if (group) {
                  const orig = original.current.get(group);
                  gsap.to(group.position, {
                    z: orig?.z || 0,
                    duration: 0.8,
                    ease: "power2.out",
                  });
                }
              }}
            >×</button>
            {/* <div className="product-image">🧴</div> */}
            <div className="absolute w-full h-[100vh] flex flex-col justify-between">
              <div className="w-full flex flex-row">
                <Pattern2 />
                <Pattern />
              </div>
              <div className="w-full flex flex-row">
                <Pattern3 />
                <Pattern4 />
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-5">
              <div className="flex justify-center items-center mt-[-30%]">
                {(PRODUCTS[selectedProduct]?.icon === "NadaIcon") ? (
                  <NadaIcon />
                ) : (PRODUCTS[selectedProduct]?.icon === "SafaIcon") ? (
                  <SafaIcon />
                ) : (
                  <GhasaqIcon />
                )}
              </div>

              <div className="w-full flex flex-col text-center">
                <h2 className="text-[50px] text-[#1f3fc3] font-[Naskh]">{PRODUCTS[selectedProduct]?.title}</h2>
                <h2 className="text-[110px] text-[#1f3fc3] font-[Dahlia] mt-[-12%]">{PRODUCTS[selectedProduct]?.enTitle}</h2>
                <h3 className="text-[25px] text-[#1f3fc3] font-[Dahlia]">{PRODUCTS[selectedProduct]?.description}</h3>
                <h3 className="text-[25px] text-[#1f3fc3] font-[Dahlia]">{PRODUCTS[selectedProduct]?.size}</h3>
              </div>

              <button className="text-lg border border-[#488dc7] px-2 py-1 bg-[#1f3fc3] font-[Naskh] cursor-pointer hover:bg-[#2d51e1] z-99">اشتري الآن</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}