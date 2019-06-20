import {Assets} from "../Assets/Assets";

export class Rocket extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, width = 128, height = 128) {
        super(scene, 0, 0);

        const sprite = scene.add.sprite(0, 0, Assets.ROCKET);
        sprite.setDisplaySize(width, height);
        this.add(sprite);
    }
}
