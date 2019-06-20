import {Assets} from "../Assets/Assets";

export class DefaultScene extends Phaser.Scene {
    static readonly KEY: string = "DefaultScene";

    titleText: Phaser.GameObjects.Text;
    infoText: Phaser.GameObjects.Text;
    previousText: Phaser.GameObjects.Text;
    nextText: Phaser.GameObjects.Text;

    constructor() {
        super({});
    }

    preload(): void {
        this.load.image(Assets.ROCKET, 'assets/rocket.png');
    }

    create(): void {
        this.infoText = this.add.text(0, 0, "Info");
        this.previousText = this.add.text(512 - 50, 700, "Previous");
        this.nextText = this.add.text(512 + 50, 700, "Next",{align: 'right'});
        this.titleText = this.add.text(512, 0, "Title", {align: 'center'});
    }
}
