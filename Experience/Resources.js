import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export default class Resources {
  constructor() {
    // Init Loaders
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading(sources) {
    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    return new Promise((resolve, reject) => {
      for (const source of this.sources) {
        switch (source.type) {
          case "gltfModel":
            this.loaders.gltfLoader.load(
              source.path,
              (file) => {
                this.sourceLoaded(source, file, resolve);
              },
              undefined,
              (error) => reject(error)
            );
            break;
          case "texture":
            this.loaders.textureLoader.load(
              source.path,
              (file) => {
                this.sourceLoaded(source, file, resolve);
              },
              undefined,
              (error) => reject(error)
            );
            break;
          case "cubeTexture":
            this.loaders.cubeTextureLoader.load(
              source.path,
              (file) => {
                this.sourceLoaded(source, file, resolve);
              },
              undefined,
              (error) => reject(error)
            );
            break;
        }
      }
    });
  }

  sourceLoaded(source, file, ready) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      ready();
    }
  }
}
