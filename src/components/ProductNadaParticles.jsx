import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { Bottle1 } from "../Models/Scene5/Bottle1";

export default function ProductNadaParticles() {
  const canvasRef = useRef(null);
  const particleMeshRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    // =========================
    // SCENE / CAMERA / RENDERER
    // =========================
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

    // =========================
    // LIGHTS
    // =========================
    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 5, 5);
    scene.add(light);

    // =========================
    // MOUSE (3D PLANE)
    // =========================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mouse3D = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // =========================
    // LOAD MODEL
    // =========================
    let bottleModel = null;

    Bottle1(scene, (model) => {
      bottleModel = model;
      bottleModel.visible = false;

      createParticles(model);
    });

    // =========================
    // PARTICLES DATA
    // =========================
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

          positions[offset] = world.x;
          positions[offset + 1] = world.y;
          positions[offset + 2] = world.z;

          original[offset] = world.x;
          original[offset + 1] = world.y;
          original[offset + 2] = world.z;

          velocity[offset] = 0;
          velocity[offset + 1] = 0;
          velocity[offset + 2] = 0;

          offset += 3;
        }
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

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

    // =========================
    // ANIMATION LOOP
    // =========================
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
        const count = data.count;

        const radius = 0.6;
        const radiusSq = radius * radius;

        for (let i = 0; i < count; i++) {
          const ix = i * 3;

          const dx = pos[ix] - mouse3D.x;
          const dy = pos[ix + 1] - mouse3D.y;
          const dz = pos[ix + 2] - mouse3D.z;

          const distSq = dx * dx + dy * dy + dz * dz;

          // repel
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = (radius - dist) * 0.2;

            velocity[ix] += dx * force;
            velocity[ix + 1] += dy * force;
            velocity[ix + 2] += dz * force;
          }

          // return to shape
          velocity[ix] += (original[ix] - pos[ix]) * 0.015;
          velocity[ix + 1] += (original[ix + 1] - pos[ix + 1]) * 0.015;
          velocity[ix + 2] += (original[ix + 2] - pos[ix + 2]) * 0.015;

          // damping
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

    // =========================
    // CLEANUP
    // =========================
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", () => {});
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="w-full h-screen relative bg-white overflow-hidden">
      <div ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 h-full flex items-center px-20">
        <div>
          <h2 className="text-[220px] text-[#1f3fc3]">نَدَىْ</h2>
          <h3 className="text-[120px] text-[#1f3fc3]">NADA</h3>
        </div>
      </div>
    </section>
  );
}