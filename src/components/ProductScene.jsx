import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

export default function ProductScene({ product }) {
  const canvasRef = useRef(null);
  const particleRef = useRef(null);

  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, show: false });

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
      alpha: true,
      antialias: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 5, 5);
    scene.add(light);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouse3D = new THREE.Vector3();

    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let model = null;

    product.model(scene, (loaded) => {
      model = loaded;
      model.visible = false;
      createParticles(model);
    });

    const createParticles = (model) => {
      const meshes = [];
      model.traverse((c) => c.isMesh && meshes.push(c));

      const COUNT = 12000;

      const pos = new Float32Array(COUNT * 3);
      const orig = new Float32Array(COUNT * 3);

      let offset = 0;

      meshes.forEach((mesh) => {
        const sampler = new MeshSurfaceSampler(mesh).build();
        const per = Math.floor(COUNT / meshes.length);

        for (let i = 0; i < per; i++) {
          const temp = new THREE.Vector3();
          const world = new THREE.Vector3();

          sampler.sample(temp);
          mesh.localToWorld(world.copy(temp));

          pos.set([world.x, world.y, world.z], offset);
          orig.set([world.x, world.y, world.z], offset);

          offset += 3;
        }
      });

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({
        color: product.accent,
        size: 0.03,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      particleRef.current = { geo, orig, points, count: COUNT };
    };

    let frame;

    const animate = () => {
      frame = requestAnimationFrame(animate);

      const d = particleRef.current;

      if (d) {
        const pos = d.geo.attributes.position.array;
        const orig = d.orig;

        for (let i = 0; i < d.count; i++) {
          const ix = i * 3;

          pos[ix] += (orig[ix] - pos[ix]) * 0.015;
          pos[ix + 1] += (orig[ix + 1] - pos[ix + 1]) * 0.015;
          pos[ix + 2] += (orig[ix + 2] - pos[ix + 2]) * 0.015;
        }

        d.geo.attributes.position.needsUpdate = true;
        d.points.rotation.y += 0.0015;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      container.innerHTML = "";
    };
  }, [product]);

  return (
    <section className="w-full h-screen relative bg-white overflow-hidden font-[Dahlia]">

      <div ref={canvasRef} className="absolute inset-0" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex justify-between items-center px-20">

        {/* LEFT */}
        <div className="w-[45%]">

          {/* MAIN IMAGE ZOOM */}
          <div
            className="w-full h-[420px] rounded-2xl overflow-hidden relative"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;

              e.currentTarget.style.setProperty("--x", `${x}%`);
              e.currentTarget.style.setProperty("--y", `${y}%`);
            }}
          >
            <img
              src={product.images[activeImage]}
              className="
                w-full h-full object-cover
                scale-100 hover:scale-150
                transition-transform duration-200 ease-out
                origin-[var(--x)_var(--y)]
              "
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="relative"
              >
                <img
                  src={img}
                  className="w-14 h-14 object-cover rounded"
                />

                {activeImage !== i && (
                  <div className="absolute inset-0 bg-black/40 rounded" />
                )}

                {activeImage === i && (
                  <div
                    className="absolute inset-0 rounded ring-2"
                    style={{ borderColor: product.accent }}
                  />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-[45%]" style={{ color: product.accent }}>

          <span className="text-lg tracking-widest uppercase">
            {product.tagline}
          </span>

          <h1 className="text-6xl font-[Naskh] mt-2">{product.arabic}</h1>
          <h1 className="text-9xl font-light">{product.english}</h1>

          <p className="text-black/60 mt-4 tracking-wider">
            {product.description}
          </p>

          {/* EXTRA DATA */}
          <div className="mt-6 text-sm text-black/70 space-y-2 tracking-wider">
            <p><span className="font-semibold">Skin Type:</span> {product.skinType}</p>
            <p><span className="font-semibold">Texture:</span> {product.texture}</p>
          </div>

          {/* BENEFITS */}
          <div className="mt-5">
            <p className="font-semibold mb-2 text-2xl">Benefits</p>
            <ul className="text-black/60 list-disc ml-5 space-y-1 tracking-wide">
              {product.benefits?.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          {/* USAGE */}
          <p className="mt-5 text-black/60 tracking-wide">
            <span className="font-semibold text-black">How to use:</span>{" "}
            {product.usage}
          </p>

          {/* PRICE */}
          <div className="mt-6 flex gap-6 items-center tracking-wider">
            <span className="text-3xl">{product.price}</span>

            <button
              className="px-6 py-3 text-white rounded-full cursor-pointer bg-[#1f3fc3] hover:bg-[#2f52e1fb]"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}