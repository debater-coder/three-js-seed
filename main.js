import "./style.css";
import Experience from "./Experience";
import * as THREE from "three";
import waterVertexShader from "./shaders/water/vertex.glsl?raw";
import waterFragmentShader from "./shaders/water/fragment.glsl?raw";

class App extends Experience {
  constructor() {
    // Setup
    super({
      canvas: document.querySelector("canvas.webgl"),
    });
    this.renderer.instance.setClearColor("#211d20");

    this.camera.position.set(6, 4, 8);

    this.sun = new THREE.DirectionalLight("#ffffff", 1);
    this.sun.castShadow = true;
    this.sun.shadow.camera.far = 15;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.normalBias = 0.05;
    this.sun.position.set(3.5, 2, -1.25);
    this.sun.position.set(3.5, 2, -1.25);
    this.scene.add(this.sun);

    this.sea = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50, 128, 128),
      new THREE.ShaderMaterial({
        vertexShader: waterVertexShader,
        fragmentShader: waterFragmentShader,
      })
    );
    this.sea.rotation.x = -Math.PI / 2;
    this.scene.add(this.sea);

    this.resources
      .startLoading([
        {
          name: "boat",
          type: "gltfModel",
          path: "/boat_josefa/scene.gltf",
        },
        {
          name: "environmentMap",
          type: "cubeTexture",
          path: [
            "/environment_map/px.png",
            "/environment_map/nx.png",
            "/environment_map/py.png",
            "/environment_map/ny.png",
            "/environment_map/pz.png",
            "/environment_map/nz.png",
          ],
        },
      ])
      .then(() => {
        this.scene.background = this.resources.items["environmentMap"];
        this.boat = this.resources.items["boat"].scene;
        this.boat.position.y = -0.5;
        this.scene.add(this.boat);

        this.applyEnvironmentMap(this.resources.items["environmentMap"]);
      });
  }

  update() {
    super.update();
    if (this.boat) {
      this.boat.rotation.x = Math.sin(this.time.elapsed * 0.0005) * 0.1;
      this.boat.rotation.y = Math.cos(this.time.elapsed * 0.0005) * 0.1;
    }
  }
}

const app = new App();
