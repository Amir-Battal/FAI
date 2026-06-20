import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { Bottle2 } from "../Models/Scene3/Bottle2";

export default function ProductSafaa() {
  const canvasRef = useRef(null);
  const particleMeshRef = useRef(null);

  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, show: false });

  const productImages = [
    "https://res.cloudinary.com/dqe36doqn/image/upload/v1781943213/FAI___SAFAA_1_o9yr3v.jpg",
    "https://res.cloudinary.com/dqe36doqn/image/upload/v1781943376/FAI-BE-08B_yqzjve.jpg",
    "https://res.cloudinary.com/dqe36doqn/image/upload/v1781943349/FAI___SAFAA_Pack.C_vpdsfk.jpg",
    "https://res.cloudinary.com/dqe36doqn/image/upload/v1781946724/FAI-BE-01_r5ajx3.jpg",
  ];

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 5, 5);
    scene.add(light);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mouse3D = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let bottleModel = null;

    Bottle2(scene, (model) => {
      bottleModel = model;
      bottleModel.visible = false;
      createParticles(model);
    });

    const createParticles = (model) => {
      const meshes = [];
      model.traverse((child) => {
        if (child.isMesh) meshes.push(child);
      });

      const COUNT = 12000;

      const positions = new Float32Array(COUNT * 3);
      const original = new Float32Array(COUNT * 3);
      const velocity = new Float32Array(COUNT * 3);

      const temp = new THREE.Vector3();
      const world = new THREE.Vector3();

      let offset = 0;

      meshes.forEach((mesh) => {
        const sampler = new MeshSurfaceSampler(mesh).build();
        const perMesh = Math.floor(COUNT / meshes.length);

        for (let i = 0; i < perMesh; i++) {
          sampler.sample(temp);
          mesh.localToWorld(world.copy(temp));

          positions.set([world.x, world.y, world.z], offset);
          original.set([world.x, world.y, world.z], offset);

          velocity[offset] = velocity[offset + 1] = velocity[offset + 2] = 0;
          offset += 3;
        }
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: "#1f3fc3",
        size: 0.03,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      particleMeshRef.current = {
        geometry,
        original,
        velocity,
        count: COUNT,
        points,
      };
    };

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);

      const data = particleMeshRef.current;

      if (data) {
        const pos = data.geometry.attributes.position.array;
        const original = data.original;
        const velocity = data.velocity;

        const radius = 0.6;
        const radiusSq = radius * radius;

        for (let i = 0; i < data.count; i++) {
          const ix = i * 3;

          const dx = pos[ix] - mouse3D.x;
          const dy = pos[ix + 1] - mouse3D.y;
          const dz = pos[ix + 2] - mouse3D.z;

          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = (radius - dist) * 0.2;

            velocity[ix] += dx * force;
            velocity[ix + 1] += dy * force;
            velocity[ix + 2] += dz * force;
          }

          velocity[ix] += (original[ix] - pos[ix]) * 0.015;
          velocity[ix + 1] += (original[ix + 1] - pos[ix + 1]) * 0.015;
          velocity[ix + 2] += (original[ix + 2] - pos[ix + 2]) * 0.015;

          velocity[ix] *= 0.9;
          velocity[ix + 1] *= 0.9;
          velocity[ix + 2] *= 0.9;

          pos[ix] += velocity[ix];
          pos[ix + 1] += velocity[ix + 1];
          pos[ix + 2] += velocity[ix + 2];
        }

        data.geometry.attributes.position.needsUpdate = true;
        data.points.rotation.y += 0.0015;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="w-full h-screen relative overflow-hidden bg-white">

      <div ref={canvasRef} className="absolute inset-0 z-2" />

      <div className="relative z-10 h-full flex flex-row items-center justify-between px-20">

        {/* LEFT */}
        <div className="w-[45%] flex flex-col items-center">

          {/* MAIN IMAGE WITH ZOOM */}
          <div
            className="w-full max-w-md rounded-3xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl relative"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setZoom({ x, y, show: true });
            }}
            onMouseLeave={() => setZoom((z) => ({ ...z, show: false }))}
          >
            <img
              src={productImages[activeImage]}
              className="w-full h-[420px] object-cover"
            />

            {/* ZOOM LENS */}
            {zoom.show && (
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  backgroundImage: `url(${productImages[activeImage]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "200%",
                  backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                }}
              />
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border transition ${
                  activeImage === i
                    ? "border-[#1f3fc3]"
                    : "border-black/10 opacity-60"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[45%] flex flex-col text-[#1f3fc3] gap-2">

          <span className="text-xs tracking-[0.3em] uppercase">
            Skincare • Premium Serum
          </span>

          <div className="w-full flex flex-col mt-[2%]">
            <h1 className="text-6xl font-light mb-[-2%] font-[Naskh]">
              صَفَاءْ
            </h1>
            <h1 className="text-9xl font-light font-[Dahlia]">
              SAFA
            </h1>
          </div>

          <p className="w-full text-black/60 mt-6">
            A luxurious hydrating serum designed to restore skin balance,
            enhance glow, and deliver deep moisture with a lightweight feel.
          </p>

          <div className="w-full mt-8 flex flex-row gap-6">
            <span className="text-3xl font-semibold">$29.99</span>

            <button className="px-8 py-3 rounded-full bg-[#1f3fc3] text-white hover:scale-105 transition">
              Buy Now
            </button>
          </div>

          <div className="mt-10 text-sm text-black/60">
            ✓ Dermatologically tested <br />
            ✓ Fast absorption formula <br />
            ✓ Suitable for all skin types
          </div>
        </div>

      </div>
    </section>
  );
}