<h1 align="center">
  <br>
  <a href="https://github.com/Amir-Battal">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react.js" width="200">
  </a>
  <br>
  FAI — Skincare Experience
  <br>
</h1>

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Three.js](https://img.shields.io/badge/three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/gsap-%2300D084.svg?style=for-the-badge&logo=greensock&logoColor=white)
![WebGL](https://img.shields.io/badge/webgl-interactive-ff6b6b?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Animation](https://img.shields.io/badge/motion-design-blueviolet?style=for-the-badge)

</div>

**FAI** is an immersive interactive skincare product experience built as a high-end digital showcase.  
The project combines **3D WebGL rendering**, **motion design**, and **scroll-based storytelling** to create a premium e-commerce-like journey where each product is experienced as a cinematic scene rather than a static page.

The interface focuses on blending **visual identity**, **typography**, and **physics-based animations**, where products transition as stacked layers synchronized with scroll behavior.

<br/>

## 🔗 Live Demo

<div align="center">

[FAI Experience](https://fai.amirbattal.com)

</div>

<p align="center">
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started-locally">Getting Started Locally</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#author">Author</a>
</p>

<br/>

## Tech Stack

### Frontend

- React + Vite
- Three.js (WebGL Rendering)
- GSAP + ScrollTrigger
- Tailwind CSS
- Custom 3D Model Loaders

### Motion & Graphics

- MeshSurfaceSampler (particle decomposition)
- Scroll-driven animations
- Physics-based particle restoration
- Raycaster interaction system

<br/>

## Features

- 🧴 **3D Product Visualization** using WebGL and particle systems
- 🌀 **Scroll-based stacked product transitions**
- ✨ **Physics-driven particle animations for product models**
- 🎥 **Cinematic loading screen synced with progress state**
- 🖱️ **Interactive zoom and hover-based image exploration**
- 🎯 **Dynamic product data system (multi-product architecture)**
- 📦 **Reusable product scene pipeline**
- ⚡ **High-performance rendering optimized for smooth animation**
- 📱 **Responsive design adapted for modern devices**

<br/>

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Amir-Battal/FAI.git
cd fai
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Run Development Server
```bash
npm run dev
```

<br/>

## How To Use

Open the project locally or via the live demo.
Scroll through the experience to transition between products in a stacked cinematic layout.

Interact with each product scene to:

- Rotate and observe 3D particle models
- Explore product images with zoom interaction
- Navigate between product variations
- Experience smooth scroll-based transitions

The interface is designed as a guided visual journey, where each scroll reveals a new layer of the product narrative.

<br/>

## Project Structure

```
src/
 ├── Models/              # 3D bottle models
 ├── Components/
 │    ├── ProductScene    # WebGL + UI hybrid scene
 │    ├── StackProducts   # Scroll stacked system
 │    ├── LoadingScreen   # Cinematic loader
 ├── Data/
 │    ├── productsData    # Product definitions
 ├── lib/                 # Utilities
 ```

<br/>


## Author
<a href="https://amirbattal.com" target="_blank">Amir Battal</a>


---

> Linkedin [Amir Battal](https://www.linkedin.com/in/amir-battal/) &nbsp;&middot;&nbsp;
> GitHub [@Amir-Battal](https://github.com/Amir-Battal) &nbsp;&middot;&nbsp;
