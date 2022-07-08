import * as THREE from "three";
import * as dat from "lil-gui";

import Resizer from "./Resizer";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./Time";
import Resources from "./Resources";

export default class Experience {
  constructor({ canvas, fov = 35, useOrbitControls = true }) {
    // Options
    this.canvas = canvas;
    this.fov = fov;
    this.useOrbitControls = useOrbitControls;

    // Binding
    this.resize = this.resize.bind(this);
    this.update = this.update.bind(this);

    // Sizing
    this.resizer = new Resizer(this.resize, canvas);

    // Time
    this.time = new Time(this.update);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this._camera = new Camera(
      this.resizer,
      this.fov,
      this.useOrbitControls,
      this.scene,
      this.canvas
    );
    this.camera = this._camera.instance;

    // Renderer
    this.renderer = new Renderer(this.resizer, this.canvas);

    // Debug
    this.gui = new dat.GUI();

    // Resources
    this.resources = new Resources();
  }

  resize() {
    this.resizer.resize();
    this._camera.resize();
    this.renderer.resize();
  }

  update() {
    this.time.update();
    this._camera.update();
    this.renderer.render(this.scene, this.camera);
  }
  applyEnvironmentMap(texture, intensity) {
    this.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMap = texture;
        child.material.envMapIntensity = intensity;
        child.material.needsUpdate = true;
      }
    });
  }
}
