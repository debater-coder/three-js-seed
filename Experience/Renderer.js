import * as THREE from "three";

export default class Renderer {
  constructor(resizer, canvas) {
    this.resizer = resizer;
    this.instance = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.instance.setPixelRatio(this.resizer.pixelRatio);
    this.instance.setSize(this.resizer.width, this.resizer.height, false);
  }

  resize() {
    this.instance.setSize(this.resizer.width, this.resizer.height, false);
    this.instance.setPixelRatio(Math.min(this.resizer.pixelRatio, 2));
  }

  render(scene, camera) {
    this.instance.render(scene, camera);
  }
}
