import * as THREE from "three";

export default class Renderer {
    constructor(resizer, canvas) {
        this.resizer = resizer
        this.instance = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        })
        this.instance.setSize(this.resizer.width, this.resizer.height)
        this.instance.setPixelRatio(Math.min(this.resizer.pixelRatio, 2))
    }

    resize() {
        this.instance.setSize(this.resizer.width, this.resizer.height)
        this.instance.setPixelRatio(Math.min(this.resizer.pixelRatio, 2))
    }

    render(scene, camera) {
        this.instance.render(scene, camera)
    }
}