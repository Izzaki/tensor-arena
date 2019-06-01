export class DefaultScene extends Phaser.Scene {
    static readonly KEY: string = "DefaultScene";

    titleText: Phaser.GameObjects.Text;
    infoText: Phaser.GameObjects.Text;

    constructor() {
        super({});
    }

    create(): void {
        this.infoText = this.add.text(0, 0, "Info");
        this.titleText = this.add.text(512, 0, "Title", {align: 'center'});
    }
}
